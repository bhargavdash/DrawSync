# Product

## Register

brand

> Split-register note: the marketing surfaces (`/`, landing sections) are brand —
> design IS the product, since this app's primary job right now is to make a strong
> first impression on recruiters. The in-app surfaces (canvas, toolbar, lobby,
> signin/signup) are product — design SERVES the collaborative drawing task once
> someone clicks through. Landing page work is being sequenced first; when work
> shifts to the app screens, treat those pages as product register even though this
> file's default is brand.

## Users

Primary: recruiters and hiring managers browsing Bhargav's portfolio, deciding
whether to take his engineering work seriously within seconds of landing on the
page. They are evaluating credibility and craft, not adopting a tool for daily use.
Secondary (once past the landing page): anyone who clicks through to actually try
the collaborative canvas — the app needs to hold up under real interaction, not
just look good in a screenshot, but the landing page's job is to earn that click.

## Product Purpose

DrawSync is a real-time collaborative whiteboard (Excalidraw-inspired): multiple
users draw simultaneously on a shared canvas over WebSockets. The underlying
engineering is genuinely strong — a hand-rolled canvas engine (shapes, zoom/pan,
undo/redo, selection, PNG/JSON export, no external canvas library) and a
Redis-pub/sub-backed WebSocket architecture that fans out state correctly across
multiple server instances, with an async queue decoupling persistence from the
broadcast hot path. The current UI (built ~1 year ago) does not represent that
engineering quality — it reads as a generic, AI-templated SaaS landing page.
Success here means the visual craft finally matches the technical craft, so this
becomes a legitimate third portfolio flagship (alongside an AI travel app and an
agentic analytics dashboard) that demonstrates real-time systems depth.

## Brand Personality

No fixed reference was supplied — direction is ours to propose, with one hard
constraint: it must read as intentional, engineered, and precise, not as a themed
SaaS template. Given the product is a *drawing tool built on real-time systems*,
personality should lean toward: **precise, kinetic, confident** — the feeling of a
well-built instrument, not a marketing funnel. Avoid defaulting to either
Excalidraw's hand-drawn whimsy or Figma's flat corporate-clean; those are the
category's two obvious lanes and picking either reads as derivative. The
opportunity is to let the multiplayer/real-time nature of the product itself
inform the visual language (cursors, presence, motion as a first-class material)
rather than leaning on a generic gradient-hero SaaS layout.

## Anti-references

- The current landing page itself: `bg-gradient-to-br from-gray-900 via-gray-800
  to-black` hero with three blurred `animate-blob` circles (purple/pink/blue),
  gradient-clip-text headline, generic "Get Started / See Demo" CTAs — textbook
  2023-era AI-template SaaS aesthetic. Full stop, do not iterate on this base.
- Broader 2023-era AI-scaffold tells: gradient text, glassmorphism cards used
  decoratively, side-stripe borders, tiny uppercase tracked eyebrows above every
  section, numbered 01/02/03 section markers, identical icon+heading+text card
  grids, the hero-metric template.
- Not a hard requirement to differentiate from Excalidraw/Figma specifically, but
  don't default into either of their established visual languages without a
  deliberate reason.

## Design Principles

1. **Craft parity** — the visual layer must earn the same confidence as the
   backend architecture. If a recruiter reads the code after seeing the UI, the
   UI shouldn't undersell what's actually built.
2. **Show, don't template** — every visual decision should be traceable to
   something true about this specific product (real-time multiplayer drawing),
   not a generic "landing page" convention lifted from category muscle memory.
3. **Motion as material, not garnish** — this product's core differentiator is
   *simultaneous multi-user drawing*; the landing page and app should let motion
   communicate liveness/collaboration intentionally, not as decorative page-load
   animation.
4. **Sequenced, not simultaneous** — land the marketing surface first (brand
   register) since that's what a recruiter sees first; app-screen polish
   (product register: toolbar, lobby, auth, canvas chrome) follows once the
   landing page is settled.
5. **Portfolio-first, but not fake** — optimize for the seconds-long credibility
   read, without making false claims the working app doesn't back up. The
   real-time collaboration story must remain demonstrably true if someone clicks
   through.

## Accessibility & Inclusion

No specific accessibility requirements called out for this pass — visual/UX
polish is the priority. Standard reasonable practice (readable contrast, sane
focus states) still applies by default engineering discipline, but this is not a
dedicated a11y-hardening pass; that can be a later `/impeccable audit` or
`harden` pass once the visual direction is locked.
