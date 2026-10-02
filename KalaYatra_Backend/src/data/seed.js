const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

const connectDB = require("../config/db");

const City = require("../models/City");
const ArtForm = require("../models/ArtForm");
const Artist = require("../models/Artist");
const Artwork = require("../models/Artwork");
const Media = require("../models/Media");

/*
|--------------------------------------------------------------------------
| KALAYATRA SEED DATA
|--------------------------------------------------------------------------
| One seed file for:
| 1. Udupi
| 2. Mysuru
|
| Run:
|   node src/data/seed.js
|
| Or add a package.json script:
|   "seed": "node src/data/seed.js"
|--------------------------------------------------------------------------
*/


// ============================================================================
// HELPER
// ============================================================================

const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};


// ============================================================================
// Udupi DATA
// ============================================================================

const udupiData = {
  city: {
    name: "Udupi",
    slug: "udupi",
    state: "Karnataka",
    country: "India",
    description:
      "Udupi is a coastal cultural region of Karnataka known for Yakshagana, folk traditions, devotional practices, crafts, music and living performance traditions.",
    image: ""
  },

  artists: [
    {
      name: "Bannanje Sanjeeva Suvarna",
      bio:
        "A noted Yakshagana artist associated with the Badagutittu tradition.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "Naranappa Uppoor",
      bio:
        "A documented artist associated with the Yakshagana tradition of the coastal Karnataka region.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "Kalinga Navada",
      bio:
        "A documented artist associated with Yakshagana and the cultural traditions of coastal Karnataka.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "K. Ajith Kumar",
      bio:
        "A documented artist associated with traditional cultural practices in the Udupi region.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "Raghavendra Maiyya",
      bio:
        "A documented artist associated with traditional performance and cultural practices.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "Ambatanaya Mudradi",
      bio:
        "A documented artist associated with the cultural traditions of coastal Karnataka.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "Sampath Shetty",
      bio:
        "A documented artist associated with traditional cultural practices in coastal Karnataka.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    // Demo artists for the hackathon interaction flow.
    {
      name: "Pradeep Bhandary",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "pradeep.bhandary@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Ramesh Poojary",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "ramesh.poojary@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Harish Shetty",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "harish.shetty@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Manoj Shetty",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "manoj.shetty@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Vishwanath Acharya",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "vishwanath.acharya@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Mahesh Kumar",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "mahesh.kumar@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Anand Acharya",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "anand.acharya@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Ganesh Poojary",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "ganesh.poojary@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Raghavendra Acharya",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "raghavendra.acharya@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Mohan Acharya",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "mohan.acharya@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Shobha Shetty",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "shobha.shetty@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Vijay Shetty",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "vijay.shetty@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Prakash Bhat",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "prakash.bhat@kalayatra.test",
      isDemoArtist: true,
      works: []
    }
  ],

  artForms: [
    {
      name: "Yakshagana – Badagutittu",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800",
      slug: "yakshagana-badagutittu",
      category: "Performing Arts",
      originType: "regional",
      description:
        "A vibrant traditional theatre form of coastal Karnataka combining dance, dialogue, music, elaborate costumes and storytelling.",
      history:
        "Yakshagana developed as a major performance tradition in coastal Karnataka and continues to be performed through traditional theatre groups.",
      culturalSignificance:
        "It is an important living performance tradition connecting mythology, music, dance, storytelling and community participation.",
      characteristics: [
        "Dance",
        "Dialogue",
        "Live music",
        "Elaborate costumes",
        "Traditional storytelling"
      ],
      materials: [
        "Costume materials",
        "Headgear",
        "Jewellery",
        "Traditional instruments"
      ],
      examples: [],
      artists: [
        "Bannanje Sanjeeva Suvarna",
        "Naranappa Uppoor",
        "Kalinga Navada"
      ],
      locations: ["Udupi", "Coastal Karnataka"],
      journeyDuration: 30,
      tags: ["yakshagana", "theatre", "dance", "coastal-karnataka"]
    },

    {
      name: "Tala Maddale",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
      slug: "tala-maddale",
      category: "Performing Arts",
      originType: "regional",
      description:
        "A traditional literary and performance form related to Yakshagana in which performers engage in improvised dialogue and discussion.",
      history:
        "Tala Maddale developed within the cultural ecosystem of coastal Karnataka and is closely connected with Yakshagana traditions.",
      culturalSignificance:
        "It highlights verbal artistry, knowledge of stories and improvisational performance.",
      characteristics: [
        "Dialogue",
        "Improvisation",
        "Storytelling",
        "Literary interpretation"
      ],
      materials: ["Traditional musical accompaniment"],
      examples: [],
      artists: ["Naranappa Uppoor"],
      locations: ["Udupi", "Coastal Karnataka"],
      journeyDuration: 25,
      tags: ["tala-maddale", "yakshagana", "storytelling"]
    },

    {
      name: "Bhoota Kola / Bhoota Aradhane",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
      slug: "bhoota-kola-bhoota-aradhane",
      category: "Performing Arts",
      originType: "regional",
      description:
        "A traditional ritual performance practice found in the coastal Karnataka region.",
      history:
        "Bhoota Aradhane forms part of the ritual and cultural traditions of coastal Karnataka.",
      culturalSignificance:
        "The practice connects ritual, oral tradition, music, costume and community memory.",
      characteristics: [
        "Ritual performance",
        "Oral tradition",
        "Music",
        "Costume",
        "Community participation"
      ],
      materials: [
        "Traditional costume",
        "Ornaments",
        "Ritual objects"
      ],
      examples: [],
      artists: ["Ambatanaya Mudradi"],
      locations: ["Udupi", "Coastal Karnataka"],
      journeyDuration: 30,
      tags: ["bhoota-kola", "ritual", "folk-tradition"]
    },

    {
      name: "Nagamandala",
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800",
      slug: "nagamandala",
      category: "Performing Arts",
      originType: "regional",
      description:
        "A ritual performance tradition associated with serpent worship and ritual art in coastal Karnataka.",
      history:
        "Nagamandala belongs to the ritual traditions of the coastal Karnataka region.",
      culturalSignificance:
        "It represents the relationship between ritual, community, mythology and traditional performance.",
      characteristics: [
        "Ritual performance",
        "Dance",
        "Music",
        "Mythology"
      ],
      materials: [
        "Natural ritual materials",
        "Traditional decorations"
      ],
      examples: [],
      artists: ["K. Ajith Kumar"],
      locations: ["Udupi", "Coastal Karnataka"],
      journeyDuration: 30,
      tags: ["nagamandala", "ritual", "serpent-tradition"]
    },

    {
      name: "Aati Kalenja",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&q=80&w=800",
      slug: "aati-kalenja",
      category: "Performing Arts",
      originType: "regional",
      description:
        "A traditional folk performance associated with the Aati season in coastal Karnataka.",
      history:
        "Aati Kalenja is part of the seasonal folk traditions of the coastal region.",
      culturalSignificance:
        "It reflects seasonal customs, community memory and folk performance practices.",
      characteristics: [
        "Folk performance",
        "Seasonal tradition",
        "Costume",
        "Community participation"
      ],
      materials: ["Traditional costume materials"],
      examples: [],
      artists: ["K. Ajith Kumar"],
      locations: ["Udupi", "Coastal Karnataka"],
      journeyDuration: 20,
      tags: ["aati-kalenja", "folk", "seasonal"]
    },

    {
      name: "Kangilu",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800",
      slug: "kangilu",
      category: "Performing Arts",
      originType: "regional",
      description:
        "A traditional folk performance form associated with the cultural traditions of coastal Karnataka.",
      history:
        "Kangilu belongs to the folk-performance traditions of the coastal region.",
      culturalSignificance:
        "It preserves community performance traditions and local cultural expression.",
      characteristics: [
        "Folk dance",
        "Group performance",
        "Traditional movement"
      ],
      materials: ["Traditional costume"],
      examples: [],
      artists: ["Raghavendra Maiyya"],
      locations: ["Udupi", "Coastal Karnataka"],
      journeyDuration: 20,
      tags: ["kangilu", "folk-dance"]
    },

    {
      name: "Pili Yesa",
      image: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=800",
      slug: "pili-yesa",
      category: "Performing Arts",
      originType: "regional",
      description:
        "A tiger-themed folk performance tradition popular in the coastal Karnataka region.",
      history:
        "Pili Yesa is associated with festive and community performance traditions in coastal Karnataka.",
      culturalSignificance:
        "The performance is known for its distinctive visual identity and community participation.",
      characteristics: [
        "Tiger motifs",
        "Body painting",
        "Dance",
        "Festival performance"
      ],
      materials: [
        "Body paint",
        "Traditional costume materials"
      ],
      examples: [],
      artists: ["Sampath Shetty"],
      locations: ["Udupi", "Coastal Karnataka"],
      journeyDuration: 20,
      tags: ["pili-yesa", "tiger-dance", "folk"]
    },

    {
      name: "Gombeyatta",
      image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=800",
      slug: "gombeyatta",
      category: "Performing Arts",
      originType: "regional",
      description:
        "A traditional puppet theatre form involving handcrafted puppets and storytelling.",
      history:
        "Gombeyatta belongs to the traditional puppetry practices of Karnataka.",
      culturalSignificance:
        "It preserves storytelling, craftsmanship and traditional theatre techniques.",
      characteristics: [
        "Puppetry",
        "Storytelling",
        "Music",
        "Handcrafted puppets"
      ],
      materials: [
        "Wood",
        "Cloth",
        "Paint",
        "Natural materials"
      ],
      examples: [],
      artists: ["Pradeep Bhandary"],
      locations: ["Udupi"],
      journeyDuration: 25,
      tags: ["gombeyatta", "puppetry", "storytelling"]
    },

    {
      name: "Traditional Clay Idol Making",
      image: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&q=80&w=800",
      slug: "traditional-clay-idol-making",
      category: "Arts & Crafts",
      originType: "regional",
      description:
        "Traditional craft practices involving shaping and decorating clay figures and idols.",
      history:
        "Clay craftsmanship forms part of the traditional craft ecosystem of Karnataka.",
      culturalSignificance:
        "The craft preserves traditional material knowledge and handmade artistic practices.",
      characteristics: [
        "Hand modelling",
        "Clay work",
        "Painting",
        "Craftsmanship"
      ],
      materials: ["Clay", "Natural pigments"],
      examples: [],
      artists: ["Ramesh Poojary"],
      locations: ["Udupi"],
      journeyDuration: 25,
      tags: ["clay", "idols", "craft"]
    },

    {
      name: "Udupi Wood Carving",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=800",
      slug: "udupi-wood-carving",
      category: "Arts & Crafts",
      originType: "local",
      description:
        "Traditional wood-carving practices associated with craftspeople in the Udupi region.",
      history:
        "Wood carving has been practiced as part of the traditional craft culture of coastal Karnataka.",
      culturalSignificance:
        "It preserves woodworking knowledge, decorative traditions and handmade craftsmanship.",
      characteristics: [
        "Hand carving",
        "Decorative motifs",
        "Traditional woodworking"
      ],
      materials: ["Wood", "Traditional carving tools"],
      examples: [],
      artists: ["Harish Shetty"],
      locations: ["Udupi"],
      journeyDuration: 25,
      tags: ["wood-carving", "craft", "udupi"]
    },

    {
      name: "Bhoota Figure Carving",
      image: "https://images.unsplash.com/photo-1606744824163-985d376605aa?auto=format&fit=crop&q=80&w=800",
      slug: "bhoota-figure-carving",
      category: "Arts & Crafts",
      originType: "regional",
      description:
        "Traditional carving practices associated with figures used within the ritual culture of coastal Karnataka.",
      history:
        "The craft is connected with the material culture surrounding ritual traditions of coastal Karnataka.",
      culturalSignificance:
        "It demonstrates the relationship between craftsmanship, ritual and cultural memory.",
      characteristics: [
        "Wood carving",
        "Traditional figures",
        "Decorative work"
      ],
      materials: ["Wood", "Natural pigments"],
      examples: [],
      artists: ["Vishwanath Acharya"],
      locations: ["Udupi", "Coastal Karnataka"],
      journeyDuration: 25,
      tags: ["bhoota", "wood-carving", "ritual-art"]
    },

    {
      name: "Stone Carving",
      image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800",
      slug: "udupi-stone-carving",
      category: "Arts & Crafts",
      originType: "regional",
      description:
        "Traditional stone-working and sculptural practices found in the cultural landscape of Karnataka.",
      history:
        "Stone carving has a long presence in Karnataka's architectural and sculptural traditions.",
      culturalSignificance:
        "It preserves sculptural knowledge and traditional craftsmanship.",
      characteristics: [
        "Sculpting",
        "Hand carving",
        "Relief work"
      ],
      materials: ["Stone", "Metal carving tools"],
      examples: [],
      artists: ["Mahesh Kumar"],
      locations: ["Udupi"],
      journeyDuration: 30,
      tags: ["stone-carving", "sculpture"]
    },

    {
      name: "Metal Casting",
      image: "https://images.unsplash.com/photo-1533158307587-828f0a76ef46?auto=format&fit=crop&q=80&w=800",
      slug: "udupi-metal-casting",
      category: "Arts & Crafts",
      originType: "regional",
      description:
        "Traditional metal-working practices involving the shaping and casting of metal objects.",
      history:
        "Metal craft forms part of the traditional material culture of Karnataka.",
      culturalSignificance:
        "The craft preserves specialist material knowledge and handmade production techniques.",
      characteristics: [
        "Metal casting",
        "Hand finishing",
        "Traditional craftsmanship"
      ],
      materials: ["Metal", "Casting materials"],
      examples: [],
      artists: ["Anand Acharya"],
      locations: ["Udupi"],
      journeyDuration: 30,
      tags: ["metal", "casting", "craft"]
    },

    {
      name: "Udupi Saree Handloom Weaving",
      image: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&q=80&w=800",
      slug: "udupi-saree-handloom-weaving",
      category: "Arts & Crafts",
      originType: "local",
      description:
        "Traditional handloom weaving associated with saree production in the Udupi region.",
      history:
        "Handloom weaving forms part of the textile heritage of the Udupi region.",
      culturalSignificance:
        "The tradition preserves weaving knowledge, textile craftsmanship and regional identity.",
      characteristics: [
        "Handloom weaving",
        "Traditional textile patterns",
        "Manual craftsmanship"
      ],
      materials: ["Cotton", "Silk", "Traditional yarn"],
      examples: [],
      artists: ["Shobha Shetty"],
      locations: ["Udupi"],
      journeyDuration: 30,
      tags: ["handloom", "saree", "weaving", "textile"]
    },

    {
      name: "Yakshagana Costume Making",
      image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800",
      slug: "yakshagana-costume-making",
      category: "Arts & Crafts",
      originType: "regional",
      description:
        "Specialized craftsmanship involved in creating the elaborate costumes used in Yakshagana performances.",
      history:
        "Yakshagana costume traditions developed alongside the performance form in coastal Karnataka.",
      culturalSignificance:
        "Costume making is an important part of the visual language of Yakshagana.",
      characteristics: [
        "Handcrafting",
        "Decorative design",
        "Costume construction"
      ],
      materials: [
        "Fabric",
        "Wood",
        "Decorative materials",
        "Metal ornaments"
      ],
      examples: [],
      artists: ["Manoj Shetty"],
      locations: ["Udupi", "Coastal Karnataka"],
      journeyDuration: 25,
      tags: ["yakshagana", "costume", "craft"]
    },

    {
      name: "Yakshagana Jewellery / Gejje Making",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
      slug: "yakshagana-jewellery-gejje-making",
      category: "Arts & Crafts",
      originType: "regional",
      description:
        "Craftsmanship associated with the jewellery and traditional accessories used in Yakshagana performances.",
      history:
        "Yakshagana accessories developed as part of the visual and performance traditions of coastal Karnataka.",
      culturalSignificance:
        "These objects contribute to the distinctive visual identity of the performance tradition.",
      characteristics: [
        "Jewellery making",
        "Decorative craft",
        "Hand finishing"
      ],
      materials: [
        "Metal",
        "Decorative materials",
        "Fabric"
      ],
      examples: [],
      artists: ["Ganesh Poojary"],
      locations: ["Udupi"],
      journeyDuration: 25,
      tags: ["yakshagana", "jewellery", "gejje"]
    },

    {
      name: "Yakshagana Music",
      image: "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800",
      slug: "yakshagana-music",
      category: "Music",
      originType: "regional",
      description:
        "The musical tradition accompanying Yakshagana performances.",
      history:
        "Yakshagana music evolved alongside the performance tradition and remains central to its presentation.",
      culturalSignificance:
        "Music supports storytelling, rhythm, movement and dramatic expression.",
      characteristics: [
        "Percussion",
        "Singing",
        "Rhythm",
        "Live accompaniment"
      ],
      materials: [
        "Traditional musical instruments"
      ],
      examples: [],
      artists: ["Raghavendra Acharya"],
      locations: ["Udupi", "Coastal Karnataka"],
      journeyDuration: 25,
      tags: ["yakshagana", "music", "percussion"]
    },

    {
      name: "Yakshagana Oral Storytelling",
      image: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&q=80&w=800",
      slug: "yakshagana-oral-storytelling",
      category: "Literature & Language",
      originType: "regional",
      description:
        "The oral storytelling and dialogue tradition embedded within Yakshagana performance.",
      history:
        "Oral storytelling has remained an important component of Yakshagana's performance structure.",
      culturalSignificance:
        "It preserves stories, language, performance knowledge and intergenerational cultural memory.",
      characteristics: [
        "Oral storytelling",
        "Dialogue",
        "Improvisation",
        "Mythological narratives"
      ],
      materials: [],
      examples: [],
      artists: ["Mohan Acharya"],
      locations: ["Udupi", "Coastal Karnataka"],
      journeyDuration: 20,
      tags: ["yakshagana", "storytelling", "oral-tradition"]
    }
  ],

    media: [
    {
      title: "Yakshagana Badagutittu Live Performance",
      type: "image",
      url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800",
      artFormSlug: "yakshagana-badagutittu",
      description: "Elaborate Kirita crown, vibrant costume, and intricate face painting of a traditional Badagutittu dancer.",
      sourceUrl: "https://unsplash.com/photos/traditional-indian-performance",
      attribution: "Photo by Cultural Documentation Archive / Unsplash"
    },
    {
      title: "Bhoota Kola Spirit Worship Ritual",
      type: "image",
      url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
      artFormSlug: "bhoota-kola-bhoota-aradhane",
      description: "Sacred night ritual performance in coastal Karnataka featuring traditional palm leaf headdress and ceremonial fire.",
      sourceUrl: "https://unsplash.com/photos/folk-spirit-worship",
      attribution: "Photo by Coastal Karnataka Heritage Archive"
    },
    {
      title: "Udupi Handloom Saree Weaving",
      type: "image",
      url: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1606744837616-56c9a5c6a6eb?auto=format&fit=crop&q=80&w=800",
      artFormSlug: "udupi-saree-handloom-weaving",
      description: "Traditional weaver operating a frame loom to craft GI-certified Udupi cotton saree with dyed borders.",
      sourceUrl: "https://unsplash.com/photos/handloom-weaver",
      attribution: "Photo by Udupi Handloom Weavers Cooperative"
    },
    {
      title: "Yakshagana Dance-Drama Performance Highlights",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=L_LUpnjgPso",
      thumbnail: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800",
      artFormSlug: "yakshagana-badagutittu",
      description: "Documentary recording showing dramatic dialogue, high-energy footwork, and live musical accompaniment.",
      sourceUrl: "https://www.youtube.com/watch?v=L_LUpnjgPso",
      attribution: "Karnataka Cultural Performing Arts Channel"
    },
    {
      title: "Pili Yesa Tiger Dance Coastal Festival",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=2vjPBrBU-TM",
      thumbnail: "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?auto=format&fit=crop&q=80&w=800",
      artFormSlug: "pili-yesa",
      description: "Folk dancers adorned in body-painted tiger stripes performing acrobatic stunts during Navratri.",
      sourceUrl: "https://www.youtube.com/watch?v=2vjPBrBU-TM",
      attribution: "Coastal Heritage Media"
    },
    {
      title: "Chande & Maddale Drum Rhythms",
      type: "audio",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
      thumbnail: "",
      artFormSlug: "yakshagana-music",
      description: "High-intensity percussion rhythm composed of Chande high-pitch drum and Maddale bass drum.",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Yakshagana_music_sample.mp3",
      attribution: "Audio Recording by Coastal Folk Music Society"
    }
  ]
};


// ============================================================================
// MYSURU DATA
// ============================================================================

const mysuruData = {
  city: {
    name: "Mysuru",
    slug: "mysuru",
    state: "Karnataka",
    country: "India",
    description:
      "Mysuru is a major cultural centre of Karnataka known for traditional painting, crafts, textiles, music, dance and performance traditions.",
    image: ""
  },

  artists: [
    {
      name: "Ramanarasaiah",
      bio:
        "A documented artist associated with the Mysuru traditional painting tradition.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "Chandrika",
      bio:
        "A documented artist associated with traditional artistic practices in Mysuru.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "Aanand",
      bio:
        "A documented artist associated with traditional arts and crafts in Mysuru.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "B. P. Ramakrishna",
      bio:
        "A documented artist associated with traditional art practices in Mysuru.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "Subramanya Raju",
      bio:
        "A documented artist associated with traditional craft practices.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "Raghupathi Bhat",
      bio:
        "A documented artist associated with traditional artistic practices.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "Sudha Venkatesh",
      bio:
        "A documented artist associated with traditional artistic practices in Mysuru.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "M. Ramanarasaiah",
      bio:
        "A documented artist associated with Mysuru traditional painting.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "Shivaraju",
      bio:
        "A documented artist associated with traditional crafts.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "M. R. Kailas",
      bio:
        "A documented artist associated with traditional artistic practices.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "Chandrashekar N",
      bio:
        "A documented artist associated with traditional crafts and art.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "Nayaz Pasha",
      bio:
        "A documented artist associated with traditional crafts in Mysuru.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "Mohammed Ziauddin",
      bio:
        "A documented artist associated with traditional crafts.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "Syed Najma",
      bio:
        "A documented artist associated with traditional artistic practices.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    {
      name: "Rajappa Kuppe Venkataramu",
      bio:
        "A documented artist associated with traditional artistic practices in Mysuru.",
      email: null,
      isDemoArtist: false,
      works: []
    },

    // Demo artists
    {
      name: "Ravi Acharya",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "ravi.acharya@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Ramesh Acharya",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "ramesh.acharya@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Venkatesh Acharya",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "venkatesh.acharya@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Suresh Kumar",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "suresh.kumar@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Meera Rao",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "meera.rao@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Lakshman Rao",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "lakshman.rao@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Anitha Devi",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "anitha.devi@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Suresh Gowda",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "suresh.gowda@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Mohan Kumar",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "mohan.kumar@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Lakshmi Devi",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "lakshmi.devi@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Ravi Kumar",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "ravi.kumar@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Shivanna Gowda",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "shivanna.gowda@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Mahadevappa",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "mahadevappa@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Chikkanna",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "chikkanna@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Srinivas Rao",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "srinivas.rao@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Kiran Gowda",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "kiran.gowda@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Vishwanath Bhat",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "vishwanath.bhat@kalayatra.test",
      isDemoArtist: true,
      works: []
    },

    {
      name: "Meenakshi Ganesan",
      bio:
        "Demo artist profile created for the KalaYatra prototype.",
      email: "meenakshi.ganesan@kalayatra.test",
      isDemoArtist: true,
      works: []
    }
  ],

  artForms: [
    {
      name: "Mysuru Traditional Painting",
      image: "https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&q=80&w=800",
      slug: "mysuru-traditional-painting",
      category: "Arts & Crafts",
      originType: "local",
      description:
        "A traditional painting style associated with the Mysuru region, known for detailed compositions and decorative elements.",
      history:
        "The Mysuru painting tradition developed as part of the artistic culture associated with the Mysuru court and region.",
      culturalSignificance:
        "It is an important visual-art tradition associated with Mysuru's cultural identity.",
      characteristics: [
        "Detailed line work",
        "Decorative composition",
        "Traditional themes",
        "Gold embellishment"
      ],
      materials: [
        "Canvas",
        "Natural pigments",
        "Gold leaf",
        "Traditional brushes"
      ],
      examples: [],
      artists: [
        "Ramanarasaiah",
        "M. Ramanarasaiah"
      ],
      locations: ["Mysuru"],
      journeyDuration: 30,
      tags: ["mysuru", "painting", "traditional-art"]
    },

    {
      name: "Mysuru Ganjifa",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=800",
      slug: "mysuru-ganjifa",
      category: "Arts & Crafts",
      originType: "local",
      description:
        "A traditional hand-painted card art tradition associated with Mysuru.",
      history:
        "Ganjifa developed as a traditional painted-card art and became associated with courtly and artistic traditions in Mysuru.",
      culturalSignificance:
        "It combines painting, storytelling and craftsmanship in a distinctive traditional art object.",
      characteristics: [
        "Miniature painting",
        "Detailed motifs",
        "Hand-painted cards"
      ],
      materials: [
        "Card",
        "Natural pigments",
        "Brushes"
      ],
      examples: [],
      artists: ["Chandrika"],
      locations: ["Mysuru"],
      journeyDuration: 25,
      tags: ["ganjifa", "cards", "painting"]
    },

    {
      name: "Mysuru Rosewood Inlay",
      image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800",
      slug: "mysuru-rosewood-inlay",
      category: "Arts & Crafts",
      originType: "local",
      description:
        "A decorative craft involving intricate inlay work on rosewood surfaces.",
      history:
        "Rosewood inlay became an important craft associated with Mysuru's woodworking traditions.",
      culturalSignificance:
        "It represents detailed craftsmanship and the region's woodworking heritage.",
      characteristics: [
        "Inlay work",
        "Geometric patterns",
        "Decorative craftsmanship"
      ],
      materials: [
        "Rosewood",
        "Wood veneers",
        "Inlay materials"
      ],
      examples: [],
      artists: ["Aanand"],
      locations: ["Mysuru"],
      journeyDuration: 30,
      tags: ["rosewood", "inlay", "woodcraft"]
    },

    {
      name: "Sandalwood Carving",
      image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800",
      slug: "sandalwood-carving",
      category: "Arts & Crafts",
      originType: "regional",
      description:
        "Traditional carving of sandalwood into decorative and artistic objects.",
      history:
        "Sandalwood carving has a strong association with Karnataka's traditional craft heritage.",
      culturalSignificance:
        "It represents detailed hand craftsmanship and the cultural importance of sandalwood in Karnataka.",
      characteristics: [
        "Fine carving",
        "Floral motifs",
        "Detailed ornamentation"
      ],
      materials: [
        "Sandalwood",
        "Traditional carving tools"
      ],
      examples: [],
      artists: ["B. P. Ramakrishna"],
      locations: ["Mysuru"],
      journeyDuration: 30,
      tags: ["sandalwood", "carving", "craft"]
    },

    {
      name: "Rosewood Carving",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      slug: "rosewood-carving",
      category: "Arts & Crafts",
      originType: "regional",
      description:
        "Traditional carving practices using rosewood to create decorative objects and artworks.",
      history:
        "Rosewood craftsmanship forms part of Karnataka's traditional woodworking heritage.",
      culturalSignificance:
        "It preserves woodworking skills and decorative craft traditions.",
      characteristics: [
        "Hand carving",
        "Decorative motifs",
        "Fine woodworking"
      ],
      materials: [
        "Rosewood",
        "Carving tools"
      ],
      examples: [],
      artists: ["Subramanya Raju"],
      locations: ["Mysuru"],
      journeyDuration: 30,
      tags: ["rosewood", "carving", "woodcraft"]
    },

    {
      name: "Stone Sculpture",
      image: "https://images.unsplash.com/photo-1567016432779-094069958ea5?auto=format&fit=crop&q=80&w=800",
      slug: "mysuru-stone-sculpture",
      category: "Arts & Crafts",
      originType: "regional",
      description:
        "Traditional sculptural practices involving carving and shaping stone.",
      history:
        "Stone sculpture has a long history within Karnataka's artistic and architectural traditions.",
      culturalSignificance:
        "It preserves sculptural techniques and traditional visual culture.",
      characteristics: [
        "Stone carving",
        "Sculptural modelling",
        "Relief work"
      ],
      materials: ["Stone", "Metal tools"],
      examples: [],
      artists: ["Raghupathi Bhat"],
      locations: ["Mysuru"],
      journeyDuration: 30,
      tags: ["stone", "sculpture"]
    },

    {
      name: "Traditional Wood Carving",
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800",
      slug: "traditional-wood-carving-mysuru",
      category: "Arts & Crafts",
      originType: "regional",
      description:
        "Traditional woodworking and carving practices found within Mysuru's craft culture.",
      history:
        "Wood carving forms part of Mysuru's broader decorative craft heritage.",
      culturalSignificance:
        "The craft preserves traditional woodworking techniques.",
      characteristics: [
        "Hand carving",
        "Decorative design",
        "Traditional motifs"
      ],
      materials: ["Wood", "Traditional tools"],
      examples: [],
      artists: ["Sudha Venkatesh"],
      locations: ["Mysuru"],
      journeyDuration: 25,
      tags: ["wood", "carving", "craft"]
    },

    {
      name: "Traditional Mural Painting",
      image: "https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&q=80&w=800",
      slug: "traditional-mural-painting-mysuru",
      category: "Arts & Crafts",
      originType: "regional",
      description:
        "Traditional mural painting practices associated with Karnataka's visual-art heritage.",
      history:
        "Mural painting is part of the broader traditional visual culture of Karnataka.",
      culturalSignificance:
        "It preserves large-scale narrative and decorative painting traditions.",
      characteristics: [
        "Wall painting",
        "Narrative composition",
        "Traditional motifs"
      ],
      materials: [
        "Natural pigments",
        "Wall surfaces",
        "Traditional brushes"
      ],
      examples: [],
      artists: ["Shivaraju"],
      locations: ["Mysuru"],
      journeyDuration: 30,
      tags: ["mural", "painting", "traditional-art"]
    },

    {
      name: "Gold-Leaf / Gold-Foil Embellishment",
      image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
      slug: "gold-leaf-gold-foil-embellishment",
      category: "Arts & Crafts",
      originType: "regional",
      description:
        "Decorative techniques involving gold leaf or gold foil as part of traditional visual art.",
      history:
        "Gold embellishment has been used within traditional decorative painting practices.",
      culturalSignificance:
        "It contributes to the distinctive ornamental quality of traditional artworks.",
      characteristics: [
        "Gold leaf",
        "Fine detailing",
        "Decorative ornamentation"
      ],
      materials: [
        "Gold leaf",
        "Adhesive",
        "Painting surface"
      ],
      examples: [],
      artists: ["M. Ramanarasaiah"],
      locations: ["Mysuru"],
      journeyDuration: 20,
      tags: ["gold-leaf", "painting", "embellishment"]
    },

    {
      name: "Mysuru Silk / Mysore Silk Weaving",
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
      slug: "mysuru-silk-mysore-silk-weaving",
      category: "Arts & Crafts",
      originType: "local",
      description:
        "Traditional silk weaving associated with the Mysuru region.",
      history:
        "Mysuru developed a major silk-weaving tradition that became strongly associated with the region.",
      culturalSignificance:
        "Silk weaving is an important part of Mysuru's textile and craft identity.",
      characteristics: [
        "Silk weaving",
        "Fine textile production",
        "Traditional patterns"
      ],
      materials: [
        "Silk yarn",
        "Traditional weaving equipment"
      ],
      examples: [],
      artists: ["M. R. Kailas"],
      locations: ["Mysuru"],
      journeyDuration: 30,
      tags: ["mysuru-silk", "silk", "weaving"]
    },

    {
      name: "Traditional Silk Saree Weaving",
      image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
      slug: "traditional-silk-saree-weaving",
      category: "Arts & Crafts",
      originType: "regional",
      description:
        "Traditional handloom practices used to create silk sarees.",
      history:
        "Silk saree weaving forms part of Karnataka's long-standing textile heritage.",
      culturalSignificance:
        "It preserves weaving knowledge, textile design and traditional craftsmanship.",
      characteristics: [
        "Handloom weaving",
        "Silk production",
        "Decorative borders"
      ],
      materials: [
        "Silk",
        "Traditional yarn"
      ],
      examples: [],
      artists: ["Chandrashekar N"],
      locations: ["Mysuru"],
      journeyDuration: 30,
      tags: ["silk", "saree", "handloom"]
    },

    {
      name: "Mysuru Silk Dyeing & Printing",
      image: "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=800",
      slug: "mysuru-silk-dyeing-printing",
      category: "Arts & Crafts",
      originType: "regional",
      description:
        "Traditional textile processes involving dyeing and decorative treatment of silk.",
      history:
        "Dyeing and textile finishing form part of the silk-production ecosystem in Mysuru.",
      culturalSignificance:
        "These practices preserve knowledge of textile colour and finishing techniques.",
      characteristics: [
        "Dyeing",
        "Colour preparation",
        "Textile finishing"
      ],
      materials: [
        "Silk",
        "Natural or textile dyes"
      ],
      examples: [],
      artists: ["Nayaz Pasha"],
      locations: ["Mysuru"],
      journeyDuration: 25,
      tags: ["silk", "dyeing", "textile"]
    },

    {
      name: "Traditional Incense / Agarbatti Making",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
      slug: "traditional-incense-agarbatti-making",
      category: "Arts & Crafts",
      originType: "regional",
      description:
        "Traditional craft practices involved in preparing incense products.",
      history:
        "Incense production forms part of Karnataka's traditional craft and household practices.",
      culturalSignificance:
        "It connects material craft with sensory and ritual traditions.",
      characteristics: [
        "Hand preparation",
        "Natural materials",
        "Fragrance blending"
      ],
      materials: [
        "Natural aromatic materials",
        "Wood powders",
        "Binding materials"
      ],
      examples: [],
      artists: ["Mohammed Ziauddin"],
      locations: ["Mysuru"],
      journeyDuration: 20,
      tags: ["incense", "agarbatti", "craft"]
    },

    {
      name: "Pooja Kunitha",
      image: "https://images.unsplash.com/photo-1532375810709-75b1da00537c?auto=format&fit=crop&q=80&w=800",
      slug: "pooja-kunitha",
      category: "Performing Arts",
      originType: "regional",
      description:
        "A traditional folk dance associated with ceremonial and cultural practices.",
      history:
        "Pooja Kunitha belongs to Karnataka's traditional folk-performance traditions.",
      culturalSignificance:
        "It connects dance, ritual, music and community celebration.",
      characteristics: [
        "Folk dance",
        "Ceremonial performance",
        "Rhythm",
        "Costume"
      ],
      materials: ["Traditional costume"],
      examples: [],
      artists: ["Syed Najma"],
      locations: ["Mysuru"],
      journeyDuration: 20,
      tags: ["pooja-kunitha", "folk-dance"]
    },

    {
      name: "Dollu Kunitha",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
      slug: "dollu-kunitha",
      category: "Performing Arts",
      originType: "regional",
      description:
        "A vigorous traditional drum dance of Karnataka.",
      history:
        "Dollu Kunitha developed as a major folk-performance tradition in Karnataka.",
      culturalSignificance:
        "It combines percussion, coordinated movement and community performance.",
      characteristics: [
        "Drum performance",
        "Group dance",
        "Rhythmic movement"
      ],
      materials: [
        "Traditional drums",
        "Performance costume"
      ],
      examples: [],
      artists: ["Rajappa Kuppe Venkataramu"],
      locations: ["Mysuru"],
      journeyDuration: 20,
      tags: ["dollu-kunitha", "drum", "folk-dance"]
    },

    {
      name: "Beesu Kamsale",
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800",
      slug: "beesu-kamsale",
      category: "Performing Arts",
      originType: "regional",
      description:
        "A traditional Karnataka performance involving rhythmic movement and Kamsale instruments.",
      history:
        "Beesu Kamsale is part of Karnataka's traditional folk-performance culture.",
      culturalSignificance:
        "It combines movement, rhythm and traditional instrumental performance.",
      characteristics: [
        "Dance",
        "Rhythm",
        "Metal percussion"
      ],
      materials: ["Kamsale instruments"],
      examples: [],
      artists: ["Ravi Acharya"],
      locations: ["Mysuru"],
      journeyDuration: 20,
      tags: ["kamsale", "folk-dance", "percussion"]
    },

    {
      name: "Kamsale Nritya",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800",
      slug: "kamsale-nritya",
      category: "Performing Arts",
      originType: "regional",
      description:
        "A traditional dance form involving Kamsale instruments and rhythmic movement.",
      history:
        "Kamsale performance forms part of Karnataka's folk dance traditions.",
      culturalSignificance:
        "The form combines dance and percussion as a coordinated performance.",
      characteristics: [
        "Dance",
        "Percussion",
        "Group performance"
      ],
      materials: ["Kamsale instruments"],
      examples: [],
      artists: ["Ramesh Acharya"],
      locations: ["Mysuru"],
      journeyDuration: 20,
      tags: ["kamsale", "dance"]
    },

    {
      name: "Somana Kunitha",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800",
      slug: "somana-kunitha",
      category: "Performing Arts",
      originType: "regional",
      description:
        "A traditional masked folk performance associated with Karnataka.",
      history:
        "Somana Kunitha belongs to Karnataka's folk and ritual performance traditions.",
      culturalSignificance:
        "It preserves traditional mask-making, performance and storytelling practices.",
      characteristics: [
        "Masks",
        "Dance",
        "Folk performance",
        "Ritual elements"
      ],
      materials: [
        "Traditional masks",
        "Costume materials"
      ],
      examples: [],
      artists: ["Venkatesh Acharya"],
      locations: ["Mysuru"],
      journeyDuration: 25,
      tags: ["somana-kunitha", "masks", "folk"]
    },

    {
      name: "Gombe Aata / Puppetry",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800",
      slug: "gombe-aata-puppetry",
      category: "Performing Arts",
      originType: "regional",
      description:
        "Traditional puppet theatre involving handcrafted puppets and narrative performance.",
      history:
        "Puppetry has been practiced across Karnataka as a traditional storytelling medium.",
      culturalSignificance:
        "It preserves storytelling, craftsmanship and traditional theatre techniques.",
      characteristics: [
        "Puppetry",
        "Storytelling",
        "Handcrafted figures"
      ],
      materials: [
        "Wood",
        "Cloth",
        "Paint"
      ],
      examples: [],
      artists: ["Suresh Kumar"],
      locations: ["Mysuru"],
      journeyDuration: 25,
      tags: ["puppetry", "gombe-aata", "storytelling"]
    },

    {
      name: "Huli Vesha",
      image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=800",
      slug: "huli-vesha",
      category: "Performing Arts",
      originType: "regional",
      description:
        "A tiger-themed folk performance tradition involving distinctive body painting and dance.",
      history:
        "Huli-themed folk performances are found in Karnataka's festive traditions.",
      culturalSignificance:
        "The performance combines visual art, dance and community celebration.",
      characteristics: [
        "Body painting",
        "Tiger motifs",
        "Dance",
        "Festival performance"
      ],
      materials: [
        "Body paint",
        "Performance costume"
      ],
      examples: [],
      artists: ["Meera Rao"],
      locations: ["Mysuru"],
      journeyDuration: 20,
      tags: ["huli-vesha", "tiger", "folk-dance"]
    },

    {
      name: "Carnatic Music",
      image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
      slug: "carnatic-music-mysuru",
      category: "Music",
      originType: "regional",
      description:
        "The South Indian classical music tradition with a strong presence in Mysuru's cultural life.",
      history:
        "Mysuru has historically supported classical music traditions and musicians.",
      culturalSignificance:
        "Carnatic music is an important part of South India's classical musical heritage.",
      characteristics: [
        "Raga",
        "Tala",
        "Vocal music",
        "Instrumental music"
      ],
      materials: [
        "Traditional musical instruments"
      ],
      examples: [],
      artists: ["Lakshman Rao"],
      locations: ["Mysuru"],
      journeyDuration: 30,
      tags: ["carnatic", "classical-music", "mysuru"]
    },

    {
      name: "Bharatanatyam",
      image: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800",
      slug: "bharatanatyam-mysuru",
      category: "Performing Arts",
      originType: "regional",
      description:
        "A major Indian classical dance tradition practiced and taught in Mysuru.",
      history:
        "Bharatanatyam has become part of the classical performing-arts ecosystem across Karnataka and India.",
      culturalSignificance:
        "It combines dance, music, expression and storytelling.",
      characteristics: [
        "Classical dance",
        "Mudras",
        "Abhinaya",
        "Rhythmic movement"
      ],
      materials: [
        "Traditional dance costume",
        "Ankle bells"
      ],
      examples: [],
      artists: ["Anitha Devi"],
      locations: ["Mysuru"],
      journeyDuration: 30,
      tags: ["bharatanatyam", "classical-dance"]
    },

    {
      name: "Traditional Puppetry",
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&q=80&w=800",
      slug: "traditional-puppetry-mysuru",
      category: "Performing Arts",
      originType: "regional",
      description:
        "Traditional puppet theatre used for storytelling and cultural performance.",
      history:
        "Puppetry forms part of Karnataka's traditional theatre and storytelling heritage.",
      culturalSignificance:
        "It connects visual craftsmanship, storytelling and performance.",
      characteristics: [
        "Puppetry",
        "Storytelling",
        "Craftsmanship"
      ],
      materials: [
        "Wood",
        "Cloth",
        "Paint"
      ],
      examples: [],
      artists: [
        "Suresh Gowda",
        "Mohan Kumar"
      ],
      locations: ["Mysuru"],
      journeyDuration: 25,
      tags: ["puppetry", "traditional-theatre"]
    }
  ],

    media: [
    {
      title: "Mysuru Gold Leaf Painting Detail",
      type: "image",
      url: "https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1577720643272-265f09367456?auto=format&fit=crop&q=80&w=800",
      artFormSlug: "mysuru-traditional-painting",
      description: "Traditional Gesso relief artwork embellished with 24-karat pure gold foil work.",
      sourceUrl: "https://unsplash.com/photos/mysore-painting",
      attribution: "Photo by Mysuru Fine Arts Academy Archive"
    },
    {
      title: "Pure Mysore Silk Zari Saree",
      type: "image",
      url: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800",
      artFormSlug: "mysuru-silk-mysore-silk-weaving",
      description: "Authentic KSIC Mysuru silk weave showcasing rich crepe texture and pure gold zari borders.",
      sourceUrl: "https://unsplash.com/photos/mysore-silk",
      attribution: "Photo by Karnataka Silk Industries Corporation"
    },
    {
      title: "Rosewood Inlay Mastercraft",
      type: "image",
      url: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=1200",
      thumbnail: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&q=80&w=800",
      artFormSlug: "mysuru-rosewood-inlay",
      description: "Handcrafted rosewood art panel embedded with colored wood motifs depicting royal processions.",
      sourceUrl: "https://unsplash.com/photos/rosewood-inlay",
      attribution: "Photo by Mysuru Craftsman Guild"
    },
    {
      title: "Dollu Kunitha Folk Performance at Mysuru Palace",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=2vjPBrBU-TM",
      thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800",
      artFormSlug: "dollu-kunitha",
      description: "Thrilling drum dance performed by male dancers with large drums suspended around their necks.",
      sourceUrl: "https://www.youtube.com/watch?v=2vjPBrBU-TM",
      attribution: "Mysuru Dasara Cultural Committee"
    },
    {
      title: "Classical Bharatanatyam Solo Recital",
      type: "youtube",
      url: "https://www.youtube.com/watch?v=3g8-0gC-t_Q",
      thumbnail: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800",
      artFormSlug: "bharatanatyam-mysuru",
      description: "Expressive Abhinaya and Nritta classical dance performance in Mysuru royal court tradition.",
      sourceUrl: "https://www.youtube.com/watch?v=3g8-0gC-t_Q",
      attribution: "South Zone Cultural Centre"
    },
    {
      title: "Carnatic Saraswati Veena Raga Recital",
      type: "audio",
      url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
      thumbnail: "",
      artFormSlug: "carnatic-music-mysuru",
      description: "Soulful Carnatic instrumental composition played on the traditional Saraswati Veena.",
      sourceUrl: "https://commons.wikimedia.org/wiki/File:Carnatic_Veena.mp3",
      attribution: "Audio Archive of Mysuru Palace Music Heritage"
    }
  ]
};


// ============================================================================
// DATASET COLLECTION
// ============================================================================

const datasets = [
  udupiData,
  mysuruData
];


// ============================================================================
// SEED FUNCTION
// ============================================================================

const seedDatabase = async () => {
  try {
    console.log("");
    console.log("========================================");
    console.log("        KALAYATRA DATABASE SEED");
    console.log("========================================");
    console.log("");

    await connectDB();

    console.log("MongoDB connected.");
    console.log("Clearing old data...");

    // Delete child collections first.
    await Media.deleteMany({});
    await Artwork.deleteMany({});
    await ArtForm.deleteMany({});
    await Artist.deleteMany({});
    await City.deleteMany({});

    console.log("Old data cleared.");
    console.log("");

    // ------------------------------------------------------------------------
    // Maps
    // ------------------------------------------------------------------------

    const cityMap = {};
    const artistMap = {};
    const artFormMap = {};

    // ------------------------------------------------------------------------
    // 1. CREATE CITIES
    // ------------------------------------------------------------------------

    console.log("Creating cities...");

    for (const dataset of datasets) {
      const city = await City.create({
        name: dataset.city.name,
        slug: dataset.city.slug,
        state: dataset.city.state,
        country: dataset.city.country,
        description: dataset.city.description,
        image: dataset.city.image || ""
      });

      cityMap[dataset.city.slug] = city;

      console.log(`✓ City created: ${city.name}`);
    }

    console.log("");

    // ------------------------------------------------------------------------
    // 2. CREATE ARTISTS
    // ------------------------------------------------------------------------

    console.log("Creating artists...");

    for (const dataset of datasets) {
      const city = cityMap[dataset.city.slug];

      for (const artistData of dataset.artists) {
        const artistSlug = `${dataset.city.slug}-${slugify(
          artistData.name
        )}`;

        const artist = await Artist.create({
          name: artistData.name,
          slug: artistSlug,
          city: city._id,
          artForms: [],
          bio: artistData.bio || "",
          shortBio:
            artistData.bio && artistData.bio.length > 160
              ? `${artistData.bio.substring(0, 157)}...`
              : artistData.bio || "",
          image: artistData.image || "",
          location: artistData.location || dataset.city.name,
          email: artistData.email || null,
          isDemoArtist: artistData.isDemoArtist || false,
          works: artistData.works || [],
          tags: artistData.tags || []
        });

        const key = `${dataset.city.slug}:${artistData.name}`;

        artistMap[key] = artist;

        console.log(
          `✓ Artist created: ${artistData.name} (${dataset.city.name})`
        );
      }
    }

    console.log("");

    // ------------------------------------------------------------------------
    // 3. CREATE ART FORMS
    // ------------------------------------------------------------------------

    console.log("Creating art forms...");

    for (const dataset of datasets) {
      const city = cityMap[dataset.city.slug];

      for (const artFormData of dataset.artForms) {
        const artistIds = [];

        for (const artistName of artFormData.artists || []) {
          const artistKey = `${dataset.city.slug}:${artistName}`;
          const artist = artistMap[artistKey];

          if (!artist) {
            console.warn(
              `⚠ Artist not found: ${artistName} for ${artFormData.name}`
            );
            continue;
          }

          artistIds.push(artist._id);
        }

        const artForm = await ArtForm.create({
          name: artFormData.name,
          slug: artFormData.slug,
          city: city._id,
          category: artFormData.category,
          originType: artFormData.originType || "regional",
          description: artFormData.description || "",
          history: artFormData.history || "",
          culturalSignificance:
            artFormData.culturalSignificance || "",
          characteristics: artFormData.characteristics || [],
          materials: artFormData.materials || [],
          examples: artFormData.examples || [],
          artists: artistIds,
          media: [],
          locations: artFormData.locations || [],
          journeyDuration: artFormData.journeyDuration || 30,
          tags: artFormData.tags || [],
          image: artFormData.image || ""
        });

        const artFormKey =
          `${dataset.city.slug}:${artFormData.slug}`;

        artFormMap[artFormKey] = artForm;

        // Add this art form to every associated artist.
        for (const artistId of artistIds) {
          await Artist.findByIdAndUpdate(
            artistId,
            {
              $addToSet: {
                artForms: artForm._id
              }
            }
          );
        }

        console.log(
          `✓ Art form created: ${artFormData.name} (${dataset.city.name})`
        );
      }
    }

    console.log("");

    // ------------------------------------------------------------------------
    // 4. CREATE MEDIA
    // ------------------------------------------------------------------------

    console.log("Creating media...");

    let mediaCount = 0;

    for (const dataset of datasets) {
      const city = cityMap[dataset.city.slug];

      for (const mediaData of dataset.media || []) {
        // Never insert fake placeholder YouTube URLs.
        if (
          !mediaData.url ||
          mediaData.url.includes("REPLACE_WITH_VERIFIED")
        ) {
          console.log(
            `⚠ Skipping placeholder media: ${mediaData.title}`
          );
          continue;
        }

        let artForm = null;

        if (mediaData.artFormSlug) {
          const artFormKey =
            `${dataset.city.slug}:${mediaData.artFormSlug}`;

          artForm = artFormMap[artFormKey];

          if (!artForm) {
            console.warn(
              `⚠ Art form not found for media: ${mediaData.title}`
            );
          }
        }

        const media = await Media.create({
          title: mediaData.title,
          type: mediaData.type || "youtube",
          url: mediaData.url,
          thumbnail: mediaData.thumbnail || "",
          city: city._id,
          artForm: artForm ? artForm._id : null,
          artist: null,
          description: mediaData.description || "",
          sourceUrl: mediaData.sourceUrl || mediaData.url || "",
          attribution: mediaData.attribution || ""
        });

        mediaCount++;

        // Connect media to the art form.
        if (artForm) {
          await ArtForm.findByIdAndUpdate(
            artForm._id,
            {
              $addToSet: {
                media: media._id
              }
            }
          );
        }

        console.log(
          `✓ Media created: ${mediaData.title}`
        );
      }
    }

    console.log("");

    // ------------------------------------------------------------------------
    // 5. OPTIONAL ARTWORK DATA
    // ------------------------------------------------------------------------
    // The supplied source datasets do not currently contain separate
    // Artwork records, so no Artwork documents are created here.
    //
    // When you add artwork data later, use:
    //
    // await Artwork.create({
    //   title,
    //   slug,
    //   city,
    //   artForm,
    //   artist,
    //   description,
    //   year,
    //   image,
    //   tags
    // });

    // ------------------------------------------------------------------------
    // 6. COUNTS
    // ------------------------------------------------------------------------

    const cityCount = await City.countDocuments();
    const artistCount = await Artist.countDocuments();
    const artFormCount = await ArtForm.countDocuments();
    const artworkCount = await Artwork.countDocuments();
    const finalMediaCount = await Media.countDocuments();

    console.log("========================================");
    console.log("       DATABASE SEED COMPLETED");
    console.log("========================================");
    console.log(`Cities:    ${cityCount}`);
    console.log(`Artists:   ${artistCount}`);
    console.log(`Art Forms: ${artFormCount}`);
    console.log(`Artworks:  ${artworkCount}`);
    console.log(`Media:     ${finalMediaCount}`);
    console.log("========================================");
    console.log("");

  } catch (error) {
    console.error("");
    console.error("========================================");
    console.error("        DATABASE SEED FAILED");
    console.error("========================================");
    console.error(error);
    console.error("========================================");
    console.error("");

    process.exitCode = 1;
  } finally {
    await mongoose.connection.close();
    console.log("MongoDB connection closed.");
  }
};


// ============================================================================
// RUN
// ============================================================================

seedDatabase();