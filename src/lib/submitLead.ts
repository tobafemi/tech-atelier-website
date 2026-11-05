import { CONTACT_EMAIL } from '../constants';

export interface LeadPayload {
  source: 'contact' | 'quiz';
  name: string;
  email: string;
  business?: string;
  topic?: string;
  message?: string;
  /** Quiz answers and result, as label → value. */
  details?: Record<string, string>;
  /** Honeypot. Real visitors never see or fill this. */
  website?: string;
}

export type SubmitResult = 'sent' | 'mailto';

/**
 * Send the lead to /api/contact. If the endpoint is unavailable (local preview, outage),
 * fall back to opening the visitor's email app with everything filled in.
 */
export async function submitLead(payload: LeadPayload): Promise<SubmitResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (res.ok) return 'sent';
  } catch {
    // fall through to mailto
  } finally {
    clearTimeout(timer);
  }

  window.location.href = mailtoFor(payload);
  return 'mailto';
}

function mailtoFor(p: LeadPayload) {
  const subject = p.source === 'quiz' ? 'Free agent check results' : `Enquiry from ${p.business || p.name}`;
  const lines = [
    `Name: ${p.name}`,
    `Email: ${p.email}`,
    p.business ? `Business: ${p.business}` : '',
    p.topic ? `Interested in: ${p.topic}` : '',
    p.message ? `\n${p.message}` : '',
    ...Object.entries(p.details ?? {}).map(([k, v]) => `${k}: ${v}`),
  ].filter(Boolean);
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}
