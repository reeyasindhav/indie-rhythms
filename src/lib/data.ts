// Mock editorial data for PITCHFORK_ — Indian underground music discovery.
// Photography via Unsplash (open source / free-to-use license).

const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

export type Release = {
  slug: string;
  title: string;
  artist: string;
  artistSlug: string;
  genre: string;
  score: number;
  year: string;
  city: string;
  tag: string;
  cover: string;
  blurb: string;
  review: string[];
  tracks: { no: string; name: string; length: string }[];
  moods: string[];
};

export type Artist = {
  slug: string;
  name: string;
  city: string;
  genre: string;
  since: string;
  photo: string;
  hero: string;
  tagline: string;
  bio: string[];
  listeners: string;
  gear: string[];
  releases: string[];
};

export type Mood = {
  slug: string;
  name: string;
  no: string;
  bpm: string;
  color: "ink" | "acid" | "paper";
  line: string;
  image: string;
  genres: string[];
};

export const releases: Release[] = [
  {
    slug: "monsoon-motel",
    title: "Monsoon Motel",
    artist: "Kavya",
    artistSlug: "kavya",
    genre: "Alt Pop",
    score: 8.9,
    year: "2026",
    city: "Kochi",
    tag: "Album of the week",
    cover: u("1470225620780-dba8ba36b745"),
    blurb: "Nine songs recorded in a rented room above a hardware shop, humidity included.",
    review: [
      "Kavya writes like someone who has spent too long waiting out a downpour under a shop awning — patient, watchful, quietly furious. Monsoon Motel opens with a two-minute field recording of rain on a tin roof, and never entirely leaves that room.",
      "The production is deliberately unglamorous. Vocals sit slightly too loud, guitars fray at the edges, and a borrowed Casio carries the record's best hook. It works because nothing is hidden: you hear the chair creak, the breath before the line.",
      "By the closing track the humidity becomes the argument. This is an album about staying put while everything around you rusts, and about deciding that rusting together is a kind of intimacy.",
    ],
    tracks: [
      { no: "01", name: "Tin Roof Overture", length: "2:04" },
      { no: "02", name: "Room 9, No Fan", length: "3:41" },
      { no: "03", name: "Hardware Shop Blues", length: "4:12" },
      { no: "04", name: "Salt Water Static", length: "3:08" },
      { no: "05", name: "Kochi, 4AM", length: "5:22" },
      { no: "06", name: "Rusting Together", length: "4:47" },
    ],
    moods: ["night-drive", "soft-chaos"],
  },
  {
    slug: "ajnabi-frequencies",
    title: "Ajnabi Frequencies",
    artist: "Sitar Error",
    artistSlug: "sitar-error",
    genre: "Electronic",
    score: 8.4,
    year: "2026",
    city: "New Delhi",
    tag: "New",
    cover: u("1493225457124-a3eb161ffa5f"),
    blurb: "Broken raga loops fed through a dying laptop fan. Somehow danceable.",
    review: [
      "Sitar Error's second EP treats classical training as raw material rather than heritage. Phrases are sampled, stretched, and made to stutter until the ear stops looking for the resolution.",
      "The rhythm programming is the star: kicks land a hair late, hats scatter like loose change, and the low end has the woolly warmth of a cassette that has been played too often.",
      "It is a record about being a stranger in your own tradition, and finding that the strangeness is where the groove lives.",
    ],
    tracks: [
      { no: "01", name: "Ajnabi", length: "5:11" },
      { no: "02", name: "Fan Noise Raga", length: "6:02" },
      { no: "03", name: "Loop Rot", length: "4:38" },
      { no: "04", name: "Delhi Ring Road", length: "7:15" },
    ],
    moods: ["dissociate", "night-drive"],
  },
  {
    slug: "concrete-flowers",
    title: "Concrete Flowers",
    artist: "Dhanji Rivers",
    artistSlug: "dhanji-rivers",
    genre: "Hip-Hop",
    score: 9.1,
    year: "2026",
    city: "Ahmedabad",
    tag: "Featured",
    cover: u("1511671782779-c97d3d27a1d4"),
    blurb: "Dhanji Rivers turns a busted speaker into a protest sign.",
    review: [
      "Concrete Flowers is the rare protest record that never raises its voice past conversational. Dhanji Rivers raps in Gujarati and English about rent, ration lines, and the specific indignity of being told to be grateful.",
      "The beats are built from municipal sounds — drill bits, bus horns, a temple bell recorded from three streets away — and the mix leaves them loud enough to feel like weather.",
      "It is the year's most complete argument that the underground is not a genre but a vantage point.",
    ],
    tracks: [
      { no: "01", name: "Busted Speaker", length: "3:19" },
      { no: "02", name: "Ration Line", length: "2:58" },
      { no: "03", name: "Grateful", length: "4:04" },
      { no: "04", name: "Bell, Three Streets", length: "3:36" },
      { no: "05", name: "Concrete Flowers", length: "5:01" },
    ],
    moods: ["rage-room", "soft-chaos"],
  },
  {
    slug: "blue-hour-service",
    title: "Blue Hour Service",
    artist: "Maya Lune",
    artistSlug: "maya-lune",
    genre: "Indie Rock",
    score: 7.8,
    year: "2025",
    city: "Shillong",
    tag: "Listen now",
    cover: u("1518609878373-06d740f60d8b"),
    blurb: "Shillong guitar music that sounds like a chapel with the doors left open.",
    review: [
      "Maya Lune's band plays slowly on purpose. Chords are allowed to ring until they wobble, and the drums arrive like someone remembering there is a song happening.",
      "The record's centre is a seven-minute hymn that never resolves into catharsis, which is precisely the point.",
      "Not every experiment lands, but the patience is rewarded more often than not.",
    ],
    tracks: [
      { no: "01", name: "Doors Left Open", length: "4:22" },
      { no: "02", name: "Hill Station Hymn", length: "7:08" },
      { no: "03", name: "Wobble", length: "3:44" },
      { no: "04", name: "Service Ends", length: "5:30" },
    ],
    moods: ["dissociate", "night-drive"],
  },
  {
    slug: "tape-hiss-diaries",
    title: "Tape Hiss Diaries",
    artist: "Bombay Loomwork",
    artistSlug: "bombay-loomwork",
    genre: "Ambient",
    score: 8.1,
    year: "2026",
    city: "Mumbai",
    tag: "New",
    cover: u("1459749411175-04bf5292ceea"),
    blurb: "Four-track loops of loom machines, mixed at whisper volume.",
    review: [
      "Bombay Loomwork records inside working textile units and lets the machines set the tempo. The result is industrial ambient with a heartbeat.",
      "Nothing is quantised. The drift between loops becomes the melody.",
      "Best heard on a commute, loud enough to replace the city with a friendlier version of itself.",
    ],
    tracks: [
      { no: "01", name: "Shift One", length: "8:12" },
      { no: "02", name: "Thread Count", length: "6:40" },
      { no: "03", name: "Whisper Volume", length: "9:03" },
    ],
    moods: ["dissociate", "soft-chaos"],
  },
  {
    slug: "highway-44",
    title: "Highway 44",
    artist: "Zubeen Static",
    artistSlug: "zubeen-static",
    genre: "Post-Punk",
    score: 8.6,
    year: "2026",
    city: "Guwahati",
    tag: "Radar",
    cover: u("1516450360452-9312f5e86fc7"),
    blurb: "Bass-led post-punk written entirely on night buses.",
    review: [
      "Zubeen Static's debut moves at the speed of a bus that will not stop for you. The bass carries the melody; the guitar is mostly weather.",
      "Lyrics are clipped travel notes — toll gates, dhaba lights, a driver's cassette.",
      "It ends abruptly, mid-phrase, like arriving before you're ready.",
    ],
    tracks: [
      { no: "01", name: "Toll Gate", length: "3:02" },
      { no: "02", name: "Dhaba Lights", length: "2:47" },
      { no: "03", name: "Driver's Cassette", length: "4:19" },
      { no: "04", name: "Arrive Early", length: "1:58" },
    ],
    moods: ["rage-room", "night-drive"],
  },
];

