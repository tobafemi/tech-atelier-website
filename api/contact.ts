import type { IncomingMessage, ServerResponse } from 'node:http';
import nodemailer from 'nodemailer';

/**
 * Vercel serverless function: receives contact-form and free-check leads and emails them
 * to the Tech Atelier inbox through Namecheap Private Email.
 *
 * Environment variables (set in Vercel → Project → Settings → Environment Variables):
 *   SMTP_USER  mailbox that sends the notification, e.g. hello@tech-atelier.co.uk
 *   SMTP_PASS  that mailbox's password
 *   LEAD_TO    where leads go (optional, defaults to SMTP_USER)
 *   SMTP_HOST  optional, defaults to mail.privateemail.com
 *   SMTP_PORT  optional, defaults to 465
 */

type Req = IncomingMessage & { body?: unknown; method?: string };
type Res = ServerResponse & { status: (code: number) => Res; json: (body: unknown) => void };

const MAX = { name: 120, email: 200, business: 160, topic: 80, message: 3000, detail: 200 };

const clean = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);

export default async function handler(req: Req, res: Res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  const body = (typeof req.body === 'string' ? safeParse(req.body) : req.body) as Record<string, unknown> | null;
  if (!body) return res.status(400).json({ ok: false });

  // Bots fill the hidden field. Pretend it worked and send nothing.
  if (clean(body.website, 200)) return res.status(200).json({ ok: true });

  const source = body.source === 'quiz' ? 'quiz' : 'contact';
  const name = clean(body.name, MAX.name);
  const email = clean(body.email, MAX.email);
  const business = clean(body.business, MAX.business);
  const topic = clean(body.topic, MAX.topic);
  const message = clean(body.message, MAX.message);
  const details: [string, string][] =
    body.details && typeof body.details === 'object'
      ? Object.entries(body.details as Record<string, unknown>)
          .slice(0, 12)
          .map(([k, v]) => [clean(k, 60), clean(v, MAX.detail)] as [string, string])
          .filter(([k, v]) => k && v)
      : [];

  if (!name || !isEmail(email)) return res.status(400).json({ ok: false });

  const { SMTP_USER, SMTP_PASS } = process.env;
  if (!SMTP_USER || !SMTP_PASS) {
    console.error('contact: SMTP_USER / SMTP_PASS not set');
    return res.status(500).json({ ok: false });
  }

  const rows: [string, string][] = [
    ['Name', name],
    ['Email', email],
    ['Business', business],
    ['Interested in', topic],
    ['Message', message],
    ...details,
  ].filter(([, v]) => v) as [string, string][];

  const subject =
    source === 'quiz' ? `Free check lead: ${business || name}` : `Website enquiry: ${business || name}`;
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n');
  const html = `<table cellpadding="6" style="font-family:sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="color:#64748b;vertical-align:top;white-space:nowrap">${escapeHtml(k)}</td><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
    )
    .join('')}</table>`;

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'mail.privateemail.com',
      port: Number(process.env.SMTP_PORT || 465),
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transporter.sendMail({
      from: `"Tech Atelier website" <${SMTP_USER}>`,
      to: process.env.LEAD_TO || SMTP_USER,
      replyTo: `"${name.replace(/"/g, '')}" <${email}>`,
      subject,
      text,
      html,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('contact: send failed', err);
    return res.status(502).json({ ok: false });
  }
}

function safeParse(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
