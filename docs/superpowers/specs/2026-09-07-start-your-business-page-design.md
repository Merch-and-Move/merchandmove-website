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
- Any lead capture on this site. The "Start Your Business" buttons link to a
  contact form inside the Merch & Move application, which is being built
  separately. Until that URL exists the buttons point at a placeholder.
- Any change to the `notify-lead` Edge Function or the shared Supabase
  project.
- Homepage or nav links to the new page.

## Positioning

The page speaks to individuals, not businesses. It should read as an
invitation to build something of your own, whether that is a side hustle
alongside a job or a full-time business. "Side hustle" language appears in
the hero, the benefits and the FAQ so the low-commitment entry point is
obvious. The single call to action everywhere on the page is
**Start Your Business**.

## Page structure

One scrolling page, modelled on Forever Living's "Your Opportunity" and
"What it takes" pages merged into one. Sections in order:

1. **Hero.** Headline about starting your own business on your own schedule,
   sub-copy that names the side-hustle option, primary "Start Your Business"
   button linking to the app, secondary button scrolling to "How it works".
2. **Benefits grid.** Six cards: be your own boss, side hustle or full-time,
   earn on what you sell, tools and training, products people want,
   community. Earning-specific copy is placeholder text marked
   `[EARNING MODEL]`.
3. **How it works.** Four numbered steps: start your business (fill in the
   form in the app), get set up, start selling, grow. Step copy is generic
   until the model is decided.
4. **What it takes.** Short grid of qualities: self-driven, people person,
   organised, ambitious. Sets expectations without being a job spec.
5. **Why Merch & Move.** Credibility block reusing the homepage's proof points
   (active selling expertise, live tracking platform, brands that already
   move).
6. **FAQ.** Six accordion items, including "Can I do this as a side hustle?".
   Earning-related answers are placeholders.
7. **Disclaimer.** Short income disclaimer paragraph. South African
   direct-selling pages carry one; final wording is a business decision and
   is marked as placeholder.
8. **Closing CTA.** Large headline and a single "Start Your Business" button,
   in the style of the homepage's closing CTA section.
9. **Footer.** Existing site footer.

Nav is the existing `Nav.astro` in a new minimal mode: logo on the left,
one "Start Your Business" pill on the right linking to the app, and nothing
else. No section links and no mobile menu. The page has a single purpose and
the nav should not offer exits from it.

## The start link

`src/components/business/startUrl.ts` exports one constant, `START_URL`.
Every "Start Your Business" button on the page, including the nav pill,
reads it. Its value is `#` with a comment marking it `[APP LINK]` until the
application's contact form URL is supplied. Changing that one line wires up
the whole page.

## Components

New files, following the homepage's pattern of one React component per
section with `client:visible` hydration and framer-motion reveals:

```
src/pages/start-your-business.astro
src/components/business/startUrl.ts
src/components/business/BusinessHero.tsx
src/components/business/BusinessBenefits.tsx
src/components/business/BusinessSteps.tsx
src/components/business/BusinessQualities.tsx
src/components/business/BusinessWhyUs.tsx
src/components/business/BusinessFAQ.tsx
src/components/business/BusinessCTA.tsx
```

Existing `Layout.astro`, `Footer.astro`, `SmoothScroll.tsx` and global
styles are reused unchanged. `Nav.astro` gains a `minimal` prop. When set, it
renders only the logo and a single pill whose label and target come from
`ctaLabel` and `ctaHref` props. The homepage does not pass `minimal` and is
unchanged.

`Layout.astro` gains an optional `noindex` prop that emits
`<meta name="robots" content="noindex">`. The new page sets it so search
engines do not surface an unfinished programme. Remove it at launch.

## Copy

Placeholder copy is written in the site's existing voice (direct, confident,
short lines). Every spot that depends on the undecided earning model is
wrapped in square brackets, for example `[EARNING MODEL: how commission
works]`, so it can be found and replaced in one pass.

## Testing

- `astro build` passes with no new warnings.
- Page renders at `/start-your-business` in dev with every section visible.
- Every "Start Your Business" button and the nav pill carry the same href,
  read from `START_URL`.
- The page's `<head>` contains the noindex meta; the homepage's does not.
- The new page's nav shows only the logo and the pill. The homepage nav is
  unchanged.
- Nothing under `supabase/` or in `ContactForm.tsx` changes.