export const artists: Artist[] = [
  {
    slug: "kavya",
    name: "Kavya",
    city: "Kochi",
    genre: "Alt Pop",
    since: "2021",
    photo: u("1499415479124-43c32433a620", 900),
    hero: u("1524650359799-842906ca1c06", 1600),
    tagline: "Writes songs the way other people keep diaries — badly, honestly, daily.",
    bio: [
      "Kavya started uploading demos from a rented room in Kochi in 2021, recording between shifts at a bookshop. She refused to re-record vocals, arguing that the first take was the only honest one.",
      "Five years and three EPs later the method hasn't changed. Monsoon Motel was tracked in eleven days during a genuine monsoon, with a fan switched off for silence and a towel taped over the window.",
      "She plays roughly six shows a year, all of them in rooms that hold fewer than two hundred people.",
    ],
    listeners: "41.2K",
    gear: ["Casio SK-1", "Yamaha FG-180", "Tascam 4-track", "One SM58, taped"],
    releases: ["monsoon-motel"],
  },
  {
    slug: "sitar-error",
    name: "Sitar Error",
    city: "New Delhi",
    genre: "Electronic",
    since: "2019",
    photo: u("1483412033650-1015ddeb83d1", 900),
    hero: u("1445985543470-41fba5c3144a", 1600),
    tagline: "Twelve years of classical training, deliberately misused.",
    bio: [
      "Trained in Hindustani classical from age seven, Sitar Error began breaking their own recordings in 2019 after a hard drive failure corrupted a year of practice tapes. The glitches sounded better than the takes.",
      "They now perform with a laptop whose fan is part of the signal chain, routed through a contact mic.",
      "Ajnabi Frequencies is their most structured work to date, which they describe as 'a mistake I made on purpose'.",
    ],
    listeners: "88.7K",
    gear: ["Corrupted drive archive", "Elektron Digitakt", "Contact mics", "Broken sitar"],
    releases: ["ajnabi-frequencies"],
  },
  {
    slug: "dhanji-rivers",
    name: "Dhanji Rivers",
    city: "Ahmedabad",
    genre: "Hip-Hop",
    since: "2017",
    photo: u("1514320291840-2e0a9bf2a9ae", 900),
    hero: u("1509824227185-9c5a01ceba0d", 1600),
    tagline: "Rents a room, records the street through the window, calls it a chorus.",
    bio: [
      "Dhanji Rivers has been releasing tapes since 2017, initially handing them out at bus stands in Ahmedabad. He still refuses to sign anything longer than a single release.",
      "Concrete Flowers was assembled over eighteen months from municipal field recordings and a blown-out PA speaker he bought for four hundred rupees.",
      "He writes in Gujarati first, then translates only the lines he thinks will lose nothing.",
    ],
    listeners: "126K",
    gear: ["Zoom H1n", "Blown 8-inch PA", "MPC One", "Notebook, no phone"],
    releases: ["concrete-flowers"],
  },
  {
    slug: "maya-lune",
    name: "Maya Lune",
    city: "Shillong",
    genre: "Indie Rock",
    since: "2020",
    photo: u("1471478331149-c72f17e33c73", 900),
    hero: u("1504704911898-68304a7d2807", 1600),
    tagline: "Plays slowly on purpose, in a town where the fog does the same.",
    bio: [
      "Maya Lune leads a four-piece that rehearses in a church hall in Shillong and records with the doors open, weather included.",
      "Blue Hour Service was tracked live over two weekends with no click track and one broken cymbal.",
      "The band's rule: if a song can be rushed, it isn't finished.",
    ],
    listeners: "33.9K",
    gear: ["Jazzmaster copy", "Spring reverb tank", "Church hall", "One broken cymbal"],
    releases: ["blue-hour-service"],
  },
  {
    slug: "bombay-loomwork",
    name: "Bombay Loomwork",
    city: "Mumbai",
    genre: "Ambient",
    since: "2022",
    photo: u("1487215078519-e21cc028cb29", 900),
    hero: u("1533174072545-7a4b6ad7a6c3", 1600),
    tagline: "An ambient project with a factory shift pattern.",
    bio: [
      "Bombay Loomwork is one person with a four-track and permission to record inside working textile units in Lower Parel.",
      "Every release is titled after a shift. Nothing is quantised; the machines keep time.",
      "Live sets are performed seated, at whisper volume, usually in warehouses.",
    ],
    listeners: "19.4K",
    gear: ["Tascam Portastudio", "Loom machines", "Two ribbon mics", "Cassette stock, expired"],
    releases: ["tape-hiss-diaries"],
  },
  {
    slug: "zubeen-static",
    name: "Zubeen Static",
    city: "Guwahati",
    genre: "Post-Punk",
    since: "2023",
    photo: u("1520523839897-bd0b52f945a0", 900),
    hero: u("1470225620780-dba8ba36b745", 1600),
    tagline: "Wrote an entire album on night buses between Guwahati and Shillong.",
    bio: [
      "Zubeen Static formed after its three members met on a delayed overnight bus. The band's first rehearsals happened in the bus depot canteen.",
      "Highway 44 was recorded in a single weekend, bass first, everything else negotiated afterwards.",
      "They end sets mid-song, on principle.",
    ],
    listeners: "52.1K",
    gear: ["Precision bass copy", "Boss DS-1", "Depot canteen", "Bus timetable"],
    releases: ["highway-44"],
  },
];

