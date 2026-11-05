export interface Step {
  id: string;
  number: string;
  title: string;
  price: string;
  summary: string;
  includes: string[];
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  goodFor: string;
  measuredBy: string;
}

export interface StandardPoint {
  title: string;
  text: string;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  /** Optional demo video. When set, the card plays it instead of showing the icon tile. */
  videoUrl?: string;
  /** Still image shown before the video plays. */
  posterUrl?: string;
}
