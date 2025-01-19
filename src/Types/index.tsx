export interface Game {
  id: number;
  name: string;
  released: string;
  background_image: string;
  rating: number;
  Platforms: platform[];
}

interface platform {
  id: number;
  slug: string;
  name: string;
}

export interface GameDetails {
  id: number;
  name: string;
  description: string;
  released: string;
  rating: number;
  background_image: string;
  playtime: number;
  players_count: number;
  website: string;
  genres: { name: string }[];
  platforms: { platform: { id: number; slug: string; name: string } }[]; // Updated
}

export interface Stats {
  appid: number;
  name: string;
  developer: string[];
  publisher: string[];
  score_rank: number;
  owners: Range;
  average_forever: number;
  average_2weeks: number;
  median_forever: number;
  median_2weeks: number;
  price: number;
  initialprice: number;
  discount: number;
}

interface Range {
  min: number;
  max: number;
}