export const moods: Mood[] = [
  {
    slug: "night-drive",
    name: "Night Drive",
    no: "01",
    bpm: "92 – 108 BPM",
    color: "ink",
    line: "Ring roads, tinted windows, one cassette on repeat.",
    image: u("1519681393784-d120267933ba", 1200),
    genres: ["Alt Pop", "Electronic", "Post-Punk"],
  },
  {
    slug: "soft-chaos",
    name: "Soft Chaos",
    no: "02",
    bpm: "70 – 96 BPM",
    color: "acid",
    line: "Loud feelings at low volume. Distortion used gently.",
    image: u("1493225457124-a3eb161ffa5f", 1200),
    genres: ["Alt Pop", "Hip-Hop", "Ambient"],
  },
  {
    slug: "dissociate",
    name: "Dissociate",
    no: "03",
    bpm: "58 – 84 BPM",
    color: "paper",
    line: "For staring at a ceiling fan until it becomes a rhythm section.",
    image: u("1499415479124-43c32433a620", 1200),
    genres: ["Ambient", "Indie Rock", "Electronic"],
  },
  {
    slug: "rage-room",
    name: "Rage Room",
    no: "04",
    bpm: "128 – 168 BPM",
    color: "ink",
    line: "Rent is due, the bus is late, the bass is louder.",
    image: u("1511671782779-c97d3d27a1d4", 1200),
    genres: ["Hip-Hop", "Post-Punk"],
  },
  {
    slug: "kitchen-radio",
    name: "Kitchen Radio",
    no: "05",
    bpm: "88 – 112 BPM",
    color: "paper",
    line: "Songs that survive being played next to a pressure cooker.",
    image: u("1493225457124-a3eb161ffa5f", 1200),
    genres: ["Alt Pop", "Indie Rock"],
  },
  {
    slug: "monsoon-loop",
    name: "Monsoon Loop",
    no: "06",
    bpm: "60 – 90 BPM",
    color: "acid",
    line: "Four months of water, three chords, no hurry.",
    image: u("1516450360452-9312f5e86fc7", 1200),
    genres: ["Ambient", "Alt Pop"],
  },
];

