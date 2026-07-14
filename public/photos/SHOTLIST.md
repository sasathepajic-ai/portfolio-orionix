# Photos — placement & credits

All images are free under the Unsplash License (commercial use, no attribution
required — credits kept here anyway). Each is rendered through `<PressPhoto>`
(warm workshop treatment) or, for the CTA, as a faint background texture.

Every file in this folder is in use. There is no "spare" imagery: if a photo
has no honest home, it gets deleted rather than parked here.

## In use

| File | Where | Subject |
|---|---|---|
| `particles.jpg` | Home hero (left edge dissolves into paper) | Particle field in a wireframe cube (Google DeepMind) |
| `curve.jpg` | CTA band background (faint texture) | Curved façade (Ben Wicks) |
| `towers.jpg` | About — full-bleed band under the hero | Office towers from below (Sean Pollock) |
| `files.jpg` | Solutions → AI Assistants | Tied stacks of paper files (Sear Greyson) |
| `forms.jpg` | Solutions → Workflow Automation | Printed intake forms (Rayia Soderberg) |
| `archive.jpg` | Solutions → Business Intelligence | Wall of wooden archive drawers (Kimak Kimbek) |
| `office.jpg` | Solutions → AI Strategy | Open-plan office of empty desks (Kate Sade) |

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

## File size

Keep sources ≤1600px and roughly ≤350KB. `next/image` re-encodes to AVIF/WebP
at request time, but the raw files ship in the repo and the build, so downscale
before committing (the originals here ran up to 9000px / 4.6MB).
