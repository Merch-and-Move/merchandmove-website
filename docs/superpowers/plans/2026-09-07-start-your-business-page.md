# Start Your Business Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a hidden, single-scroll marketing page at `/start-your-business` that recruits independent sellers and captures their interest by email.

**Architecture:** One new Astro page composed of seven React section components under `src/components/business/`, reusing the existing layout, nav, footer and global styles. The interest form posts to the existing `notify-lead` Supabase Edge Function, which gains a `lead_type` branch; seller validation and email rendering live in a new pure module `seller.ts` so they can be unit-tested with `deno test`.

**Tech Stack:** Astro 6, React 19, Tailwind 4, framer-motion, Supabase Edge Functions (Deno 2), Resend.

**Spec:** `docs/superpowers/specs/2026-09-07-start-your-business-page-design.md`

## Global Constraints

- URL is exactly `/start-your-business`. File is `src/pages/start-your-business.astro`.
- The page is never linked from the homepage, nav, mobile menu or footer.
- The page's `<head>` must contain `<meta name="robots" content="noindex">`; the homepage's must not.
- Every piece of copy that depends on the undecided earning model is wrapped in square brackets and begins with `[EARNING MODEL`.
- Only server-side change is inside `supabase/functions/notify-lead/`. Nothing else in the shared Supabase project is touched.
- Leads with no `lead_type`, or `lead_type: "business"`, must behave exactly as today.
- Copy voice: direct, confident, short lines. Match the homepage.
- No new npm dependencies.

## Verification tools available

- `npm run build` produces static HTML in `dist/`. Site-side checks grep `dist/start-your-business/index.html` and `dist/index.html`.
- `deno test` runs in `supabase/functions/notify-lead/` (Deno 2.7 is installed at `/opt/homebrew/bin/deno`).
- There is no JS unit test runner for the site. React components are verified by build output and by loading the page in the dev server.
- Dev server: `npm run dev` on `http://localhost:4321`.

## File structure

| File | Responsibility |
|---|---|
| `src/layouts/Layout.astro` | Modify: add optional `noindex` prop |
| `src/components/Nav.astro` | Modify: absolute anchor hrefs, `ctaHref` prop |
| `src/components/MobileMenu.tsx` | Modify: absolute anchor hrefs, `ctaHref` prop |
| `src/components/business/BusinessHero.tsx` | Hero with headline and CTA to `#register` |
| `src/components/business/BusinessBenefits.tsx` | Six benefit cards |
| `src/components/business/BusinessSteps.tsx` | Four numbered steps |
| `src/components/business/BusinessQualities.tsx` | Four "what it takes" cards |
| `src/components/business/BusinessWhyUs.tsx` | Credibility block |
| `src/components/business/BusinessFAQ.tsx` | Accordion FAQ and income disclaimer |
| `src/components/business/BusinessInterestForm.tsx` | Interest form posting `lead_type: "seller"` |
| `src/pages/start-your-business.astro` | Composes the sections |
| `supabase/functions/notify-lead/seller.ts` | Pure: `validateSellerLead`, `renderSellerEmail` |
| `supabase/functions/notify-lead/seller_test.ts` | Deno tests for `seller.ts` |
| `supabase/functions/notify-lead/index.ts` | Modify: branch on `lead_type` |

---

### Task 1: Layout `noindex` prop

**Files:**
- Modify: `src/layouts/Layout.astro:1-12` (props block) and `:19-22` (head metas)

**Interfaces:**
- Produces: `Layout` accepts `noindex?: boolean`. When true, head contains `<meta name="robots" content="noindex">`.

- [ ] **Step 1: Write a failing build check**

Create `scripts/check-noindex.sh` (a tiny build assertion, kept in the repo so later tasks can re-run it):

```bash
#!/usr/bin/env bash
# Asserts the homepage is indexable. Extended in Task 8 to assert the new page is not.
set -euo pipefail
if grep -q 'name="robots" content="noindex"' dist/index.html; then
  echo "FAIL: homepage carries noindex"; exit 1
fi
echo "OK: homepage has no noindex"
```

Run:
```bash
chmod +x scripts/check-noindex.sh && npm run build && ./scripts/check-noindex.sh
```
Expected: `OK: homepage has no noindex` (this half passes already; it guards against regressions in the next step).

- [ ] **Step 2: Add the prop to Layout**

In `src/layouts/Layout.astro`, change the props block to:

```astro
---
import '../styles/global.css'

interface Props {
  title?: string
  description?: string
  noindex?: boolean
}

const {
  title = 'Merch & Move — Sales That Move',
  description = 'Your All-In-One Partner for Merchandising, Active Selling, and Live Software Tracking. We don\'t just fill shelves — we move product.',
  noindex = false,
} = Astro.props
---
```

Directly after the `<meta name="theme-color" ...>` line, add:

```astro
    {noindex && <meta name="robots" content="noindex" />}
```

- [ ] **Step 3: Verify the homepage is unchanged**

Run:
```bash
npm run build && ./scripts/check-noindex.sh
```
Expected: `OK: homepage has no noindex`

- [ ] **Step 4: Commit**

```bash
git add src/layouts/Layout.astro scripts/check-noindex.sh
git commit -m "Add optional noindex prop to Layout"
```

---

### Task 2: Nav and mobile menu work from any page

**Files:**
- Modify: `src/components/Nav.astro:1-30`
- Modify: `src/components/MobileMenu.tsx:1-10` and `:363-418`

**Interfaces:**
- Produces: `<Nav ctaHref="#register" />` and `<MobileMenu client:load ctaHref="#register" />`. Both default `ctaHref` to `#contact`. Section links are `/#how-it-works`, `/#active-selling`, `/#platform`, `/#pricing`.

- [ ] **Step 1: Write the failing build check**

Append to `scripts/check-noindex.sh` (rename is not needed; it is the build assertion script):

```bash
# Nav anchors must be absolute so they resolve from any page.
for a in how-it-works active-selling platform pricing; do
  if ! grep -q "href=\"/#$a\"" dist/index.html; then
    echo "FAIL: nav link /#$a missing from homepage"; exit 1
  fi
done
echo "OK: nav anchors are absolute"
```

Run:
```bash
npm run build && ./scripts/check-noindex.sh
```
Expected: `FAIL: nav link /#how-it-works missing from homepage`

- [ ] **Step 2: Update Nav.astro**

Replace the whole frontmatter and the markup above `<script>` with:

