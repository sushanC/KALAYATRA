
/*
  KalaYatra AI Service
  Uses Groq instead of Gemini.
*/

require("dotenv").config();

const groq = require("../config/gemini");

const City = require("../models/City");
const ArtForm = require("../models/ArtForm");

/* =========================================================
   HELPERS
   ========================================================= */

const GROQ_MODEL =
  process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

const sleep = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

/*
  Extract JSON from an AI response.
  Handles plain JSON and JSON inside markdown code fences.
*/
const parseAIJSON = (text) => {
  if (!text || typeof text !== "string") return null;

  const cleaned = text
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (error) {
    // Try extracting the outermost JSON object.
    const start = cleaned.indexOf("{");
    const end = cleaned.lastIndexOf("}");

    if (start !== -1 && end > start) {
      try {
        return JSON.parse(cleaned.substring(start, end + 1));
      } catch (parseError) {
        return null;
      }
    }

    return null;
  }
};

/*
  Determine whether an error should be retried.
*/
const isRetryableError = (error) => {
  const status = error.status || error.statusCode;
  const message = (error.message || "").toLowerCase();

  // Authentication, permission and invalid-request errors
  if ([400, 401, 403, 404, 422].includes(status)) {
    return false;
  }

  if (
    message.includes("invalid api key") ||
    message.includes("authentication") ||
    message.includes("unauthorized") ||
    message.includes("model_not_found")
  ) {
    return false;
  }

  // Temporary errors
  if (
    [408, 409, 429, 500, 502, 503, 504].includes(status)
  ) {
    return true;
  }

  return (
    message.includes("rate limit") ||
    message.includes("timeout") ||
    message.includes("fetch failed") ||
    message.includes("econnreset") ||
    message.includes("etimedout") ||
    message.includes("temporarily unavailable")
  );
};

/*
  Send a prompt to Groq.

  jsonMode=true requests a JSON response from the model.
*/
const generateGroqResponse = async (
  prompt,
  { jsonMode = false, maxRetries = 3 } = {}
) => {
  let delay = 1000;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const completion = await groq.chat.completions.create({
        model: GROQ_MODEL,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        ...(jsonMode
          ? {
              response_format: {
                type: "json_object"
              }
            }
          : {})
      });

      const response =
        completion.choices?.[0]?.message?.content;

      if (!response) {
        throw new Error("Groq returned an empty response.");
      }

      return response;
    } catch (error) {
      const status = error.status || error.statusCode;

      console.error(
        `[GroqService] Attempt ${attempt}/${maxRetries} failed:`,
        error.message
      );

      if (!isRetryableError(error)) {
        if (status === 401 || status === 403) {
          throw new Error(
            "Groq authentication failed. Check your GROQ_API_KEY in the .env file."
          );
        }

        if (status === 404) {
          throw new Error(
            `Groq model "${GROQ_MODEL}" was not found. Check the model ID configured in your .env file.`
          );
        }

        throw new Error(
          `Groq API error: ${error.message}`
        );
      }

      if (attempt === maxRetries) {
        throw new Error(
          "Groq is temporarily unavailable or rate-limited. Please try again shortly."
        );
      }

      // Respect Retry-After when the API provides it.
      const retryAfter = Number(
        error.headers?.["retry-after"] || 0
      );

      const waitTime = retryAfter
        ? retryAfter * 1000
        : delay;

      await sleep(waitTime);
      delay *= 2;
    }
  }

  throw new Error("Unable to generate an AI response.");
};


/* =========================================================
   1. ASK CULTURAL GUIDE
   ========================================================= */

const askCulturalGuide = async ({
  citySlug,
  question,
  artFormSlug = null
}) => {
  const city = await City.findOne({
    slug: citySlug.toLowerCase()
  }).lean();

  if (!city) {
    throw new Error("City not found");
  }

  let artForm = null;

  if (artFormSlug) {
    artForm = await ArtForm.findOne({
      slug: artFormSlug.toLowerCase(),
      city: city._id
    })
      .populate("artists", "name shortBio bio")
      .populate("media", "title type url description")
      .lean();
  }

  const context = {
    city: {
      name: city.name,
      state: city.state,
      country: city.country,
      description: city.description
    },
    artForm: artForm
      ? {
          name: artForm.name,
          category: artForm.category,
          originType: artForm.originType,
          description: artForm.description,
          history: artForm.history,
          culturalSignificance: artForm.culturalSignificance,
          characteristics: artForm.characteristics,
          materials: artForm.materials,
          examples: artForm.examples,
          locations: artForm.locations,
          tags: artForm.tags,
          artists: artForm.artists,
          media: artForm.media
        }
      : null
  };

  const prompt = `
You are the KalaYatra Cultural Guide.

KalaYatra is a cultural discovery platform that helps people understand
the art, traditions, artists, music and creative heritage of the place
they are visiting.

IMPORTANT RULES:

1. Use ONLY the cultural information provided in the CONTEXT below.
2. Do not invent artists, historical facts, locations, dates, events,
   traditions or cultural claims.
3. If the answer is not supported by the context, clearly say that
   the available KalaYatra data does not contain enough information.
4. Do not present generated information as historical fact.
5. Give a clear and friendly answer suitable for a traveler.
6. Preserve uncertainty where the provided data is uncertain.

CONTEXT:
${JSON.stringify(context, null, 2)}

USER QUESTION:
${question}

Answer the user's question using the provided context.
`;

  return await generateGroqResponse(prompt);
};


