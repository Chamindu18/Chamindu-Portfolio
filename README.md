# Chamindu Hansana — Portfolio

A responsive, animated portfolio showcasing my projects, technical skills, courses, and certificates as a Computer Science undergraduate and full-stack developer.

**Live site:** [chamindu18.github.io/Chamindu-Portfolio](https://chamindu18.github.io/Chamindu-Portfolio/)

---

## Features

- **Pages:** home, all projects, and all courses and certificates
- **Project showcase:** six featured projects on the homepage and eight projects in the complete collection, covering full-stack web development, mobile applications, a browser game, and UI/UX design
- **Courses and certificates:** eight featured entries on the homepage and fourteen in the complete collection
- **Orbital canvas background** with animated rings, particles and a moving blob (lighter and throttled on phones, paused to a still frame when the system asks for reduced motion)
- **Custom cursor** on desktop only (automatically disabled on touch devices)
- **Responsive layout** for phones, tablets and desktop, with an accessible mobile menu
- **Scroll reveal animations** using the Intersection Observer API
- **Working contact form** using Web3Forms (AJAX, no page reload, inline success and error messages)
- **Dark theme** with orange accents

## Featured projects

| Project | Focus | Repository |
|---|---|---|
| **CampusX** | Student marketplace and dorm discovery platform built with Next.js, TypeScript, Prisma and PostgreSQL | [GitHub](https://github.com/Chamindu18/Campusx) |
| **SeatWatch** | Software license management MVP with employee assignments, idle-license detection, estimated spending analytics and role-based access control | [GitHub](https://github.com/Chamindu18/Saas-optimizer) |
| **TalentFlowOS** | Recruitment and talent management platform using ASP.NET Core, React and Clean Architecture; contributed to authentication and authorization | [GitHub](https://github.com/Chamindu18/TalentFlowOS) |
| **PetCare+** | Flutter and Firebase pet care application; contributed to authentication and related application workflows | [GitHub](https://github.com/Chamindu18/petcare) |
| **Task Management System** | Spring Boot and React application; contributed to JWT authentication and frontend authentication integration | [GitHub](https://github.com/Chamindu18/task-management-system) |
| **Sentinel Defense** | Browser tower defense game using JavaScript, HTML5 Canvas and Web Audio API | [GitHub](https://github.com/Chamindu18/sentinel-defense) |

The full [Projects page](projects.html) also includes my portfolio website and LifeLink SL UI/UX prototype. Team project descriptions distinguish my contributions from the overall work of the group.

## Courses and certificates

The [Certificates page](certificates.html) lists fourteen courses, certificates and learning experiences. Recent additions include:

- **Software Engineer Intern — Role Certification**, HackerRank (November 2026)
- **Authentication and Authorization for Web/API (LFEL1004)**, The Linux Foundation (November 2026; course completion)

Other learning areas include AWS and DevOps fundamentals, Agile, databases, AI tools, and English proficiency. Course-completion certificates are not represented as professional certification exams or employment experience.

## Tech stack

| Category | Technologies |
|---|---|
| Frontend | HTML5, CSS3, JavaScript (ES6+) |
| Animation | Canvas API, CSS keyframes, Intersection Observer |
| Fonts | Google Fonts (Syne, DM Mono, Instrument Serif) |
| Forms | Web3Forms |
| Hosting | GitHub Pages |

## Project structure

```text
Chamindu-Portfolio/
├── index.html
├── projects.html
├── certificates.html
├── css/
│   └── style.css
├── js/
│   ├── main.js           # cursor, navigation, menu, reveal animations, form
│   └── canvas.js         # animated background
└── assets/
    ├── Chamindu_Hansana_CV.pdf
    ├── profile.jpeg
    ├── projects/         # project screenshots, including seatwatch.png
    └── certificates/     # certificate images, including SEintern.png and webAPI.png
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