```astro
---
import MobileMenu from './MobileMenu.tsx'

interface Props {
  ctaHref?: string
}

const { ctaHref = '#contact' } = Astro.props
---

<nav id="main-nav" class="fixed top-0 left-0 right-0 z-50 transition-all duration-500">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16 sm:h-20">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 group">
        <span class="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Merch<span class="text-yellow group-hover:text-sky transition-colors duration-300">&</span>Move
        </span>
      </a>

      <!-- Desktop Nav -->
      <div class="hidden md:flex items-center gap-8">
        <a href="/#how-it-works" class="text-sm font-medium text-white/50 hover:text-white transition-colors duration-300">How It Works</a>
        <a href="/#active-selling" class="text-sm font-medium text-white/50 hover:text-white transition-colors duration-300">Active Selling</a>
        <a href="/#platform" class="text-sm font-medium text-white/50 hover:text-white transition-colors duration-300">Platform</a>
        <a href="/#pricing" class="text-sm font-medium text-white/50 hover:text-white transition-colors duration-300">Pricing</a>
        <a href={ctaHref} class="inline-flex items-center px-5 py-2 text-sm font-medium text-yellow bg-white/10 border border-white/10 rounded-full hover:bg-yellow hover:text-base hover:border-yellow transition-all duration-300">
          Contact Us
        </a>
      </div>

      <!-- Mobile Menu -->
      <MobileMenu client:load ctaHref={ctaHref} />
    </div>
  </div>
</nav>
```

Leave the existing `<script>` block unchanged.

- [ ] **Step 3: Update MobileMenu.tsx**

Change the `links` array and the component signature:

```tsx
const links = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Active Selling', href: '/#active-selling' },
  { label: 'Platform', href: '/#platform' },
  { label: 'Pricing', href: '/#pricing' },
]

type Props = {
  ctaHref?: string
}

export default function MobileMenu({ ctaHref = '#contact' }: Props) {
```

And change the CTA anchor's `href="#contact"` to `href={ctaHref}`.

- [ ] **Step 4: Verify**

Run:
```bash
npm run build && ./scripts/check-noindex.sh
```
Expected: both `OK:` lines.

Then with the dev server running, open `http://localhost:4321/` and click "Platform" in the nav. Expected: page scrolls to the platform section (same behaviour as before).

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.astro src/components/MobileMenu.tsx scripts/check-noindex.sh
git commit -m "Make nav anchors absolute and CTA target configurable"
```

---

### Task 3: Seller lead validation and email (pure module, TDD)

**Files:**
- Create: `supabase/functions/notify-lead/seller.ts`
- Create: `supabase/functions/notify-lead/seller_test.ts`

**Interfaces:**
- Produces:
  ```ts
  export type SellerLead = {
    full_name: string
    email: string
    phone: string
    location: string
    about: string | null
    user_agent: string | null
    referrer: string | null
    utm_source: string | null
    utm_medium: string | null
    utm_campaign: string | null
  }
  export type SellerValidation = { ok: true; lead: SellerLead } | { ok: false; error: string }
  export function validateSellerLead(data: Record<string, unknown>): SellerValidation
  export function renderSellerEmail(lead: SellerLead): { subject: string; html: string; text: string }
  ```

- [ ] **Step 1: Write the failing tests**

Create `supabase/functions/notify-lead/seller_test.ts`:

```ts
import { assertEquals, assertStringIncludes } from 'jsr:@std/assert@1'
import { validateSellerLead, renderSellerEmail } from './seller.ts'

const valid = {
  full_name: 'Thandi Nkosi',
  email: 'thandi@example.com',
  phone: '082 123 4567',
  location: 'Durban',
  about: 'I run a small side business already.',
}

Deno.test('accepts a valid seller lead and normalises phone', () => {
  const r = validateSellerLead(valid)
  assertEquals(r.ok, true)
  if (r.ok) {
    assertEquals(r.lead.phone, '0821234567')
    assertEquals(r.lead.about, 'I run a small side business already.')
    assertEquals(r.lead.utm_source, null)
  }
})

Deno.test('rejects missing required fields', () => {
  for (const key of ['full_name', 'email', 'phone', 'location'] as const) {
    const r = validateSellerLead({ ...valid, [key]: '' })
    assertEquals(r.ok, false)
    if (!r.ok) assertEquals(r.error, 'Missing required fields')
  }
})

Deno.test('rejects a bad email', () => {
  const r = validateSellerLead({ ...valid, email: 'not-an-email' })
  assertEquals(r, { ok: false, error: 'Invalid email address' })
})

Deno.test('rejects a bad phone', () => {
  const r = validateSellerLead({ ...valid, phone: '123' })
  assertEquals(r, { ok: false, error: 'Invalid phone number' })
})

Deno.test('rejects about text over 2000 chars', () => {
  const r = validateSellerLead({ ...valid, about: 'x'.repeat(2001) })
  assertEquals(r, { ok: false, error: 'About too long' })
})

Deno.test('treats empty about as null', () => {
  const r = validateSellerLead({ ...valid, about: '' })
  assertEquals(r.ok, true)
  if (r.ok) assertEquals(r.lead.about, null)
})

Deno.test('renders the seller email', () => {
  const r = validateSellerLead({ ...valid, utm_source: 'instagram' })
  if (!r.ok) throw new Error(r.error)
  const { subject, html, text } = renderSellerEmail(r.lead)
  assertEquals(subject, 'New seller interest: Thandi Nkosi')
  assertStringIncludes(text, 'Durban')
  assertStringIncludes(text, 'source=instagram')
  assertStringIncludes(html, 'Seller Interest')
  assertStringIncludes(html, 'thandi@example.com')
})

Deno.test('escapes html in the email', () => {
  const r = validateSellerLead({ ...valid, about: '<script>alert(1)</script>' })
  if (!r.ok) throw new Error(r.error)
  const { html } = renderSellerEmail(r.lead)
  assertStringIncludes(html, '&lt;script&gt;')
})
```

- [ ] **Step 2: Run the tests to verify they fail**

Run:
```bash
cd supabase/functions/notify-lead && deno test seller_test.ts
```
Expected: error resolving `./seller.ts` (module not found).

- [ ] **Step 3: Implement seller.ts**

Create `supabase/functions/notify-lead/seller.ts`:

```ts
// Seller-interest leads from /start-your-business.
// Pure validation and email rendering; no I/O, so it can be unit-tested.

export type SellerLead = {
  full_name: string
  email: string
  phone: string
  location: string
  about: string | null
  user_agent: string | null
  referrer: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
}

