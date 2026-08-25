// Supabase Edge Function: notify-lead
// Client-callable endpoint. The marketing site POSTs form data as JSON;
// this function validates, formats, and sends an email via Resend.
// No database, no persistent record — successful send = lead delivered.
//
// Deploy: supabase functions deploy notify-lead --no-verify-jwt
//
// Required secrets:
//   RESEND_API_KEY  — Resend API key (same one used by the app)
// Optional secrets:
//   LEAD_NOTIFICATION_EMAIL  — recipient (default: cameron@merchandmove.co.za)
//   LEAD_NOTIFICATION_FROM   — sender (default: Merch & Move Leads <leads@updates.merchandmove.co.za>)
//                              The from address MUST use a Resend-verified domain;
//                              updates.merchandmove.co.za is verified, the root domain is not.

import { Resend } from 'npm:resend@4.0.0'

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const NOTIFY_TO = Deno.env.get('LEAD_NOTIFICATION_EMAIL') ?? 'cameron@merchandmove.co.za'
const NOTIFY_FROM = Deno.env.get('LEAD_NOTIFICATION_FROM') ?? 'Merch & Move Leads <leads@updates.merchandmove.co.za>'

const ALLOWED_ORIGINS = new Set([
  'http://localhost:4321',
  'http://localhost:3000',
  'https://merchandmove.co.za',
  'https://www.merchandmove.co.za',
])

const CATEGORY_LABELS: Record<string, string> = {
  food_and_beverage: 'Food & Beverage',
  alcoholic_beverage: 'Alcoholic Beverage',
  beauty_and_personal_care: 'Beauty & Personal Care',
  health_wellness_supplements: 'Health, Wellness & Supplements',
  other: 'Other',
}

const FOOTPRINT_LABELS: Record<string, string> = {
  not_in_stores_yet: 'Not in stores yet',
  independent_stores: 'Independent stores only',
  regional_chains: 'Some regional chains',
  national_chains: 'National chains',
  dtc_only: 'DTC / online only',
}

const TIMELINE_LABELS: Record<string, string> = {
  asap: 'ASAP (< 1 month)',
  one_to_three_months: '1 - 3 months',
  three_to_six_months: '3 - 6 months',
  exploring: 'Just exploring',
}

const REGION_LABELS: Record<string, string> = {
  national: 'National',
  gauteng: 'Gauteng',
  western_cape: 'Western Cape',
  kwazulu_natal: 'KwaZulu-Natal',
  eastern_cape: 'Eastern Cape',
  free_state: 'Free State',
  mpumalanga: 'Mpumalanga',
  limpopo: 'Limpopo',
  north_west: 'North West',
  northern_cape: 'Northern Cape',
}

type LeadForm = {
  full_name?: string
  work_email?: string
  company?: string
  phone?: string | null
  website?: string | null
  product_category?: string
  retail_footprint?: string
  target_regions?: string[]
  timeline?: string
  notes?: string | null
  hp_website_url?: string | null
  user_agent?: string | null
  referrer?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
}

function label(map: Record<string, string>, key: string | undefined): string {
  return (key && map[key]) || key || '—'
}

