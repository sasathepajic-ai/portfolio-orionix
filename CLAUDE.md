# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Marketing site for **Pragmatic Labs AI** (`name` in package.json is `pragmatic_labs_ai_website`). Static, content-driven Next.js site — no database, no CMS. The one backend surface is `src/app/api/contact/route.ts`, a POST Route Handler that sends contact-form submissions via **Resend** (`RESEND_API_KEY` / `CONTACT_TO_EMAIL` env vars — see `.env.example`); if `RESEND_API_KEY` is unset it returns a clean 500 instead of crashing. Every page otherwise remains static (SSG).

**The brand is "The Workshop":** the site presents the company as a toolmaker — sturdy, warm, practical, honest about limits. No metaphor costume (an earlier newspaper conceit was removed at the owner's request — do not reintroduce mastheads, datelines, "Sections A–D", "Fig. N", corrections columns, or any editorial framing). The differentiator (telling clients where AI *won't* help) is encoded as content: the refusal list ("What we'll tell you not to buy"), the "Proof — an honest note" card, the week-by-week calendar, and the sold-vs-ships table. Do not invent metrics, stats, or quotes anywhere — honesty is the product.

## Stack

- **Next.js 16** App Router, **React 19**, **TypeScript** (strict). Package manager: npm.
- **Tailwind CSS v4** — configured in CSS, not JS. No `tailwind.config.*`. Theme is wired in [src/app/globals.css](src/app/globals.css) via `@theme inline`, pulling from CSS variables in [src/styles/design-tokens.css](src/styles/design-tokens.css).
- **Fonts:** **Besley** (a Clarendon slab — headlines 500, body 400, italic for quotes/queries) + **Familjen Grotesk** (functional layer: labels, buttons, nav, forms; 400/700). Self-hosted static TTFs in `src/app/fonts/` via `next/font/local` in [src/app/layout.tsx](src/app/layout.tsx) — Google Fonts is unreachable from the build network (TLS interception), so never switch back to `next/font/google`; the same TTFs are read by `opengraph-image.tsx` for satori. Exposed as `--font-serif` / `--font-sans`. **No other fonts. No monospace anywhere. framer-motion, lucide-react, and geist were removed — do not reinstall them.**
- **class-variance-authority** + **clsx** + **tailwind-merge** for variant-driven styling; `cn()` from [src/lib/utils.ts](src/lib/utils.ts).
- Path alias: `@/*` → `src/*`.

## Commands

```bash
npm run dev      # dev server at http://localhost:3000 (Turbopack via Next 16)
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint (flat config, eslint-config-next core-web-vitals + typescript)
```

No test framework, no standalone typecheck — type errors surface via `npm run build` or the editor. Run `npm run lint` (and `npm run build`) after component changes before considering a task done.

## The brand system (v5 — "The Workshop")

### Color — roles, not palette