export type SellerValidation =
  | { ok: true; lead: SellerLead }
  | { ok: false; error: string }

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
const PHONE_RE = /^\+?\d{9,15}$/

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : ''
}

function optional(v: unknown): string | null {
  const s = str(v)
  return s.length > 0 ? s : null
}

export function validateSellerLead(data: Record<string, unknown>): SellerValidation {
  const full_name = str(data.full_name)
  const email = str(data.email)
  const rawPhone = str(data.phone)
  const location = str(data.location)

  if (!full_name || !email || !rawPhone || !location) {
    return { ok: false, error: 'Missing required fields' }
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: 'Invalid email address' }
  }
  const phone = rawPhone.replace(/[\s().\-]/g, '')
  if (!PHONE_RE.test(phone)) {
    return { ok: false, error: 'Invalid phone number' }
  }
  const about = optional(data.about)
  if (about && about.length > 2000) {
    return { ok: false, error: 'About too long' }
  }

  return {
    ok: true,
    lead: {
      full_name,
      email,
      phone,
      location,
      about,
      user_agent: optional(data.user_agent),
      referrer: optional(data.referrer),
      utm_source: optional(data.utm_source),
      utm_medium: optional(data.utm_medium),
      utm_campaign: optional(data.utm_campaign),
    },
  }
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
    <td style="padding:8px 16px 8px 0;color:#6b7280;width:140px;vertical-align:top;">${escape(label)}</td>
    <td style="padding:8px 0;color:#111827;">${escape(value)}</td>
  </tr>`
}

export function renderSellerEmail(lead: SellerLead): { subject: string; html: string; text: string } {
  const subject = `New seller interest: ${lead.full_name}`

  const utmLine = [
    lead.utm_source && `source=${lead.utm_source}`,
    lead.utm_medium && `medium=${lead.utm_medium}`,
    lead.utm_campaign && `campaign=${lead.utm_campaign}`,
  ].filter(Boolean).join(' · ')

  const text = [
    `NEW SELLER INTEREST — ${lead.full_name}`,
    ``,
    `${lead.full_name} <${lead.email}>`,
    `Phone:    ${lead.phone}`,
    `Location: ${lead.location}`,
    ``,
    lead.about ? `ABOUT\n  ${lead.about.replace(/\n/g, '\n  ')}\n` : null,
    utmLine ? `ATTRIBUTION\n  ${utmLine}` : null,
    lead.referrer ? `  Referrer: ${lead.referrer}` : null,
    ``,
    `Reply to this email to respond directly to ${lead.full_name}.`,
  ].filter(Boolean).join('\n')

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#f4f5f7;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1f2937;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
    <div style="background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;padding:32px 28px;">
      <div style="border-left:3px solid #3EB5E1;padding-left:16px;margin-bottom:24px;">
        <div style="font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#0369a1;font-weight:700;">Seller Interest</div>
        <h1 style="margin:8px 0 4px;font-size:22px;line-height:1.2;color:#111827;font-weight:600;">${escape(lead.full_name)}</h1>
        <div style="color:#6b7280;font-size:14px;"><a href="mailto:${escape(lead.email)}" style="color:#6b7280;">${escape(lead.email)}</a></div>
        <div style="color:#6b7280;font-size:14px;margin-top:4px;"><a href="tel:${escape(lead.phone)}" style="color:#6b7280;">${escape(lead.phone)}</a></div>
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;line-height:1.6;">
        ${row('Location', lead.location)}
      </table>
      ${lead.about ? `<div style="margin-top:24px;padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;"><div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:#6b7280;margin-bottom:8px;">About</div><div style="color:#1f2937;white-space:pre-wrap;">${escape(lead.about)}</div></div>` : ''}
      ${utmLine || lead.referrer ? `<div style="margin-top:24px;font-size:12px;color:#6b7280;">${utmLine ? `<div>Attribution: ${escape(utmLine)}</div>` : ''}${lead.referrer ? `<div>Referrer: ${escape(lead.referrer)}</div>` : ''}</div>` : ''}
      <div style="margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280;">Reply to this email to respond directly to ${escape(lead.full_name)}.</div>
    </div>
  </div>
</body></html>`

  return { subject, html, text }
}
```

- [ ] **Step 4: Run the tests to verify they pass**

Run:
```bash
cd supabase/functions/notify-lead && deno test seller_test.ts
```
Expected: `ok | 8 passed | 0 failed`

- [ ] **Step 5: Commit**

```bash
git add supabase/functions/notify-lead/seller.ts supabase/functions/notify-lead/seller_test.ts
git commit -m "Add seller lead validation and email rendering"
```

---

### Task 4: Branch notify-lead on `lead_type`

**Files:**
- Modify: `supabase/functions/notify-lead/index.ts` (top imports, `LeadForm` type at ~line 64, handler body after the honeypot check at ~line 212)

**Interfaces:**
- Consumes: `validateSellerLead`, `renderSellerEmail` from `./seller.ts`.
- Produces: POST body `{ lead_type: "seller", ... }` sends the seller email. Missing or `"business"` behaves as today. Any other value returns 400 `Invalid lead_type`.

- [ ] **Step 1: Add the import and type field**

At the top of `index.ts`, after the `Resend` import:

```ts
import { validateSellerLead, renderSellerEmail } from './seller.ts'
```

In `type LeadForm`, add as the first field:

```ts
  lead_type?: string
```

- [ ] **Step 2: Branch after the honeypot check**

Immediately after the honeypot block (the one ending `return json(200, { ok: true }, cors)`), and before the `if (!data.full_name || !data.work_email || !data.company)` line, insert:

```ts
  const leadType = data.lead_type ?? 'business'
  if (leadType !== 'business' && leadType !== 'seller') {
    return json(400, { ok: false, error: 'Invalid lead_type' }, cors)
  }

  if (leadType === 'seller') {
    const v = validateSellerLead(data as Record<string, unknown>)
    if (!v.ok) return json(400, { ok: false, error: v.error }, cors)

    const { subject, html, text } = renderSellerEmail(v.lead)
    const resend = new Resend(RESEND_API_KEY)
    const { data: sendData, error } = await resend.emails.send({
      from: NOTIFY_FROM,
      to: [NOTIFY_TO],
      replyTo: v.lead.email,
      subject,
      html,
      text,
    })
    if (error) {
      console.error('notify-lead: Resend error (seller)', error)
      return json(502, { ok: false, error: 'Failed to send email' }, cors)
    }
    console.log('notify-lead: sent seller interest', { resendId: sendData?.id, name: v.lead.full_name })
    return json(200, { ok: true, id: sendData?.id }, cors)
  }
```

