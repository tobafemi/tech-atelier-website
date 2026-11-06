import type { Agent, Project, StandardPoint, Step } from './types';

export const CONTACT_EMAIL = 'hello@tech-atelier.co.uk';
export const WHATSAPP_URL = 'https://wa.me/447481802985';

export const STEPS: Step[] = [
  {
    id: 'audit',
    number: '01',
    title: 'AI audit',
    price: '£250–£500 for small teams · from £1,000 for larger businesses',
    summary:
      "We look at how your business runs day to day and find the work an agent could take on. You get the options ranked by what they'd save, a check that your systems and data can support them, and a fixed quote for the one worth doing first.",
    includes: [
      'Agent opportunities ranked by value to you',
      'A feasibility check on your systems and data',
      'Quick wins you can act on straight away',
      'The fee comes off your build if you go ahead',
    ],
  },
  {
    id: 'build',
    number: '02',
    title: 'Agent build',
    price: 'Fixed price, quoted after your audit',
    summary:
      'Scoping and quoting the build costs nothing extra. Work starts with a short discovery phase, so if your data or systems throw up a problem, you can stop there having paid only for that stage.',
    includes: [
      'One agent live on your real work',
      'Tested against your past cases before launch',
      'Human sign-off on anything that matters',
      'Staff training and a full handover',
    ],
  },
  {
    id: 'care',
    number: '03',
    title: 'Care and support',
    price: 'Monthly, from £500',
    summary:
      "An agent needs looking after like any other system. We host and monitor yours, fix problems, keep the models up to date and send you a monthly report on what it's done and saved.",
    includes: [
      'Monitoring and alerts',
      'Fixes and model updates',
      'A monthly performance report',
      'Small improvements as you go',
    ],
  },
];

export const AGENTS: Agent[] = [
  {
    id: 'enquiry',
    name: 'Enquiry & Intake Agent',
    description:
      'Answers website, email and WhatsApp enquiries at any hour, asks the right qualifying questions, books calls and logs every lead in your CRM.',
    goodFor: 'Care providers, clinics, trades, law firms',
    measuredBy: 'Response time, enquiries converted, admin hours saved',
  },
  {
    id: 'compliance',
    name: 'Compliance Document Agent',
    description:
      'Chases staff for DBS checks, right-to-work documents and training certificates, reads what comes back, and flags gaps and expiry dates before they turn into a problem.',
    goodFor: 'Staffing agencies, home care and care homes',
    measuredBy: 'Compliance hours, missed expiries, audit readiness',
  },
  {
    id: 'back-office',
    name: 'Back-Office Agent',
    description:
      'Works through invoices, timesheets, rota changes and the routine inbox, and passes anything unusual to the right person.',
    goodFor: 'Any business with a small admin team',
    measuredBy: 'Hours saved, error rate, days to invoice',
  },
];

export const STANDARD: StandardPoint[] = [
  {
    title: 'One defined job',
    text: 'Each agent handles a named workflow, with clear limits on what it must never do.',
  },
  {
    title: 'Tested before launch',
    text: 'We score it against real past cases from your business, and rerun those tests after every change.',
  },
  {
    title: 'People sign off what matters',
    text: 'Anything that pays money, contacts a customer or changes a record can wait for approval.',
  },
  {
    title: 'Guardrails',
    text: "Checks on what goes in and what comes out, tight permissions, and a hand-off to a person when it isn't sure.",
  },
  {
    title: 'A full audit trail',
    text: 'Every run is logged: what came in, what the agent did and who approved it.',
  },
  {
    title: 'Monitored',
    text: 'We track volume, success rate and cost per run, and get an alert when something drifts.',
  },
  {
    title: 'Data protection by design',
    text: 'Built to GDPR and your local data laws, with data kept to a minimum and a signed data processing agreement.',
  },
  {
    title: 'Predictable running costs',
    text: "A cost ceiling per run and the right model for each task, so the bill doesn't surprise you.",
  },
  {
    title: 'Handed over properly',
    text: 'A runbook, staff training and a named owner on your side.',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'food-brand',
    title: 'Brand and website for a food delivery business',
    category: 'Brand & web',
  },
  {
    id: 'listing-tool',
    title: 'AI tool that writes property listings for estate agents',
    category: 'Product build',
  },
  {
    id: 'church-tools',
    title: 'Digital tools for a network of churches',
    category: 'Product build',
  },
];

export const SECTORS_TICKER = [
  'CARE PROVIDERS',
  'STAFFING AGENCIES',
  'CLINICS',
  'LAW FIRMS',
  'ACCOUNTANTS',
  'TRADES',
  'ESTATE AGENTS',
  'PROPERTY MANAGEMENT',
];
