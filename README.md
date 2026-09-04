# MathsWatch

A small collection of classic browser games, built with plain HTML, CSS, and vanilla JavaScript — no frameworks, no build step, no external dependencies or CDN calls. Everything runs entirely client-side in a single page load, so it works offline once loaded.

## Topics

- Sequences (Snake)
- Powers of Two (2048)
- Grids & Lines (Tic-Tac-Toe, vs CPU or 2-player)
- Vectors & Angles (Pong, vs CPU)
- Fractions (Breakout)
- Factor Pairs (Memory Match)
- Probability (Minesweeper)
- Projectile Motion (Flappy Bird)

## Running locally

Just open [index.html](index.html) in a browser, or serve the folder with any static file server:

```bash
npx serve .
```

## Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In the repo settings, go to **Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`, pick the `main` branch and `/ (root)` folder.
4. Save — GitHub will publish the site at `https://<username>.github.io/<repo>/` within a minute or two.

A ready-made GitHub Actions workflow is also included at [.github/workflows/pages.yml](.github/workflows/pages.yml) if you'd rather deploy via Actions (set Pages **Source** to `GitHub Actions` instead).

## Project structure

```
index.html          landing page / topic menu
style.css            shared styling
topics/
  sequences/
  powers/
  geometry/
  vectors/
  fractions/
  factors/
  probability/
  projectiles/
```

Each topic is a self-contained `index.html` + `.js` file pair that only references the shared `style.css`.
