# Start Your Business page — design

**Date:** 2026-09-07
**Status:** Draft for review
**URL:** `https://merchandmove.co.za/start-your-business`

## Purpose

A single marketing page that recruits independent, self-employed sellers to
build a business selling on Merch & Move's behalf. This audience is distinct
from the homepage audience (businesses buying the platform) and from the
promoters employed through the app. The page is the first step of a larger
future feature; for now it only markets the opportunity and captures interest.

The page is intentionally unlinked from the homepage and nav. It is reachable
by URL only until the programme is ready to launch.

## Out of scope

- The earning / commission model. Copy leaves clearly marked spots for it.
- Any app-side sign-up, onboarding, or account creation.
- Homepage or nav links to the new page.
- Storing leads in a database. Leads are email-only, matching the existing
  pipeline.

## Page structure

One scrolling page, modelled on Forever Living's "Your Opportunity" and
"What it takes" pages merged into one. Sections in order:

1. **Hero.** Headline about starting your own business on your own schedule,
   one-line sub-copy, primary CTA button that scrolls to the interest form.
2. **Benefits grid.** Six cards: be your own boss, earn on what you sell,
   incentives and rewards, tools and training, product access, community.
   Earning-specific copy is placeholder text marked `[EARNING MODEL]`.
3. **How it works.** Numbered three or four step strip: register your
   interest, get set up, start selling, grow. Step copy is generic until the
   model is decided.
4. **What it takes.** Short grid of qualities: self-driven, people person,
   organised, ambitious. Sets expectations without being a job spec.
5. **Why Merch & Move.** Credibility block reusing the homepage's proof points
   (established brand partners, live tracking platform, active selling
   expertise).
6. **FAQ.** Four to six accordion items. Earning-related answers are
   placeholders.
7. **Disclaimer.** Short income disclaimer paragraph. South African
   direct-selling pages carry one; final wording is a business decision and
   is marked as placeholder.
8. **Register your interest.** The lead form (see below) with its own CTA
   heading.
9. **Footer.** Existing site footer.

Nav is the existing `Nav.astro` in a new minimal mode: logo on the left,
one "Register Your Interest" pill on the right linking to `#register`, and
nothing else. No section links and no mobile menu. The page has a single
purpose and the nav should not offer exits from it.

## Components

New files, following the homepage's pattern of one React component per
section with `client:visible` hydration and framer-motion reveals:

```
src/pages/start-your-business.astro
src/components/business/BusinessHero.tsx
src/components/business/BusinessBenefits.tsx
src/components/business/BusinessSteps.tsx
src/components/business/BusinessQualities.tsx
src/components/business/BusinessWhyUs.tsx
src/components/business/BusinessFAQ.tsx
src/components/business/BusinessInterestForm.tsx
```

Existing `Layout.astro`, `Footer.astro`, `SmoothScroll.tsx` and global
styles are reused unchanged. `Nav.astro` gains a `minimal` prop. When set, it
renders only the logo and a single pill whose label and target come from
`ctaLabel` and `ctaHref` props. The homepage does not pass `minimal` and is
unchanged.

`Layout.astro` gains an optional `noindex` prop that emits
`<meta name="robots" content="noindex">`. The new page sets it so search
engines do not surface an unfinished programme. Remove it at launch.

## Lead capture

The existing `ContactForm.tsx` is built for businesses (product category,
retail footprint, regions) and does not fit an individual. The new
`BusinessInterestForm` is a smaller form:

| Field | Required | Notes |
|---|---|---|
| full_name | yes | |
| email | yes | same regex as the existing form |
| phone | yes | same format check as the existing form |
| location | yes | free-text town or province |
| about | no | "Tell us a bit about yourself", max 2000 chars |
| hp_website_url | hidden | honeypot, matches existing form |

The form posts JSON to the same `PUBLIC_LEAD_ENDPOINT_URL` with
`lead_type: "seller"`. It reuses the existing form's status handling
(idle, sending, success, error) and visual style.

### notify-lead change

The Supabase Edge Function `notify-lead` is the only server-side change,
in line with the shared-project constraint. It branches on `lead_type`:

- Missing or `"business"`: existing validation and email, unchanged. Leads
  from the already-deployed homepage carry no `lead_type` and must keep
  working.
- `"seller"`: validate the fields above, render a separate email template
  with subject `New seller interest: <full_name>`, send to the same
  recipient from the same verified sender.

Any other `lead_type` value returns 400.

## Copy

Placeholder copy is written in the site's existing voice (direct, confident,
short lines). Every spot that depends on the undecided earning model is
wrapped in square brackets, for example `[EARNING MODEL: how commission
works]`, so it can be found and replaced in one pass.

## Testing

- `astro build` passes with no new warnings.
- Page renders at `/start-your-business` in dev with every section visible
  and the CTA scrolling to the form.
- Form submission against the deployed function succeeds and the email
  arrives with the seller template.
- A homepage lead with no `lead_type` still sends the existing email.
- The page's `<head>` contains the noindex meta; the homepage's does not.
- The new page's nav shows only the logo and the register pill. The homepage nav is unchanged.
