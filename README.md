# Chamindu Hansana — Portfolio

A responsive, animated portfolio for a Computer Science undergraduate and full-stack developer.

**Live site:** [chamindu18.github.io/Chamindu-Portfolio](https://chamindu18.github.io/Chamindu-Portfolio/)

---

## Features

- **Pages:** home, all projects, and all courses and certificates
- **Orbital canvas background** with animated rings, particles and a moving blob (lighter and throttled on phones, paused to a still frame when the system asks for reduced motion)
- **Custom cursor** on desktop only (automatically disabled on touch devices)
- **Responsive layout** for phones, tablets and desktop, with an accessible mobile menu
- **Scroll reveal animations** using the Intersection Observer API
- **Working contact form** using Web3Forms (AJAX, no page reload, inline success and error messages)
- **Dark theme** with orange accents

## Tech stack

| Category | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| Animation | Canvas API, CSS keyframes, Intersection Observer |
| Fonts | Google Fonts (Syne, DM Mono, Instrument Serif) |
| Forms | Web3Forms |
| Hosting | GitHub Pages |

## Project structure

```
Chamindu-Portfolio/
├── index.html
├── projects.html
├── certificates.html
├── css/style.css
├── js/
│   ├── main.js        # cursor, navigation, menu, reveal animations, form
│   └── canvas.js      # animated background
└── assets/
    ├── Chamindu_Hansana_CV.pdf
    ├── profile.jpeg
    ├── projects/      # project screenshots
    └── certificates/  # certificate images
```

## Run locally

No build step is needed. Serve the folder with any static server:

```bash
git clone https://github.com/Chamindu18/Chamindu-Portfolio.git
cd Chamindu-Portfolio
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Contact

**Chamindu Hansana** · chamindu553@gmail.com · [LinkedIn](https://www.linkedin.com/in/chamindu-hansana-a0b39a362/) · [GitHub](https://github.com/Chamindu18)