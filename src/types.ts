import type { ReactNode } from 'react';

export interface Service {
  id: string;
  title: string;
  description: string;
  /** e.g. "from £399" — shown under the title when set */
  price?: string;
  /** Optional line below description (e.g. guarantee), styled in emerald in the services grid */
  guarantee?: string;
  icon: ReactNode;
}

export interface Project {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  description: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  content: string;
  company: string;
}

export interface Agent {
  id: string;
  name: string;
  category: string;
  description: string;
  points: string[];
  goodFor: string;
  video: string;
  poster: string;
}