/* =========================================================
   2. BUILD MY CULTURAL JOURNEY
   ========================================================= */

const buildCulturalJourney = async ({
  citySlug,
  timeAvailable,
  interests = []
}) => {
  const city = await City.findOne({
    slug: citySlug.toLowerCase()
  }).lean();

  if (!city) {
    throw new Error("City not found");
  }

  if (!timeAvailable || Number(timeAvailable) <= 0) {
    throw new Error("timeAvailable must be greater than 0");
  }

  /*
    Retrieve cultural records from MongoDB.
  */

  const artForms = await ArtForm.find({
    city: city._id
  })
    .populate("artists", "name shortBio")
    .populate("media", "title type url thumbnail description")
    .lean();

  /*
    Match interests against categories and tags.
    Fall back to all art forms if nothing matches.
  */

  const normalizedInterests = interests.map((interest) =>
    String(interest).toLowerCase().trim()
  );

  let selectedArtForms = artForms.filter((af) => {
    const text = [
      af.name,
      af.category,
      ...(af.tags || []),
      ...(af.characteristics || [])
    ]
      .join(" ")
      .toLowerCase();

    return normalizedInterests.some((interest) =>
      text.includes(interest)
    );
  });

  if (selectedArtForms.length === 0) {
    selectedArtForms = artForms;
  }

  const contextArtForms = selectedArtForms.slice(0, 10);

  /*
    Build lookup maps for enriching journey steps
    with real MongoDB images, slugs and media.
  */

  const artFormByName = {};
  const artFormBySlug = {};

  for (const af of artForms) {
    artFormByName[af.name.toLowerCase()] = af;
    artFormBySlug[af.slug.toLowerCase()] = af;
  }

  const culturalContext = contextArtForms.map((af) => ({
    name: af.name,
    slug: af.slug,
    category: af.category,
    originType: af.originType,
    description: af.description,
    history: af.history,
    culturalSignificance: af.culturalSignificance,
    characteristics: af.characteristics,
    materials: af.materials,
    examples: af.examples,
    locations: af.locations,
    journeyDuration: af.journeyDuration,
    tags: af.tags
  }));

  const totalMinutes = Number(timeAvailable);

  const prompt = `
You are a deeply knowledgeable cultural teacher for KalaYatra,
a cultural discovery platform.

A visitor has come to learn about the living cultural traditions
of ${city.name}, ${city.state}, ${city.country}.

They have ${totalMinutes} minutes available and are particularly
interested in:
${interests.join(", ") || "all cultural traditions"}.

YOUR ROLE:
You are their personal cultural guide and teacher.
Directly explain cultural traditions to them.
Do not instruct them to go read or research anything elsewhere.
Everything they need to learn, YOU will teach them right here.

CRITICAL RULES:

1. Use the provided cultural data as the source for local facts.
   Do not invent artists, historical dates, venues, events or
   unsupported local cultural claims.
2. Do not present uncertain information as established fact.
3. NEVER write phrases like "Read about...", "Visit...",
   "Explore...", "Watch a video to understand...", "Discover...",
   "Learn more about...", or "Research...".
4. DIRECTLY explain every cultural concept.
   Speak to the visitor warmly and conversationally.
5. Write each step's "explanation" as 4-6 natural conversational
   paragraphs, directly teaching the user.
6. "keyFacts" must be specific and interesting, not generic.
7. "takeaway" must give the reader a meaningful insight.
8. Adapt the number of steps to fit the time available.
   Aim for approximately 12-20 minutes per step.
9. Return ONLY valid JSON. No markdown or code fences.

CULTURAL DATA:
${JSON.stringify(culturalContext, null, 2)}

Return this JSON structure:

{
  "title": "engaging journey title",
  "summary": "2-3 sentence overview of what the user will learn",
  "totalDuration": ${totalMinutes},
  "steps": [
    {
      "order": 1,
      "title": "clear, engaging step title",
      "durationMinutes": 15,
      "artFormName": "exact name of the art form",
      "artFormSlug": "exact slug of the art form",
      "explanation": "4-6 conversational paragraphs directly teaching the user",
      "culturalContext": "2-3 sentences of specific historical or regional context",
      "keyFacts": [
        "Specific interesting fact 1",
        "Specific interesting fact 2",
        "Specific interesting fact 3"
      ],
      "takeaway": "1-2 sentences giving the user a meaningful insight"
    }
  ]
}`;

  const rawResponse = await generateGroqResponse(prompt, {
    jsonMode: true
  });

  const journey = parseAIJSON(rawResponse);

  if (!journey) {
    return {
      title: `Cultural Journey through ${city.name}`,
      summary: rawResponse,
      totalDuration: totalMinutes,
      steps: []
    };
  }

  /*
    Enrich each step with verified MongoDB data.
    Never trust AI-generated image or video URLs.
  */

  if (Array.isArray(journey.steps)) {
    journey.steps = journey.steps.map((step, index) => {
      const enriched = {
        ...step,
        order: index + 1
      };

      let matchedArtForm = null;

      if (step.artFormSlug) {
        matchedArtForm =
          artFormBySlug[step.artFormSlug.toLowerCase()] || null;
      }

      if (!matchedArtForm && step.artFormName) {
        matchedArtForm =
          artFormByName[step.artFormName.toLowerCase()] || null;
      }

      // Fuzzy match using meaningful words in the step title.
      if (!matchedArtForm && step.title) {
        const words = step.title.toLowerCase().split(/\s+/);

        for (const [key, af] of Object.entries(artFormByName)) {
          if (words.some((word) => word.length > 3 && key.includes(word))) {
            matchedArtForm = af;
            break;
          }
        }
      }

      if (matchedArtForm) {
        enriched.image = matchedArtForm.image || "";
        enriched.artFormSlug = matchedArtForm.slug;
        enriched.artFormName = matchedArtForm.name;
        enriched.category = matchedArtForm.category;

        const videos = (matchedArtForm.media || []).filter(
          (media) =>
            media.type === "youtube" &&
            media.url &&
            !media.url.includes("REPLACE_WITH_VERIFIED")
        );

        if (videos.length > 0) {
          enriched.video = {
            title: videos[0].title,
            url: videos[0].url,
            thumbnail: videos[0].thumbnail || "",
            description: videos[0].description || ""
          };
        }
      }

      return enriched;
    });

    const total = journey.steps.reduce(
      (sum, step) =>
        sum + (Number(step.durationMinutes) || 0),
      0
    );

    journey.totalDuration = Math.min(total, totalMinutes);
  }

  return journey;
};


