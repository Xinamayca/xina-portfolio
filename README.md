# Xinamayca de Cuba — Portfolio

Personal portfolio website for Xinamayca de Cuba, an ICT & Media Design student at Fontys (Eindhoven). It's a static site built with plain HTML, CSS and JavaScript, with scroll animations powered by [GSAP](https://gsap.com/).

## Pages

| Page | Description |
| --- | --- |
| [`index.html`](index.html) | Main page. It has three scrolling sections: **Home** (an animated "XINA" logo), **Work** (the project list) and **About Me**. |
| [`terra.html`](terra.html) | Case study: **Terra**, a field app and staff dashboard for the Humber Arboretum (Global Acting in IT minor, Feb – Jun 2026). Content still to be added. |
| [`spoiler-alert.html`](spoiler-alert.html) | Case study: **Spoiler Alert!**, a Flutter app that warns you when food is about to expire (Semester 4). Includes prototype and app demo videos. |
| [`archive/go-it.html`](archive/go-it.html) | Archived case study: rebranding Xtreme Computers into **Go IT** (Semester 3). Not linked from the site anymore. |

The third project listed on the home page, **Hear Me Art**, doesn't have its own page yet.

## Project structure

```
xina-portfolio/
├── index.html                  # Home / Work / About Me
├── terra.html                  # Terra case study
├── spoiler-alert.html          # Spoiler Alert! case study
├── archive/
│   └── go-it.html              # Archived Go IT case study (not linked from the site)
├── css/
│   └── styles.css              # Shared styles for all pages (incl. @font-face rules)
├── js/
│   ├── script.js               # GSAP ScrollTrigger animations for index.html
│   └── slideshow.js            # Slideshow + full-screen image modal for case study pages
└── assets/
    ├── fonts/                  # Horst Blackletter
    ├── icons/                  # Tool and social icons (Figma, XD, Illustrator, Trello, Flutter, LinkedIn)
    │   └── favicon/            # Tab icon, iPhone/Android home-screen icons, web manifest
    ├── images/
    │   ├── home/               # Images for the Home and Work sections
    │   └── about/              # Portrait and separator shape for About Me
    ├── projects/
    │   ├── terra/              # Terra images and videos
    │   ├── spoiler-alert/      # App images
    │   │   └── videos/         # Prototype and Flutter app demos
    │   └── opinion-week/       # Opinion Week app (Shift) screens
    └── archive/                # Images not currently used on the site
        └── go-it/              # Archived Go IT logo, mockups and brand guide (b-01 … b-12)
```

### Conventions

- Put each new project's files in their own folder under `assets/projects/<project-name>/`.
- Name files in lowercase with hyphens (`website-home.png`, not `Home Page.png`). Web hosts such as GitHub Pages are case-sensitive, and spaces in file names need escaping.
- The HTML pages stay at the top level of the repo, so their URLs stay short and links between pages don't change.
- `styles.css` lives in `css/`, so any paths inside it start with `../` (e.g. `url('../assets/fonts/…')`).

## Running locally

You don't need a build step. Either:

- open `index.html` directly in a browser, or
- serve the folder so that the videos and fonts load the same way they will online:

  ```bash
  python -m http.server 8000
  # then visit http://localhost:8000
  ```

  (The VS Code **Live Server** extension also works.)

An internet connection is required for:

- GSAP 3.12.5 and ScrollTrigger (loaded from jsDelivr)
- Adobe Fonts (Typekit kit `nid8ici`)
- the Helvetica `@font-face` loaded from an external URL in `css/styles.css`

## Editing content

- **Add a project:** copy one of the `.project-item` blocks in `index.html` (title, then `.project-date`, then `.project-desc`). Use one of the case study pages as a template for its own page.
- **Slideshow images:** each case study page has `.slide` elements inside `#slideshow`. `js/slideshow.js` picks them up automatically: slides advance every 3 seconds, pause on hover, and open full-screen on click.
- **Animations:** all scroll animations are in `js/script.js`.

## Deployment

The site is fully static, so it can be hosted on any static host. To use **GitHub Pages**, go to *Settings → Pages* and publish from the `main` branch (root folder). `index.html` is at the top level, so the site opens at the main Pages URL.

## Contact

[LinkedIn — Xinamayca de Cuba](https://www.linkedin.com/in/xinamayca-de-cuba-067176293/)