function escape(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 16px 8px 0;color:#9ca3af;width:140px;vertical-align:top;">${escape(label)}</td>
    <td style="padding:8px 0;color:#ffffff;">${escape(value)}</td>
  </tr>`
}

function renderEmail(lead: LeadForm): { subject: string; html: string; text: string } {
  const category = label(CATEGORY_LABELS, lead.product_category)
  const footprint = label(FOOTPRINT_LABELS, lead.retail_footprint)
  const timeline = label(TIMELINE_LABELS, lead.timeline)
  const regions = (lead.target_regions ?? []).map(r => label(REGION_LABELS, r)).join(', ') || '—'

  const subject = `New lead — ${lead.company} (${category})`

  const utmLine = [
    lead.utm_source && `source=${lead.utm_source}`,
    lead.utm_medium && `medium=${lead.utm_medium}`,
    lead.utm_campaign && `campaign=${lead.utm_campaign}`,
  ].filter(Boolean).join(' · ')

  const text = [
    `NEW LEAD — ${lead.company}`,
    ``,
    `${lead.full_name} <${lead.work_email}>`,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.website ? `Website: ${lead.website}` : null,
    ``,
    `FIT`,
    `  Category:         ${category}`,
    `  Retail footprint: ${footprint}`,
    `  Target regions:   ${regions}`,
    `  Timeline:         ${timeline}`,
    ``,
    lead.notes ? `NOTES\n  ${lead.notes.replace(/\n/g, '\n  ')}\n` : null,
    utmLine ? `ATTRIBUTION\n  ${utmLine}` : null,
    lead.referrer ? `  Referrer: ${lead.referrer}` : null,
    ``,
    `Reply to this email to respond directly to ${lead.full_name}.`,
  ].filter(Boolean).join('\n')

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#0a0f1e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#e5e7eb;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
    <div style="border-left:3px solid #F9D702;padding-left:16px;margin-bottom:24px;">
      <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#F9D702;font-weight:700;">New Lead</div>
      <h1 style="margin:8px 0 4px;font-size:22px;line-height:1.2;color:#ffffff;font-weight:600;">${escape(lead.company ?? '')}</h1>
      <div style="color:#9ca3af;font-size:14px;">${escape(lead.full_name ?? '')} · <a href="mailto:${escape(lead.work_email ?? '')}" style="color:#9ca3af;">${escape(lead.work_email ?? '')}</a></div>
      ${lead.phone ? `<div style="color:#9ca3af;font-size:14px;margin-top:4px;"><a href="tel:${escape(lead.phone)}" style="color:#9ca3af;">${escape(lead.phone)}</a></div>` : ''}
      ${lead.website ? `<div style="color:#9ca3af;font-size:14px;margin-top:4px;"><a href="${escape(lead.website)}" style="color:#3EB5E1;">${escape(lead.website)}</a></div>` : ''}
    </div>
    <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6;">
      ${row('Category', category)}
      ${row('Retail footprint', footprint)}
      ${row('Target regions', regions)}
      ${row('Timeline', timeline)}
    </table>
    ${lead.notes ? `<div style="margin-top:24px;padding:16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:8px;"><div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#9ca3af;margin-bottom:8px;">Notes</div><div style="color:#e5e7eb;white-space:pre-wrap;">${escape(lead.notes)}</div></div>` : ''}
    ${utmLine || lead.referrer ? `<div style="margin-top:24px;font-size:12px;color:#6b7280;">${utmLine ? `<div>Attribution: ${escape(utmLine)}</div>` : ''}${lead.referrer ? `<div>Referrer: ${escape(lead.referrer)}</div>` : ''}</div>` : ''}
    <div style="margin-top:32px;padding-top:16px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;color:#6b7280;">Reply to this email to respond directly to ${escape(lead.full_name ?? '')}.</div>
  </div>
</body></html>`

  return { subject, html, text }
}

function corsHeaders(origin: string | null): Record<string, string> {
  const allow = origin && ALLOWED_ORIGINS.has(origin) ? origin : ''
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Vary': 'Origin',
  }
}

function json(status: number, body: unknown, cors: Record<string, string>): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...cors, 'Content-Type': 'application/json' },
  })
}

Deno.serve(async (req: Request) => {
  const origin = req.headers.get('Origin')
  const cors = corsHeaders(origin)

  if (req.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors })
  if (req.method !== 'POST') return new Response('Method not allowed', { status: 405, headers: cors })

  if (origin && !ALLOWED_ORIGINS.has(origin)) {
    return json(403, { ok: false, error: 'Origin not allowed' }, cors)
  }

  if (!RESEND_API_KEY) {
    console.error('notify-lead: RESEND_API_KEY is not set')
    return json(500, { ok: false, error: 'Server not configured' }, cors)
  }

  let data: LeadForm = {}
  try {
    data = await req.json()
  } catch {
    return json(400, { ok: false, error: 'Invalid JSON' }, cors)
  }

  // Honeypot: real users can't see or fill this field. Silent success prevents
  // the bot from learning it was caught and retrying with a variation.
  if (data.hp_website_url && data.hp_website_url.length > 0) {
    console.warn('notify-lead: honeypot triggered', { origin, ua: data.user_agent })
    return json(200, { ok: true }, cors)
  }

  if (!data.full_name || !data.work_email || !data.company) {
    return json(400, { ok: false, error: 'Missing required fields' }, cors)
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.work_email)) {
    return json(400, { ok: false, error: 'Invalid email address' }, cors)
  }
  // Format-check phone when present, but don't require it: leads posted by the
  // previously deployed site have no phone field, and must not start failing.
  if (data.phone && !/^\+?\d{9,15}$/.test(data.phone.replace(/[\s().\-]/g, ''))) {
    return json(400, { ok: false, error: 'Invalid phone number' }, cors)
  }
  if (!data.product_category || !CATEGORY_LABELS[data.product_category]) {
    return json(400, { ok: false, error: 'Invalid product_category' }, cors)
  }
  if (!data.retail_footprint || !FOOTPRINT_LABELS[data.retail_footprint]) {
    return json(400, { ok: false, error: 'Invalid retail_footprint' }, cors)
  }
  if (!data.timeline || !TIMELINE_LABELS[data.timeline]) {
    return json(400, { ok: false, error: 'Invalid timeline' }, cors)
  }
  if (!Array.isArray(data.target_regions) || data.target_regions.length === 0) {
    return json(400, { ok: false, error: 'Select at least one target region' }, cors)
  }
  if (data.notes && data.notes.length > 2000) {
    return json(400, { ok: false, error: 'Notes too long' }, cors)
  }

  const { subject, html, text } = renderEmail(data)

  const resend = new Resend(RESEND_API_KEY)
  const { data: sendData, error } = await resend.emails.send({
    from: NOTIFY_FROM,
    to: [NOTIFY_TO],
    replyTo: data.work_email,
    subject,
    html,
    text,
  })

  if (error) {
    console.error('notify-lead: Resend error', error)
    return json(502, { ok: false, error: 'Failed to send email' }, cors)
  }

  console.log('notify-lead: sent', { resendId: sendData?.id, company: data.company })
  return json(200, { ok: true, id: sendData?.id }, cors)
})