/* =========================================================
   3. BECOME PART OF THE ART
   ========================================================= */

const becomePartOfArt = async ({
  citySlug,
  artFormSlug,
  name,
  personality
}) => {
  const city = await City.findOne({
    slug: citySlug.toLowerCase()
  }).lean();

  if (!city) {
    throw new Error("City not found");
  }

  const artForm = await ArtForm.findOne({
    slug: artFormSlug.toLowerCase(),
    city: city._id
  }).lean();

  if (!artForm) {
    throw new Error("Art form not found");
  }

  const context = {
    city: city.name,
    artForm: {
      name: artForm.name,
      category: artForm.category,
      originType: artForm.originType,
      description: artForm.description,
      history: artForm.history,
      culturalSignificance: artForm.culturalSignificance,
      characteristics: artForm.characteristics,
      materials: artForm.materials,
      examples: artForm.examples,
      tags: artForm.tags
    }
  };

  const prompt = `
You are the creative experience engine for KalaYatra.

Create a personalized cultural character or creative piece
inspired by the documented characteristics of the selected art form.

USER:
Name: ${name}
Personality: ${personality}

CULTURAL CONTEXT:
${JSON.stringify(context, null, 2)}

IMPORTANT RULES:

1. Use the provided cultural context as inspiration.
2. Do not claim that the generated character is an authentic
   historical character.
3. Do not invent historical facts.
4. Do not misrepresent the generated work as an existing
   traditional work.
5. Clearly distinguish creative generation from cultural history.
6. Respect the cultural context of the art form.
7. Use documented characteristics, themes or structural elements
   from the provided data.
8. Return ONLY valid JSON.
9. Do not use markdown.

Return this JSON structure:

{
  "title": "string",
  "character": "string",
  "description": "string",
  "verse": "string",
  "inspiration": [
    "string",
    "string"
  ],
  "disclaimer": "This is a Groq-generated creative interpretation inspired by the documented cultural context."
}
`;

  const rawResponse = await generateGroqResponse(prompt, {
    jsonMode: true
  });

  const generatedArt = parseAIJSON(rawResponse);

  if (!generatedArt) {
    return {
      title: `The ${artForm.name} Journey of ${name}`,
      character: name,
      description: rawResponse,
      verse: "",
      inspiration: [],
      disclaimer:
        "This is a Groq-generated creative interpretation inspired by the documented cultural context."
    };
  }

  return generatedArt;
};


/* =========================================================
   EXPORTS
   ========================================================= */

module.exports = {
  askCulturalGuide,
  buildCulturalJourney,
  becomePartOfArt
};