Tokens live in design-tokens.css and are mapped in globals.css `@theme inline` (add new colors in BOTH places or utilities won't see them).

| Token / utility | Role | Light | Dark |
|---|---|---|---|
| `paper` | the canvas | `#f7f3ea` warm cream | `#16150f` warm brown-black |
| `paper-shade` | card fills, tone bands, table headers | `#eee7d8` (darker than paper) | `#1f1d15` (**lighter** than paper — "shade" means raised) |
| `ink` / `ink-soft` / `ink-faint` | text / secondary / captions+labels | `#221f19` `#5b5443` `#6a6150` | `#f0eade` `#b3aa94` `#9c9280` |
| `rule` | 1px borders and dividers | `#ddd4bf` | `#332f24` |
| `accent` (+`-deep`) | machine green — kickers, links, verified, CTA hover | `#2c614c` (`-deep` = darker) | `#5fae8c` (`-deep` = **brighter**) |
| `refusal-red` | ONLY refusals, "won't help" semantics, error states | `#a63a24` | `#dd7359` |
| `band` / `band-ink` | the page's one emphasis band (`TheRecord`) and the type on it | ink on cream — a true inversion | a raised warm surface, `#2a2719`, type stays cream |

Never hardcode hex in components (sole exception: `opengraph-image.tsx`, satori can't read CSS vars — it stays light-only, as does the print stylesheet). Refusal-red is semantic — if it isn't a refusal or an error, it isn't red.

### Dark theme — two canvases, one identity

Dark is the same workshop after hours: warm brown-blacks, never neutral grey, never `#000`, and the green stays the working color. **Every ratio in the light theme is matched in dark within ~0.5:1** (ink-faint ~6:1 / ~5.5:1, accent ~6.9:1, refusal-red ~5.8:1) — that margin over AA is deliberate, don't spend it.

- **Components never name a theme.** They use the role tokens and flip for free. There are no `dark:` variants anywhere and there should not be — if something needs to differ per theme, it needs a *role pair* (that is what `band`/`band-ink` is: the two themes genuinely want opposite things there, so the section asks for "the emphasis band", not for "ink").
- **Raw values are written once**, as `--l-*` / `--d-*` in design-tokens.css; the two switch blocks below them only re-point roles. Adding a token means the `--l-`/`--d-` pair, **both** switch blocks, and `@theme inline`.
- **How it resolves:** no stored preference → `prefers-color-scheme` (so it follows the OS live, and works with JS off); reader toggled → `[data-theme]` on `<html>` wins, stamped before first paint by the inline script in layout.tsx and persisted in `localStorage.theme`. `color-scheme` is set in CSS, not via the viewport export, so native controls follow the toggle too.
- **The toggle is a word** ("Dark"/"Light"), matching the "Menu"/"Close" convention — not a sun/moon icon, and not a fifth icon. Which word shows is decided in CSS off `[data-theme]`, never in React state, so it is right in the first painted frame with no hydration mismatch and no flash.
- **The nameplate mark** is painted as a CSS mask in `currentColor` (`.site-mark`), not loaded through `next/image` — `public/logo.svg` has no fill of its own and would paint solid black on the dark canvas. Don't revert it to an `<Image>`; don't add a second logo file.

### Type rules (hard bans — these were the diagnosed "AI-site tells")

- **NO letterspaced labels** (`tracking-*` above normal is banned on text), **NO monospace**, **NO uppercase labels/kickers/eyebrows anywhere.**
- Kickers/labels are Familjen Grotesk bold, sentence case, normal tracking (see `Kicker`/`Folio` primitives).
- **No negative letter-spacing on headlines**; Besley medium (wt 500) with normal tracking.
- **No one-accent-colored-word inside headlines.** Headlines are ink.
- Corners: **square (radius 0) everywhere** — buttons, cards, photos, inputs. No `rounded-*`. The owner prefers the squared look; do not reintroduce radii.
- **Keep the tone professional, not preachy.** State the honesty positioning plainly (what we advise against, where we are today) — never as self-congratulatory meta-commentary ("you'll read it here, not before", "the closest thing we have to a sales pitch"). Boxes stay light (1px `rule` border); reserve heavier treatment and refusal-red for genuine emphasis only.

### Layout — minimal; separate with tone and space, not lines

Headline + supporting text + figure + caption, composed asymmetrically. **Separate sections with whitespace (generous `py`) and subtle background-tone shifts (`paper` ↔ `paper-shade` full-bleed bands), not borders.** Rules:
- **No border thicker than 1px, ever.** No `border-2`/`border-t-2`. Buttons and cards included.
- **No dark (`border-ink`) dividers** as separators — the one allowed ink border is the 1px outline Button.
- Use 1px `border-rule` hairlines **only** where a table or list genuinely needs them (the comparison table rows, the FAQ accordion rows). Don't add a `border-t` just to end a section.
- `NewsBox` is a **soft `paper-shade` card with no border** — grouping by tone. Only place it on a `paper` section (a shade card on a shade band has no contrast). The closing CTA is a full `paper-shade` band with its content sitting directly on the tone (no inner card).
- Never "icon + heading + two sentences × 3 identical cards."

### Photography — `PressPhoto`

All photography is free-license documentary imagery of the audience's world (intake trays, filing rooms, loading docks, counters) — never laptops-with-code, never abstract AI, never posed stock, **never 3D renders**. Every photo goes through [PressPhoto.tsx](src/components/ui/PressPhoto.tsx), with **required `caption`** (deadpan, does messaging work) and **required `alt`** (literal description — captions never substitute for alt; check the actual image, alt text has been wrong before). `public/photos/SHOTLIST.md` is the curation list, and every file in `public/photos/` is in use — if a photo has no honest home, delete it rather than parking it.

**Treatment (`.press-photo` in globals.css) is two layers:** a light grade, then a **`--color-paper` veil laid over the image**. The veil is what stops photos reading as pasted-in blocks, and because it is the paper token it reverses with the theme for free — on cream it *lifts* the deepest blacks into the page's value range; on the dark canvas it *damps* a bright photograph that would otherwise glare. Strength and grade are both theme tokens (`--l-photo-*` / `--d-photo-*`): dark additionally dims the image, since there is no lifting to do when the page itself is the dark thing. Numbers were set by eye against both a uniformly bright subject and a moody one — re-check both before changing them. `.press-photo--dense` is the one knob for near-black sources (stronger on cream, weaker on dark).

(An earlier version also multiplied the whole image by the paper colour. That cream multiply was the "beige" — it tinted every photo onto the canvas hue — and it is gone. Don't reintroduce it.)

**The hero render is the one exception, and it inverts in dark.** `particles.jpg` is a studio shot on a seamless backdrop that *is* the light theme's cream — which is precisely why the hero has no visible edges in light: the picture's background is the page, and the left-edge dissolve finishes it. In dark that becomes a cream slab dissolving into nothing. Dimming cannot fix it (the slab just goes grey) and neither can multiply/screen (the subject is mid-tone on a light ground, so blends either crush it or keep the backdrop). The only treatment that addresses the real problem is `invert(1) hue-rotate(180deg)` — flip the values, rotate the hues back — which turns the backdrop into a warm dark field and leaves the orange orange. It lives in the `--*-photo-hero-*` token set, scoped onto `.press-photo--hero` so the develop keyframe inherits it. Accepted knock-ons, both checked in context: the white wireframe becomes a dark cage, and the dense black particle cluster becomes a light one (it reads as a light source inside the cube). `brightness(0.78)` is where the inverted backdrop meets the page — lighter and it reads as a lit panel sitting *on* the page. **This applies to this image because of what it is; don't generalise inversion to the documentary photos** — inverting a filing room would be nonsense.

**Layout: a photo always ends at the viewport, never at a border.** Two arrangements, both in [PressPhoto.tsx](src/components/ui/PressPhoto.tsx):
- `aspect="band"` + `bleed` — a full-bleed horizontal band (capped at 1600px, caption returning to the page grid). Used on About. Page architecture, in the same vocabulary as the tone bands.
- `aspect="column"` + `captionOnPlate` — the tool pages (`/solutions/[slug]`): the photo sits in the hero beside the h1 and bleeds off the **right** edge of the screen (`lg:mr-[calc(50%-50vw)]`), with the caption lifted onto a **paper plate** straddling its bottom-left corner. That plate is the site's "text over image": the words sit on paper, never on the photograph, so contrast is guaranteed by construction — **no scrim, ever**. That construction is also what makes the plate survive the dark theme unchanged: it is `bg-paper`/`text-ink`, so it inverts with the page, where a scrim tuned for cream would have needed a second version. The plate must be `relative`, or it paints *under* the image it overlaps.

**Do not reintroduce the centered container-width 16:10 box** — that was what made photos look pasted in. Edges stay **crisp**: perimeter feathering and bottom-dissolves were both tried and both read as soft-focus mush. The only dissolve is the home hero's directional left-edge mask (`.press-photo--hero`).

The caption is the line that does the messaging work — on the tool pages it is set large in Besley italic, not tucked underneath as grey metadata. It stays a real `figcaption`.

**Source files:** keep ~2000–2560px wide (bands are wide slots — 1600px sources go soft on large monitors), ~≤350KB. **Never downscale a source in place** — `archive.jpg`'s original was destroyed that way and is unrecoverable; write to a new file instead.

**Replacing a photo at an existing path serves the OLD image.** `next/image` caches optimized output keyed by source path, not content (`.next/cache/images`, 4h TTL), so dropping a new file at the same name keeps rendering the previous one. `rm -rf .next/cache/images` and restart the dev server.

### Motion policy — tools don't decorate

Exactly three permitted moments, all reduced-motion-gated, all CSS: (1) hero photo warms in once on load (`.press-photo--develop` — on cream it develops down from a washed-out print, on the dark canvas it develops *up* out of the dark), (2) the FAQ accordion (`.notice-panel` grid-rows), (3) link underline thickens on hover (`.press-link`). **No scroll-triggered reveals, no stagger choreography, no ripples, no springs. Do not reinstall framer-motion.**

The theme flip is **not** a fourth moment: it is an instant swap, deliberately un-animated. Don't add a cross-fade to it.

## Architecture

### Content lives in `src/lib`, not in components

- [src/lib/constants.ts](src/lib/constants.ts) — `SITE_NAME`/`SITE_URL`/`SITE_DESCRIPTION`, `NAV_LINKS`, `TRUSTED_BY`, `SOLUTIONS` (four offerings; `outcome` lines are the section-teaser headlines). Section letters are derived by index (A–D).
- [src/lib/solutionDetails.ts](src/lib/solutionDetails.ts) — long-form per-solution copy keyed by slug.
- [src/lib/faqs.ts](src/lib/faqs.ts) — `FAQS` (rendered as "Notices").
- [src/lib/refusals.ts](src/lib/refusals.ts) — the Refusal Column entries ("What we'll tell you not to buy"). Policy voice only — never imply fabricated engagements.
- [src/lib/engagement.ts](src/lib/engagement.ts) — the week-by-week engagement timeline (replaces any generic Discover/Design/Build/Scale process).
- [src/lib/seo.ts](src/lib/seo.ts) — `constructMetadata()` + JSON-LD builders (Organization in layout, FAQPage on home, Service + BreadcrumbList on `/solutions/[slug]`). `sameAs` stays `[]` until real profiles exist.

### Routing

Pages: `/` (front page), `/about`, `/solutions`, `/solutions/[slug]` (SSG via `generateStaticParams` over `SOLUTIONS`), `/contact`. Route files: `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `api/contact/route.ts`. Convention: `page.tsx` is a server component owning metadata via `constructMetadata()`; interactive UI lives in co-located client components. Most components are server components now — add `"use client"` only where there's state (Navbar menu, Notices accordion, contact form).

### UI primitives — `src/components/ui`

- [print.tsx](src/components/ui/print.tsx) — the kit: `Rule` (hairline/heavy divider), `Kicker` (accent-green Familjen bold, sentence case), `Folio` (small bold label; `as="h2"` when it heads content), `Headline`, `Deck`, `NewsBox` (2px ink-border rounded card), `Caption`. Build sections from these; don't hand-roll.
- [PressPhoto.tsx](src/components/ui/PressPhoto.tsx) — see Photography above.
- [Button.tsx](src/components/ui/Button.tsx) — cva variants `primary` (solid ink → accent hover) / `outline` / `link`; `rounded-md`, no motion. Polymorphic (button / internal Link / external a).
- [Container.tsx](src/components/ui/Container.tsx) — width wrapper (`narrow`/`default`/`wide`).

### Icons — four, and only these

[src/components/ui/icons.tsx](src/components/ui/icons.tsx) holds one small line mark per offering (`TOOL_ICONS`, keyed by slug), shown beside the tool name in the home "What we build" rows. Geometry follows Lucide (ISC-licensed) but **redrawn square** — the source ships rounded corners and round caps, this brand has none. Stroked in `currentColor`; never filled.

The `lucide-react` package stays uninstalled — four vendored marks don't warrant a dependency. This is **not** licence to start decorating: the "icon + heading + two sentences × 3 identical cards" pattern is still banned, and no other section gets icons without the owner asking. The theme toggle is a word for exactly this reason — a sun/moon pair would have made it five.

### Figures — removed, deliberately

There are **no drawn figures/diagrams on the site.** `src/components/vignettes/` (the four SVG product illustrations) was deleted at the owner's request: hand-drawn SVG diagrams never reached a standard he'd ship ("not perfect enough"). Several directions were tried — flowchart/bar-chart/matrix, then a "workshop drawing" set with a drafting grid — and all were rejected.

**Do not reintroduce SVG figures, diagrams, charts, or spot illustrations** unless the owner explicitly asks. The tools are carried by type, whitespace and photography instead. The sections that used to host a figure (home teasers, `/solutions` rows, detail hero) are now two-column *type* layouts: the promise on the left, what it actually is on the right.

## Conventions

- Reference colors through token utilities (`bg-paper`, `text-ink-soft`, `border-rule`, `text-press-blue`, `text-refusal-red`) or `var(--color-*)` — no hex in components (except `opengraph-image.tsx`, documented there).
- Every route exports metadata via `constructMetadata()` (title, description, canonical, OG).
- Semantic HTML: the masthead is NOT a heading; each page's `h1` is its headline; heading order is strict; photos use `figure`/`figcaption`; real alt text always.
- Copy tone: blunt, plain-spoken, anti-hype. Never "cutting-edge", "seamless", "empower", "unlock", "transform". Prefer stating what we refuse over praising what we sell.

## How to work

- For multi-file changes, propose a plan first.
- Prefer editing existing components over creating parallel ones.
