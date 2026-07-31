# Photos — placement & credits

Every image in use is now **generated** (ElevenLabs — `google-nano-banana-pro`
for stills, `seedance-2-0` for the loop), written to the same documentary brief
the stock set was chosen against: the audience's world, no laptops or code, no
abstract AI, no posed styling, no renders. No stock photography is left in the
folder. Each image is rendered through `<PressPhoto>` or, for the CTA, as a
faint background texture.

Full-resolution masters (5504px PNG) live **outside the repo** at
`../_masters/`; only the downscaled JPGs below ship.

Every file in this folder is in use. There is no "spare" imagery: if a photo
has no honest home, it gets deleted rather than parked here.

## In use

| File | Where | Subject |
|---|---|---|
| `hero-wall.jpg` | Home hero — full bleed, the whole first screen, the copy set directly on it | **Generated** (ElevenLabs, google-nano-banana-pro) to a brief written for this job: bare plastered wall across the left two-thirds, shelving of tied bundles at the right edge, flat even light, narrow tonal range, no deep blacks. Shipped at 2560px (the only full-viewport image), 270KB. Takes `.press-photo--backdrop`. Master at `../_masters/`. |
| `towers-loop.mp4` / `.webm` | About — full-bleed band under the hero, silent loop; takes the `warm` knob | **Generated** (ElevenLabs, seedance-2-0), then crossfade-looped and re-encoded. 4K HEVC master lives outside the repo at `../_masters/`. |
| `towers-loop-poster.jpg` | Poster frame for the band above | First frame of `towers-loop.mp4` |
| `binders.jpg` | Solutions → AI Assistants | **Generated.** Shelved ring binders, one folder leaning out. A wall, not a corridor — a corridor would have repeated the home hero. |
| `intake.jpg` | Solutions → Workflow Automation | **Generated.** Wire letter trays heaped with forms, pigeonhole rack behind. |
| `drawers.jpg` | Solutions → Business Intelligence | **Generated.** Index-card drawers receding down a room, one pulled open. Makes the caption ("opening the right drawer") literal. |
| `table.jpg` | Solutions → AI Strategy | **Generated.** Empty meeting table, plans and papers at the near end. |

The per-solution mapping lives in `SOLUTION_PHOTOS` in
[src/lib/constants.ts](../../src/lib/constants.ts), including each photo's
`objectPosition` crop.

## How photos sit on the page

Documentary photos are **full-bleed horizontal bands** — viewport edge to edge,
short (`aspect="band"`), with the caption returning to the page grid. They are
page architecture, in the same vocabulary as the paper/paper-shade tone bands.
The centered, container-width 16:10 box was the thing that made photos read as
"pasted in"; don't reintroduce it.

Edges stay **crisp**. Perimeter feathering and bottom-dissolves were both tried
and both read as soft-focus mush. The site's only dissolve is the hero's, and
it is directional. What actually integrates a photo is its *values*: the grade,
the paper multiply, and above all the paper "lift" layer (`.press-photo` in
globals.css) — a multiply can only darken, so without the lift a dark photo
can never sit in a cream page's value range.

## Deleted (do not restore)

- `loading-dock.jpg` — briefly used as a band on the solutions index; cut at the
  owner's request. The page carries itself on type.
- `stamps.jpg` — posed studio product shot, monochrome, covered in legible
  third-party trademarks (Trodat, Superior Stamp & Sign). Someone else's brands
  on our page.
- `cubicles.jpg` — a 3D render, not a photograph. The rule is documentary only.
- `_unused-figure.jpg`, `_unused-robot.jpg` — glowing-AI and robot clichés.
- `particles.jpg` — the old home hero: a particle field in a wireframe cube, the
  one abstract-AI image on the site. Replaced as hero, and with it went the
  inversion treatment (it existed only because that render sat on a cream
  backdrop) and the left-edge dissolve.
- `records-hero.jpg` — the records-corridor hero that replaced it. Held the
  right two-fifths of a split hero for one iteration; retired when the hero
  became a single full-bleed backdrop with the copy on it, which needs a flat
  wall to sit on rather than a receding corridor.
- `towers.jpg` — the About band's still, replaced by `towers-loop`. Kept for a
  while as the poster's ancestor; the poster is its own file, so it was spare.
- `files.jpg`, `forms.jpg`, `archive.jpg`, `office.jpg` — the stock set the four
  generated solution photos replaced. Each failed the band on its own terms:
  `files` and `forms` were cold, flat and near-frontal (and `forms` was portrait,
  so the wide slot could barely use it), `archive` was a dark frontal texture
  with no room or light in it, and `office`'s teal cubicles fought both the warm
  palette and the accent green.

## Generating a replacement

The four solution stills came from one prompt spine: a documentary photograph of
the named subject, one warm daylight source from a side window with real falloff,
warm cream/ochre/brown palette, 35–40mm at f/2.8–4, nobody present, fine grain —
then an explicit avoid-list (legible text, brand marks, people, screens or
laptops, CGI look, HDR glow, teal-orange grading, flare, vignette, stock-photo
polish). Compose for the crop: the band is roughly **3.4:1** on desktop, so the
subject has to live in the middle horizontal third of a 16:9 generation.

## File size

Keep sources ~2400px wide and ≤350KB — bands are wide slots, and 1600px goes
soft on a large monitor. `next/image` re-encodes to AVIF/WebP at request time,
but the raw files ship in the repo and the build. The current set was made with
sharp: `resize({ width: 2400 })` + mozjpeg q84, which lands all four at
254–339KB. Never downscale a source in place — write to a new name.
