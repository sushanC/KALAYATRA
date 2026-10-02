import client from './client';

const extractSlug = (val) => {
  if (!val) return undefined;
  if (typeof val === 'string') return val;
  if (typeof val === 'object' && val.slug) return val.slug;
  return String(val);
};

export const askGuide = async ({ citySlug, question, artFormSlug }) => {
  const cleanCitySlug = extractSlug(citySlug);
  const cleanArtFormSlug = extractSlug(artFormSlug);

  const { data } = await client.post('/api/gemini/ask', {
    citySlug: cleanCitySlug,
    question,
    artFormSlug: cleanArtFormSlug || undefined,
  });
  return data.data;
};

export const buildJourney = async ({ citySlug, timeAvailable, interests }) => {
  const cleanCitySlug = extractSlug(citySlug);
  const numTime = typeof timeAvailable === 'number' ? timeAvailable : parseInt(timeAvailable, 10) || 60;

  const { data } = await client.post('/api/gemini/journey', {
    citySlug: cleanCitySlug,
    timeAvailable: numTime,
    interests: interests || [],
  });
  return data.data;
};

export const becomePartOfArt = async ({ citySlug, artFormSlug, name, personality }) => {
  const cleanCitySlug = extractSlug(citySlug);
  const cleanArtFormSlug = extractSlug(artFormSlug);

  const { data } = await client.post('/api/gemini/become-part', {
    citySlug: cleanCitySlug,
    artFormSlug: cleanArtFormSlug,
    name,
    personality,
  });
  return data.data;
};