export const genres = ["Alt Pop", "Electronic", "Hip-Hop", "Indie Rock", "Ambient", "Post-Punk"];

export const radar = [
  {
    day: "TODAY",
    date: "14 AUG",
    items: [
      { title: "Concrete Flowers", artist: "Dhanji Rivers", type: "LP", slug: "concrete-flowers" },
      {
        title: "Tape Hiss Diaries",
        artist: "Bombay Loomwork",
        type: "EP",
        slug: "tape-hiss-diaries",
      },
    ],
  },
  {
    day: "YESTERDAY",
    date: "13 AUG",
    items: [
      {
        title: "Ajnabi Frequencies",
        artist: "Sitar Error",
        type: "EP",
        slug: "ajnabi-frequencies",
      },
      { title: "Highway 44", artist: "Zubeen Static", type: "LP", slug: "highway-44" },
    ],
  },
  {
    day: "THIS WEEK",
    date: "08 — 12 AUG",
    items: [
      { title: "Monsoon Motel", artist: "Kavya", type: "LP", slug: "monsoon-motel" },
      { title: "Blue Hour Service", artist: "Maya Lune", type: "LP", slug: "blue-hour-service" },
    ],
  },
];

export const getRelease = (slug: string) => releases.find((r) => r.slug === slug);
export const getArtist = (slug: string) => artists.find((a) => a.slug === slug);
export const getMood = (slug: string) => moods.find((m) => m.slug === slug);
export const releasesByMood = (slug: string) => releases.filter((r) => r.moods.includes(slug));
