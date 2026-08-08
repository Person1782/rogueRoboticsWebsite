# Rogue Robotics Website

This repository is now a static website for GitHub Pages deployment.

## What is included

The site presents Rogue Robotics with the following static pages:

- Home page: [index.html](index.html)
- About page: [about.html](about.html)
- Community page: [community.html](community.html)
- Sponsorship page: [sponsor.html](sponsor.html)

The styling lives in [static/style.css](static/style.css) and the image assets are kept in the [pictures](pictures) directory.

## What was removed

The site no longer depends on Flask, a SQLite database, CS50, admin login routes, session-based admin access, or server-side contact message storage.

## GitHub Pages deployment

Because this is a static website, you can publish the repository root directly as a GitHub Pages site.

Typical GitHub Pages flow:

1. Push these files to a GitHub repository.
2. In GitHub, open Settings → Pages.
3. Choose the branch to deploy from, usually `main`.
4. Use the root folder as the Pages source.

The site can also be tested locally with a static HTTP server:

python3 -m http.server 8000

Then open http://localhost:8000 in a browser.