export type SectorId = 'care' | 'staffing' | 'professional' | 'trades' | 'property' | 'other';
export type SizeId = 'micro' | 'small' | 'medium' | 'large';
export type DrainId = 'enquiries' | 'compliance' | 'invoices' | 'scheduling' | 'inbox' | 'reporting';
export type HoursId = 'under5' | '5to15' | '15to40' | 'over40';

export interface Option<T extends string> {
  id: T;
  label: string;
}

export const SECTORS: Option<SectorId>[] = [
  { id: 'care', label: 'Care or healthcare' },
  { id: 'staffing', label: 'Staffing or recruitment' },
  { id: 'professional', label: 'Law, accountancy or professional services' },
  { id: 'trades', label: 'Trades or field services' },
  { id: 'property', label: 'Property or estate agency' },
  { id: 'other', label: 'Something else' },
];

export const SIZES: Option<SizeId>[] = [
  { id: 'micro', label: '1–10 people' },
  { id: 'small', label: '11–50 people' },
  { id: 'medium', label: '51–250 people' },
  { id: 'large', label: 'More than 250' },
];

export const DRAINS: Option<DrainId>[] = [
  { id: 'enquiries', label: 'Answering enquiries and booking appointments' },
  { id: 'compliance', label: 'Chasing and checking documents' },
  { id: 'invoices', label: 'Invoices, timesheets and payments' },
  { id: 'scheduling', label: 'Rotas and scheduling' },
  { id: 'inbox', label: 'Keeping on top of the shared inbox' },
  { id: 'reporting', label: 'Pulling together reports and figures' },
];

export const HOURS: (Option<HoursId> & { hours: number })[] = [
  { id: 'under5', label: 'Under 5 hours', hours: 3 },
  { id: '5to15', label: '5 to 15 hours', hours: 10 },
  { id: '15to40', label: '15 to 40 hours', hours: 25 },
  { id: 'over40', label: 'More than 40 hours', hours: 50 },
];

export interface AgentIdea {
  name: string;
  what: string;
  /** Sector-specific example of the agent at work. Falls back to `example`. */
  examples?: Partial<Record<SectorId, string>>;
  example: string;
}

export const IDEAS: Record<DrainId, AgentIdea> = {
  enquiries: {
    name: 'Enquiry & Intake Agent',
    what: 'Answers enquiries from your website, email and WhatsApp at any hour, asks the questions your team would ask, and books the call.',
    example:
      'A customer gets in touch at 9pm. The agent replies within a minute, finds out what they need and puts a call in your diary for the morning.',
    examples: {
      care: 'A family asks about home care at 9pm. The agent replies, checks you cover their area and books an assessment call for the morning.',
      professional:
        'Someone asks about a will or a tax return out of hours. The agent takes the key details, checks it is work you take on and books a first call.',
      trades:
        'A homeowner sends photos of a leak on Sunday. The agent asks the right questions, sorts urgent from routine and books a visit.',
      property:
        'A buyer asks about a listing late at night. The agent answers from the listing details and books a viewing.',
    },
  },
  compliance: {
    name: 'Compliance Document Agent',
    what: 'Chases people for the documents you need, reads what comes back, and flags anything missing or about to expire.',
    example:
      'Three certificates expire next month. The agent has already asked for the new ones, checked those that arrived and listed the rest for your team.',
    examples: {
      care: 'Two carers have training certificates expiring next month. The agent has asked for the renewals and updated your training matrix with what came back.',
      staffing:
        'A new candidate is ready to place. The agent has collected their DBS, right-to-work and references, and flags the one reference still outstanding.',
      professional:
        'A new client needs onboarding. The agent requests ID and proof of address, checks they are readable and in date, and files them.',
    },
  },
  invoices: {
    name: 'Back-Office Agent',
    what: 'Works through invoices, timesheets and payment chasers, matches them against your records and passes exceptions to a person.',
    example:
      'Forty supplier invoices arrive in a week. The agent matches them to orders, queues them for approval and flags the two that do not add up.',
    examples: {
      staffing:
        'Timesheets come in from every placement on Monday. The agent checks hours against bookings, raises the invoices and flags the mismatches.',
      care: 'Visit logs come in daily. The agent checks them against the care plan and prepares invoices for the local authority and private clients.',
    },
  },
  scheduling: {
    name: 'Scheduling Agent',
    what: 'Collects availability and requests, proposes rotas or appointment slots, handles swaps and tells people what has changed.',
    example:
      'Someone calls in sick at 7am. The agent finds who is free and qualified, offers them the shift and updates the rota once they accept.',
  },
  inbox: {
    name: 'Inbox Triage Agent',
    what: 'Reads the shared inbox, drafts replies to routine messages and sends everything else to the right person with a short summary.',
    example:
      'Overnight the inbox fills up. By 8am the routine replies are drafted for approval and the rest are sorted by who needs to deal with them.',
  },
  reporting: {
    name: 'Reporting Agent',
    what: 'Pulls figures from your systems each week and sends a plain-English summary, with anything unusual highlighted.',
    example:
      'Every Monday you get one page on last week: sales, jobs completed, money owed, and the two numbers that moved more than usual.',
  },
};

/** A second idea worth mentioning, by sector. */
export const SECOND_IDEA: Record<SectorId, DrainId> = {
  care: 'compliance',
  staffing: 'compliance',
  professional: 'enquiries',
  trades: 'enquiries',
  property: 'enquiries',
  other: 'inbox',
};

export const SECOND_FALLBACK: DrainId = 'inbox';

/** Assumptions behind the indicative figure. Shown to the visitor alongside the result. */
export const HOURLY_COST = 18;
export const SHARE_AN_AGENT_TAKES = 0.5;

export function estimate(hoursPerWeek: number) {
  const hoursSaved = hoursPerWeek * SHARE_AN_AGENT_TAKES;
  const yearly = Math.round((hoursSaved * 52 * HOURLY_COST) / 100) * 100;
  return { hoursSaved, yearly };
}

export function auditPrice(size: SizeId) {
  return size === 'micro' || size === 'small' ? '£250–£500' : 'from £1,000';
}