The existing business validation and send below it stay untouched.

- [ ] **Step 3: Type-check the function**

Run:
```bash
cd supabase/functions/notify-lead && deno check index.ts && deno test
```
Expected: `deno check` prints nothing (or "Check ..." with no errors); tests `ok | 8 passed`.

- [ ] **Step 4: Smoke test locally with a fake key**

Run the function locally and post a seller lead. Without a real Resend key the send fails at Resend, which proves routing and validation without sending mail:

```bash
cd supabase/functions/notify-lead && RESEND_API_KEY=re_test deno run --allow-net --allow-env index.ts &
sleep 2
curl -s -X POST http://localhost:8000 -H 'Content-Type: application/json' -H 'Origin: http://localhost:4321' \
  -d '{"lead_type":"seller","full_name":"Test","email":"t@example.com","phone":"0821234567","location":"Durban"}'
echo
curl -s -X POST http://localhost:8000 -H 'Content-Type: application/json' -H 'Origin: http://localhost:4321' \
  -d '{"lead_type":"seller","full_name":"Test","email":"bad","phone":"0821234567","location":"Durban"}'
echo
curl -s -X POST http://localhost:8000 -H 'Content-Type: application/json' -H 'Origin: http://localhost:4321' \
  -d '{"lead_type":"other","full_name":"Test"}'
echo
kill %1
```
Expected, in order:
- `{"ok":false,"error":"Failed to send email"}` (reached Resend with a fake key: routing and validation passed)
- `{"ok":false,"error":"Invalid email address"}`
- `{"ok":false,"error":"Invalid lead_type"}`

- [ ] **Step 5: Commit**

```bash
git add supabase/functions/notify-lead/index.ts
git commit -m "Route seller leads in notify-lead by lead_type"
```

Deployment is a separate, deliberate step at the end (Task 10), since it touches the shared Supabase project.

---

### Task 5: Hero and Benefits sections

**Files:**
- Create: `src/components/business/BusinessHero.tsx`
- Create: `src/components/business/BusinessBenefits.tsx`
- Create: `src/pages/start-your-business.astro` (minimal, grows in later tasks)

**Interfaces:**
- Produces: default-export React components with no props. Page at `/start-your-business` renders `Layout` with `noindex`, `Nav ctaHref="#register"`, the two sections, and `Footer`.

- [ ] **Step 1: Write the failing build check**

Append to `scripts/check-noindex.sh`:

```bash
# The new page exists, is noindex, and is not linked from the homepage.
P=dist/start-your-business/index.html
[ -f "$P" ] || { echo "FAIL: $P not built"; exit 1; }
grep -q 'name="robots" content="noindex"' "$P" || { echo "FAIL: new page lacks noindex"; exit 1; }
grep -q 'href="#register"' "$P" || { echo "FAIL: new page nav CTA does not point to #register"; exit 1; }
if grep -q 'start-your-business' dist/index.html; then
  echo "FAIL: homepage links to start-your-business"; exit 1
fi
echo "OK: start-your-business page is built, noindex, and unlinked"
```

Run:
```bash
npm run build && ./scripts/check-noindex.sh
```
Expected: `FAIL: dist/start-your-business/index.html not built`

- [ ] **Step 2: Create BusinessHero.tsx**

```tsx
import { motion } from 'framer-motion'

export default function BusinessHero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-base overflow-hidden">
      <div className="mesh-orb mesh-orb-indigo w-[800px] h-[800px] -top-60 -left-60" />
      <div className="mesh-orb mesh-orb-yellow w-[500px] h-[500px] top-1/3 right-0 translate-x-1/4" />
      <div className="mesh-orb mesh-orb-sky w-[400px] h-[400px] bottom-10 left-1/3" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-24 pb-16">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 text-[11px] font-medium tracking-[0.15em] uppercase bg-yellow/10 border border-yellow/20 rounded-full text-yellow mb-10"
        >
          Independent Seller Programme
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-6xl sm:text-7xl md:text-8xl text-white leading-[0.95] tracking-[-0.02em] mb-8"
        >
          Start Your Own{' '}
          <span className="italic text-gradient-yellow-animated">Business</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Sell on your own schedule, from wherever you are, backed by a brand that already moves product.{' '}
          <span className="text-white font-medium">You decide how far you take it.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#register"
            className="group inline-flex items-center px-8 py-4 text-sm font-semibold text-base bg-yellow rounded-full hover:shadow-[0_0_40px_rgba(249,215,2,0.35)] transition-all duration-500"
          >
            Register Your Interest
            <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#how-it-works"
            className="inline-flex items-center px-8 py-4 text-sm font-medium text-white/70 hover:text-white border border-white/15 hover:border-white/30 rounded-full transition-all duration-300"
          >
            See How It Works
          </a>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create BusinessBenefits.tsx**

```tsx
import { motion } from 'framer-motion'

const benefits = [
  {
    title: 'Be Your Own Boss',
    body: 'Set your own hours and work from anywhere. Scale up when you want more, scale back when life needs room.',
    accent: 'yellow' as const,
  },
  {
    title: 'Earn On What You Sell',
    body: '[EARNING MODEL: one line on how sellers earn, e.g. commission on every sale you make.]',
    accent: 'sky' as const,
  },
  {
    title: 'Incentives & Rewards',
    body: '[EARNING MODEL: bonuses, tiers or rewards available to top performers.]',
    accent: 'sky' as const,
  },
  {
    title: 'Tools & Training',
    body: 'The same platform our promoters use, plus training to help you sell with confidence from day one.',
    accent: 'yellow' as const,
  },
  {
    title: 'Products People Want',
    body: 'Sell brands that are already on shelves and already moving. No inventing demand from scratch.',
    accent: 'yellow' as const,
  },
  {
    title: 'A Community Behind You',
    body: 'Join a network of sellers across South Africa who share what works and celebrate each other\'s wins.',
    accent: 'sky' as const,
  },
]

