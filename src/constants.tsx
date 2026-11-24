import { Globe, Sparkles, ClipboardList } from 'lucide-react';
import type { Service, Project, Testimonial, Agent } from './types';

export const SERVICES: Service[] = [
  {
    id: 'website-build',
    title: 'Website Build & Refresh',
    price: 'from £399',
    description: 'Your digital front door, built in 5 days.',
    icon: <Globe className="w-6 h-6" />,
  },
  {
    id: 'growth-marketing',
    title: 'Growth Marketing',
    price: 'Personalised growth plans - £250',
    description:
      'We grow your visibility online and turn it into real enquiries — through SEO, social content and targeted campaigns built around your business goals.',
    icon: <Sparkles className="w-6 h-6" />,
  },
  {
    id: 'tech-audit',
    title: 'Business Technology Audit',
    price: 'Audit and consultation fee - £250',
    description:
      'We assess your processes, identify opportunities and build tools, automations and AI agents to drive productivity, reduce costs and grow revenue.',
    guarantee:
      'If our audit fails to find at least £500 in annual savings, we refund your consultation fee.',
    icon: <ClipboardList className="w-6 h-6" />,
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'chopam-foods',
    title: 'Chopam Foods',
    category: 'Brand & Web',
    imageUrl: 'https://picsum.photos/seed/food/1200/800',
    description:
      'Nigerian food box delivery service — full brand identity and digital presence.',
  },
  {
    id: 'copysnap',
    title: 'CopySnap',
    category: 'Product Build',
    imageUrl: 'https://picsum.photos/seed/property/1200/800',
    description: 'AI-powered property description generator for estate agents.',
  },
  {
    id: 'cft-churches',
    title: 'CFT Churches',
    category: 'Product Build',
    imageUrl: 'https://picsum.photos/seed/church/1200/800',
    description: 'Digital tools and workflows for church communities and outreach.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    author: 'Sarah Jenkins',
    role: 'CTO',
    company: 'Velocity Global',
    content: "Tech Atelier didn't just write code; they understood our business model and built a system that actually solved our bottleneck. A true partner.",
  },
  {
    id: '2',
    author: 'Marcus Thorne',
    role: 'Founder',
    company: 'NextGen AI',
    content: "Building an MVP is usually stressful, but the Atelier team made it feel like a craft. Every detail was intentional and polished.",
  },
];

export const AGENTS: Agent[] = [
  {
    id: 'referral-outreach',
    name: 'Referral Outreach Agent',
    category: 'Lead generation',
    description:
      'Finds the businesses most likely to send you clients, writes to each one personally, and turns their replies into warm leads. Shown here working for a private client law firm.',
    points: [
      'Finds new referral partners every week and scores each one for fit',
      'Writes a personal email to each, checked against UK email law first',
      'You approve every email before anything is sent',
      'Reads replies, flags warm leads straight away and handles opt-outs',
      'Sends one polite follow-up, then a summary every Monday',
    ],
    goodFor: 'solicitors, care providers, mortgage brokers, clinics, accountants and recruiters.',
    video: '/videos/referral-outreach-agent.mp4',
    poster: '/videos/referral-outreach-agent-poster.jpg',
  },
];