export default function BusinessBenefits() {
  return (
    <section className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      <div className="mesh-orb mesh-orb-yellow w-[600px] h-[600px] -top-40 -right-40 opacity-20" />
      <div className="absolute inset-0 dot-grid opacity-50" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[11px] font-bold tracking-[0.25em] text-yellow uppercase mb-6"
          >
            The Benefits
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-[1.0]"
          >
            Why Sellers{' '}
            <span className="italic text-gradient-yellow">Join Us</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base text-white/50 max-w-xl mx-auto"
          >
            Everything you need to build something of your own, without starting from nothing.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b, i) => {
            const isYellow = b.accent === 'yellow'
            return (
              <motion.div
                key={b.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="card rounded-2xl p-7 sm:p-8"
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold mb-6 ${
                  isYellow ? 'bg-yellow/10 text-yellow border border-yellow/20' : 'bg-sky/10 text-sky border border-sky/20'
                }`}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display text-2xl text-white mb-3 leading-[1.15]">{b.title}</h3>
                <p className="text-sm text-white/50 leading-[1.8]">{b.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
```

- [ ] **Step 4: Create the page**

`src/pages/start-your-business.astro`:

```astro
---
import Layout from '../layouts/Layout.astro'
import Nav from '../components/Nav.astro'
import Footer from '../components/Footer.astro'
import SmoothScroll from '../components/SmoothScroll.tsx'
import BusinessHero from '../components/business/BusinessHero.tsx'
import BusinessBenefits from '../components/business/BusinessBenefits.tsx'
---

<Layout
  title="Start Your Own Business — Merch & Move"
  description="Become an independent Merch & Move seller. Work on your own schedule, sell brands that already move, and build something of your own."
  noindex
>
  <SmoothScroll client:load />
  <Nav ctaHref="#register" />
  <main>
    <BusinessHero client:load />
    <BusinessBenefits client:visible />
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 5: Verify**

Run:
```bash
npm run build && ./scripts/check-noindex.sh
```
Expected: three `OK:` lines.

With the dev server running, open `http://localhost:4321/start-your-business`. Expected: hero headline "Start Your Own Business", yellow "Register Your Interest" button, six benefit cards below. The nav's Contact Us pill links to `#register` (nothing to scroll to yet; that arrives in Task 7).

- [ ] **Step 6: Commit**

```bash
git add src/components/business/BusinessHero.tsx src/components/business/BusinessBenefits.tsx src/pages/start-your-business.astro scripts/check-noindex.sh
git commit -m "Add Start Your Business page with hero and benefits"
```

---

### Task 6: Steps, Qualities and Why Us sections

**Files:**
- Create: `src/components/business/BusinessSteps.tsx`
- Create: `src/components/business/BusinessQualities.tsx`
- Create: `src/components/business/BusinessWhyUs.tsx`
- Modify: `src/pages/start-your-business.astro`

**Interfaces:**
- Produces: `BusinessSteps` renders `<section id="how-it-works">` (the hero's second button targets it). Others have no id.

- [ ] **Step 1: Write the failing build check**

Append to `scripts/check-noindex.sh`:

```bash
grep -q 'id="how-it-works"' "$P" || { echo "FAIL: steps section missing"; exit 1; }
grep -q 'What It Takes' "$P" || { echo "FAIL: qualities section missing"; exit 1; }
grep -q 'Why Merch' "$P" || { echo "FAIL: why-us section missing"; exit 1; }
echo "OK: steps, qualities and why-us sections present"
```

Run:
```bash
npm run build && ./scripts/check-noindex.sh
```
Expected: `FAIL: steps section missing`

- [ ] **Step 2: Create BusinessSteps.tsx**

```tsx
import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Register Your Interest',
    body: 'Fill in the short form below. We\'ll be in touch to tell you more and answer your questions.',
    accent: 'yellow' as const,
  },
  {
    number: '02',
    title: 'Get Set Up',
    body: '[EARNING MODEL: what onboarding involves, e.g. starter kit, platform access, first training session.]',
    accent: 'sky' as const,
  },
  {
    number: '03',
    title: 'Start Selling',
    body: 'Share products with the people around you. Every sale is tracked on the platform, so you always know where you stand.',
    accent: 'sky' as const,
  },
  {
    number: '04',
    title: 'Grow',
    body: '[EARNING MODEL: how sellers grow, e.g. higher rates at volume, building a team, unlocking rewards.]',
    accent: 'yellow' as const,
  },
]

export default function BusinessSteps() {
  return (
    <section id="how-it-works" className="relative py-32 sm:py-40 bg-base overflow-hidden">
      <div className="mesh-orb mesh-orb-sky w-[500px] h-[500px] bottom-20 -left-20 opacity-15" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[11px] font-bold tracking-[0.25em] text-yellow uppercase mb-6"
          >
            How It Works
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-6 leading-[1.0]"
          >
            Four Steps to{' '}
            <span className="italic text-gradient-sky">Your First Sale</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {steps.map((s, i) => {
            const isYellow = s.accent === 'yellow'
            return (
              <motion.div
                key={s.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="card rounded-2xl p-7"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[11px] font-mono font-bold ${
                    isYellow ? 'bg-yellow/10 text-yellow border border-yellow/20' : 'bg-sky/10 text-sky border border-sky/20'
                  }`}>
                    {s.number}
                  </div>
                </div>
                <h3 className="font-display text-xl sm:text-2xl text-white mb-3 leading-[1.15]">{s.title}</h3>
                <p className="text-sm text-white/50 leading-[1.8]">{s.body}</p>
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
```

- [ ] **Step 3: Create BusinessQualities.tsx**

```tsx
import { motion } from 'framer-motion'

const qualities = [
  { title: 'Self-Driven', body: 'Nobody sets your hours. The people who do best here are the ones who show up for themselves.' },
  { title: 'A People Person', body: 'Selling is talking. If you enjoy a conversation and can read a room, you already have the hardest part.' },
  { title: 'Organised', body: 'Keep track of your customers, your stock and your follow-ups. The platform helps, but the habit is yours.' },
  { title: 'Ambitious', body: 'This can be a side income or a full business. How big it gets is up to you.' },
]

export default function BusinessQualities() {
  return (
    <section className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      <div className="mesh-orb mesh-orb-yellow w-[500px] h-[500px] -bottom-40 -right-40 opacity-15" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-20 items-start">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block text-[11px] font-bold tracking-[0.25em] text-yellow uppercase mb-6"
            >
              What It Takes
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl text-white mb-6 leading-[1.0]"
            >
              No Experience Needed.{' '}
              <span className="italic text-gradient-yellow">Just the Right Mindset.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base text-white/50 leading-relaxed"
            >
              We'll teach you the products and the platform. What we can't teach is the drive to use them.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {qualities.map((q, i) => (
              <motion.div
                key={q.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="card rounded-2xl p-7"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-yellow/60 mb-5" />
                <h3 className="font-display text-xl text-white mb-2 leading-[1.15]">{q.title}</h3>
                <p className="text-sm text-white/50 leading-[1.8]">{q.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
```

- [ ] **Step 4: Create BusinessWhyUs.tsx**

```tsx
import { motion } from 'framer-motion'

const proofPoints = [
  { label: 'Active selling, not shelf-filling', body: 'Our promoters are trained to close sales in-store. You get that same playbook.' },
  { label: 'A platform that tracks everything', body: 'Every sale, every product, every day. You always know exactly what you\'ve earned.' },
  { label: 'Brands that already move', body: 'You sell products with proven demand and national retail presence.' },
]

export default function BusinessWhyUs() {
  return (
    <section className="relative py-32 sm:py-40 bg-base overflow-hidden">
      <div className="mesh-orb mesh-orb-indigo w-[700px] h-[700px] -top-60 left-1/2 -translate-x-1/2 opacity-40" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block text-[11px] font-bold tracking-[0.25em] text-sky uppercase mb-6"
        >
          Why Merch &amp; Move
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl md:text-6xl text-white mb-14 leading-[1.0]"
        >
          Built on a Business That{' '}
          <span className="italic text-gradient-sky">Already Sells</span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
          {proofPoints.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="card-elevated rounded-2xl p-7"
            >
              <h3 className="text-sm font-semibold text-white mb-2">{p.label}</h3>
              <p className="text-sm text-white/50 leading-[1.8]">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
```

- [ ] **Step 5: Add the sections to the page**

In `src/pages/start-your-business.astro`, add the imports:

```astro
import BusinessSteps from '../components/business/BusinessSteps.tsx'
import BusinessQualities from '../components/business/BusinessQualities.tsx'
import BusinessWhyUs from '../components/business/BusinessWhyUs.tsx'
```

and inside `<main>`, after `<BusinessBenefits client:visible />`:

```astro
    <BusinessSteps client:visible />
    <BusinessQualities client:visible />
    <BusinessWhyUs client:visible />
```

- [ ] **Step 6: Verify**

Run:
```bash
npm run build && ./scripts/check-noindex.sh
```
Expected: four `OK:` lines.

In the browser at `http://localhost:4321/start-your-business`, click "See How It Works" in the hero. Expected: scrolls to the four-step section. Scroll on: qualities grid, then the three-card "why us" block.

- [ ] **Step 7: Commit**

```bash
git add src/components/business/BusinessSteps.tsx src/components/business/BusinessQualities.tsx src/components/business/BusinessWhyUs.tsx src/pages/start-your-business.astro scripts/check-noindex.sh
git commit -m "Add steps, qualities and why-us sections to Start Your Business"
```

---

### Task 7: FAQ with income disclaimer

**Files:**
- Create: `src/components/business/BusinessFAQ.tsx`
- Modify: `src/pages/start-your-business.astro`

**Interfaces:**
- Produces: `BusinessFAQ` renders an accordion (native `<details>` for accessibility and no state) and a disclaimer paragraph.

- [ ] **Step 1: Write the failing build check**

Append to `scripts/check-noindex.sh`:

```bash
grep -q '<details' "$P" || { echo "FAIL: FAQ accordion missing"; exit 1; }
grep -q 'Individual results vary' "$P" || { echo "FAIL: income disclaimer missing"; exit 1; }
echo "OK: FAQ and disclaimer present"
```

Run:
```bash
npm run build && ./scripts/check-noindex.sh
```
Expected: `FAIL: FAQ accordion missing`

- [ ] **Step 2: Create BusinessFAQ.tsx**

```tsx
import { motion } from 'framer-motion'

const faqs = [
  {
    q: 'How do I earn money?',
    a: '[EARNING MODEL: plain-language answer on how sellers are paid, and how often.]',
  },
  {
    q: 'Does it cost anything to start?',
    a: '[EARNING MODEL: starter cost, if any, and what it includes.]',
  },
  {
    q: 'Am I employed by Merch & Move?',
    a: 'No. Independent sellers run their own business. You choose your hours, your customers and how much you want to sell.',
  },
  {
    q: 'What do I actually sell?',
    a: '[EARNING MODEL: what sellers sell and to whom.]',
  },
  {
    q: 'Do I need sales experience?',
    a: 'No. We provide training on the products and the platform. Enthusiasm and consistency matter more than a CV.',
  },
  {
    q: 'Where in South Africa can I sell?',
    a: 'Anywhere. Sellers work in their own communities, so the programme is open across all nine provinces.',
  },
]

export default function BusinessFAQ() {
  return (
    <section className="relative py-32 sm:py-40 bg-base-light overflow-hidden">
      <div className="mesh-orb mesh-orb-sky w-[400px] h-[400px] top-0 right-0 opacity-15" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[11px] font-bold tracking-[0.25em] text-yellow uppercase mb-6"
          >
            Questions
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl text-white leading-[1.05]"
          >
            Things People{' '}
            <span className="italic text-gradient-yellow">Ask First</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-3"
        >
          {faqs.map(f => (
            <details key={f.q} className="card rounded-2xl group">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 text-sm font-medium text-white">
                {f.q}
                <svg className="w-4 h-4 text-white/40 flex-shrink-0 transition-transform duration-300 group-open:rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
                </svg>
              </summary>
              <p className="px-6 pb-6 text-sm text-white/50 leading-[1.8]">{f.a}</p>
            </details>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-[11px] text-white/30 leading-[1.8] text-center max-w-xl mx-auto"
        >
          Individual results vary. Merch &amp; Move makes no guarantee of income or success. What you earn depends on
          your effort, skill and commitment. [EARNING MODEL: link to an income disclosure statement once published.]
        </motion.p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  )
}
```

- [ ] **Step 3: Add to the page**

In `src/pages/start-your-business.astro`, add the import:

```astro
import BusinessFAQ from '../components/business/BusinessFAQ.tsx'
```

and inside `<main>`, after `<BusinessWhyUs client:visible />`:

```astro
    <BusinessFAQ client:visible />
```

- [ ] **Step 4: Verify**

Run:
```bash
npm run build && ./scripts/check-noindex.sh
```
Expected: five `OK:` lines.

In the browser, click an FAQ question. Expected: it expands and the plus icon rotates to a cross.

- [ ] **Step 5: Commit**

```bash
git add src/components/business/BusinessFAQ.tsx src/pages/start-your-business.astro scripts/check-noindex.sh
git commit -m "Add FAQ and income disclaimer to Start Your Business"
```

---

### Task 8: Interest form

**Files:**
- Create: `src/components/business/BusinessInterestForm.tsx`
- Modify: `src/pages/start-your-business.astro`

**Interfaces:**
- Consumes: `PUBLIC_LEAD_ENDPOINT_URL` env var (already in `.env`), `notify-lead` accepting `lead_type: "seller"` (Task 4).
- Produces: `<section id="register">` containing the form. Payload shape matches `validateSellerLead` input in Task 3.

- [ ] **Step 1: Write the failing build check**

Append to `scripts/check-noindex.sh`:

```bash
grep -q 'id="register"' "$P" || { echo "FAIL: register section missing"; exit 1; }
grep -q 'name="hp_website_url"' "$P" || { echo "FAIL: honeypot missing from interest form"; exit 1; }
echo "OK: interest form present"
```

Run:
```bash
npm run build && ./scripts/check-noindex.sh
```
Expected: `FAIL: register section missing`

- [ ] **Step 2: Create BusinessInterestForm.tsx**

```tsx
import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'

type Status = 'idle' | 'sending' | 'success' | 'error'

type SellerPayload = {
  lead_type: 'seller'
  full_name: string
  email: string
  phone: string
  location: string
  about: string | null
  hp_website_url: string | null
  user_agent: string | null
  referrer: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
}

const ENDPOINT = import.meta.env.PUBLIC_LEAD_ENDPOINT_URL as string | undefined

// Accepts local and international formats ("082 123 4567", "+27 82 123 4567").
// Returns digits (with optional leading +), or null if invalid.
function normalizePhone(raw: string): string | null {
  const stripped = raw.replace(/[\s().\-]/g, '')
  return /^\+?\d{9,15}$/.test(stripped) ? stripped : null
}

function readUtm(): Pick<SellerPayload, 'utm_source' | 'utm_medium' | 'utm_campaign' | 'referrer'> {
  if (typeof window === 'undefined') {
    return { utm_source: null, utm_medium: null, utm_campaign: null, referrer: null }
  }
  const p = new URLSearchParams(window.location.search)
  return {
    utm_source: p.get('utm_source'),
    utm_medium: p.get('utm_medium'),
    utm_campaign: p.get('utm_campaign'),
    referrer: document.referrer || null,
  }
}

export default function BusinessInterestForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setErrorMessage(null)

    if (!ENDPOINT) {
      setStatus('error')
      setErrorMessage('Lead endpoint not configured. Set PUBLIC_LEAD_ENDPOINT_URL in .env.')
      return
    }

    const form = e.currentTarget
    const get = (name: string) =>
      (form.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null)?.value.trim() ?? ''

    const phone = normalizePhone(get('phone'))
    if (!phone) {
      setStatus('error')
      setErrorMessage('Enter a valid phone number, like 082 123 4567 or +27 82 123 4567.')
      return
    }

    setStatus('sending')

    const payload: SellerPayload = {
      lead_type: 'seller',
      full_name: get('full_name'),
      email: get('email'),
      phone,
      location: get('location'),
      about: get('about') || null,
      hp_website_url: get('hp_website_url') || null,
      user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : null,
      ...readUtm(),
    }

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Server returned ${res.status}`)
      }
      setStatus('success')
      form.reset()
    } catch (err) {
      console.error('Seller interest submission failed:', err)
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please email us directly.',
      )
    }
  }

  const inputClasses =
    'w-full px-4 py-3.5 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white placeholder-white/25 focus:outline-none focus:ring-1 focus:ring-yellow/50 focus:border-yellow/40 transition-all duration-300 text-sm'

  const labelClasses =
    'block text-[11px] font-semibold tracking-[0.15em] text-white/35 uppercase mb-2'

  return (
    <section id="register" className="relative py-32 sm:py-40 bg-base overflow-hidden">
      <div className="mesh-orb mesh-orb-yellow w-[500px] h-[500px] top-0 left-0 opacity-20" />
      <div className="mesh-orb mesh-orb-sky w-[400px] h-[400px] bottom-0 right-0 opacity-20" />
      <div className="absolute inset-0 max-w-7xl mx-auto grid-lines" />

      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="inline-block text-[11px] font-bold tracking-[0.25em] text-yellow uppercase mb-6">
            Register Your Interest
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-white mb-4 leading-[1.05]">
            Ready to <span className="italic text-gradient-yellow">Start?</span>
          </h2>
          <p className="text-sm text-white/50">
            Leave your details and we'll be in touch with everything you need to know.
          </p>
        </motion.div>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-elevated rounded-2xl p-12 text-center"
          >
            <div className="w-14 h-14 mx-auto mb-6 rounded-full bg-yellow/10 border border-yellow/25 flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-display text-2xl text-white mb-3">Thanks, we've got your details.</h3>
            <p className="text-sm text-white/50 max-w-md mx-auto leading-relaxed">
              A member of our team will be in touch within a few business days to tell you more about the programme.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="card-elevated rounded-2xl p-8 sm:p-10 space-y-6"
          >
            <div aria-hidden="true" className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden">
              <label>
                Leave this field empty
                <input type="text" name="hp_website_url" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="full_name" className={labelClasses}>Full name</label>
                <input type="text" id="full_name" name="full_name" required maxLength={200} autoComplete="name" className={inputClasses} placeholder="Thandi Nkosi" />
              </div>
              <div>
                <label htmlFor="email" className={labelClasses}>Email</label>
                <input type="email" id="email" name="email" required autoComplete="email" className={inputClasses} placeholder="you@example.com" />
              </div>
              <div>
                <label htmlFor="phone" className={labelClasses}>Phone number</label>
                <input type="tel" id="phone" name="phone" required autoComplete="tel" maxLength={20} className={inputClasses} placeholder="082 123 4567" />
              </div>
              <div>
                <label htmlFor="location" className={labelClasses}>Town or province</label>
                <input type="text" id="location" name="location" required maxLength={120} autoComplete="address-level2" className={inputClasses} placeholder="Durban" />
              </div>
            </div>

            <div>
              <label htmlFor="about" className={labelClasses}>
                Tell us a bit about yourself <span className="text-white/25 normal-case tracking-normal">— optional</span>
              </label>
              <textarea
                id="about"
                name="about"
                rows={4}
                maxLength={2000}
                className={`${inputClasses} resize-none`}
                placeholder="What you do now, why this interests you, anything you'd like us to know…"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-4 bg-yellow text-base font-semibold rounded-xl hover:shadow-[0_0_30px_rgba(249,215,2,0.3)] transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              {status === 'sending' ? 'Sending…' : 'Register My Interest'}
            </button>

            {status === 'error' && errorMessage && (
              <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-center text-red-400/80 text-xs">
                {errorMessage}
              </motion.p>
            )}
          </motion.form>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add to the page**

In `src/pages/start-your-business.astro`, add the import:

```astro
import BusinessInterestForm from '../components/business/BusinessInterestForm.tsx'
```

and inside `<main>`, after `<BusinessFAQ client:visible />`:

```astro
    <BusinessInterestForm client:visible />
```

- [ ] **Step 4: Verify the build**

Run:
```bash
npm run build && ./scripts/check-noindex.sh
```
Expected: six `OK:` lines.

- [ ] **Step 5: Verify the form against the local function**

Start the edge function locally with a fake key (as in Task 4 Step 4) and point the site at it:

```bash
cd supabase/functions/notify-lead && RESEND_API_KEY=re_test deno run --allow-net --allow-env index.ts &
cd - >/dev/null
PUBLIC_LEAD_ENDPOINT_URL=http://localhost:8000 npm run dev
```

In the browser at `http://localhost:4321/start-your-business`:
1. Click "Register Your Interest" in the hero. Expected: scrolls to the form.
2. Submit with phone `123`. Expected: red message about a valid phone number, nothing sent.
3. Submit with valid values. Expected: red message `Failed to send email` (the fake key stopped it at Resend, so validation and routing passed).

Stop both processes afterwards. Restart the normal dev server without the override.

- [ ] **Step 6: Commit**

```bash
git add src/components/business/BusinessInterestForm.tsx src/pages/start-your-business.astro scripts/check-noindex.sh
git commit -m "Add seller interest form to Start Your Business"
```

---

### Task 9: Full-page review

**Files:**
- Read-only pass over everything under `src/components/business/` and `src/pages/start-your-business.astro`.

- [ ] **Step 1: Confirm every earning-model placeholder is findable**

Run:
```bash
grep -rn "\[EARNING MODEL" src/components/business | wc -l
grep -rn "\[EARNING MODEL" src/components/business
```
Expected: 8 matches, all beginning `[EARNING MODEL`. Any bracketed placeholder that does not start with that prefix is a bug; fix it.

- [ ] **Step 2: Confirm nothing links to the page**

Run:
```bash
grep -rn "start-your-business" src --include=*.astro --include=*.tsx | grep -v "src/pages/start-your-business.astro"
```
Expected: no output.

- [ ] **Step 3: Confirm the homepage lead flow is untouched**

Run:
```bash
git diff 718cfe5 -- src/components/ContactForm.tsx src/pages/index.astro
```
Expected: no output (neither file changed since the spec commit).

- [ ] **Step 4: Full build and assertion script**

Run:
```bash
npm run build && ./scripts/check-noindex.sh
```
Expected: six `OK:` lines, no build errors. Warnings about content config and `emitFile` are pre-existing and fine.

- [ ] **Step 5: Visual pass**

With the dev server on, load `http://localhost:4321/start-your-business` at desktop width and at a 390px-wide mobile viewport. Check: no horizontal scroll, every section visible, hero text not clipped, form inputs full width on mobile, mobile menu opens and its Contact Us link goes to `#register`.

Take one desktop screenshot and one mobile screenshot for the user.

- [ ] **Step 6: Commit any fixes**

```bash
git add -A src scripts
git commit -m "Polish Start Your Business page"
```
(Skip if nothing changed.)

---

### Task 10: Deploy notify-lead (user-gated)

This touches the shared Supabase project. Do not run it without the user saying so.

**Files:**
- None changed. Deploys `supabase/functions/notify-lead/`.

- [ ] **Step 1: Ask the user for the go-ahead**

Tell the user the site work is complete and the function is ready. Deploying changes the live `notify-lead` function used by the production homepage. Ask for an explicit yes.

- [ ] **Step 2: Deploy**

```bash
supabase functions deploy notify-lead --no-verify-jwt
```
Expected: deploy succeeds and lists `notify-lead`.

- [ ] **Step 3: Verify the live function still accepts business leads**

Post a business-shaped lead with the honeypot filled, which returns success without sending mail:

```bash
curl -s -X POST "$PUBLIC_LEAD_ENDPOINT_URL" -H 'Content-Type: application/json' -H 'Origin: https://merchandmove.co.za' \
  -d '{"full_name":"Smoke","work_email":"s@example.com","company":"Smoke","product_category":"other","retail_footprint":"dtc_only","timeline":"exploring","target_regions":["national"],"hp_website_url":"bot"}'
```
Expected: `{"ok":true}`

Then post a seller-shaped invalid lead to confirm routing is live without sending mail:

```bash
curl -s -X POST "$PUBLIC_LEAD_ENDPOINT_URL" -H 'Content-Type: application/json' -H 'Origin: https://merchandmove.co.za' \
  -d '{"lead_type":"seller","full_name":"Smoke","email":"bad","phone":"0821234567","location":"Durban"}'
```
Expected: `{"ok":false,"error":"Invalid email address"}`

- [ ] **Step 4: One real seller submission**

Ask the user to submit the form once on the dev server with their own details, and confirm the "New seller interest" email arrives. This is the only step that sends mail.

---

## Self-review

**Spec coverage.** Purpose and hidden URL: Tasks 5 and 9. Nine sections: hero and benefits (5), steps, qualities, why-us (6), FAQ and disclaimer (7), form (8), footer (5). Nav anchors and CTA target: Task 2. `noindex`: Tasks 1 and 5. Form fields and `lead_type: "seller"`: Tasks 3, 4, 8. Business leads unchanged: Task 4 (branch placed before business validation) and verified in Tasks 4, 9, 10. Placeholder copy convention: Global Constraints and Task 9. Every test in the spec's Testing section maps to a step.

**Placeholders.** None outside the deliberate `[EARNING MODEL ...]` copy markers, which the spec requires.

**Type consistency.** `SellerLead` field names (`full_name`, `email`, `phone`, `location`, `about`, `user_agent`, `referrer`, `utm_*`) match `SellerPayload` in Task 8 plus `lead_type` and `hp_website_url`, which the function reads before validation. `validateSellerLead` and `renderSellerEmail` names are identical in Tasks 3 and 4. `ctaHref` is the prop name in both `Nav.astro` and `MobileMenu.tsx`.
