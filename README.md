# JB Test — Juicebox Onboarding

A seven-slide interactive onboarding project built with **Next.js 16 App Router**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Swiper**, **Lenis**, **GSAP**, and **Lottie React**.

## Requirements

- Node.js **20.9 or later**
- npm
- No API key, database, or `.env` file is required to run the current project

## Run locally

Open a terminal in the project directory, install dependencies from `package-lock.json`, and start the development server:

```powershell
cd C:\Users\Syawal\projects\assignment\jb-test
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). If port 3000 is already in use, choose another port:

```powershell
npm run dev -- -p 3001
```

Then open [http://localhost:3001](http://localhost:3001). Press `Ctrl+C` in the terminal to stop the server.

Use `npm install` instead of `npm ci` if you have changed dependencies and need to update `package-lock.json`.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run lint` | Check the code with ESLint |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build after `npm run build` |
| `npx tsc --noEmit` | Check TypeScript manually; `package.json` does not currently define a `typecheck` script |

To try the production build locally:

```powershell
npm run build
npm run start
```

## Onboarding flow

1. **Slide 1:** introduction and orb artwork.
2. **Slides 2–4:** text gradually changes from gray to white as you scroll inside the slide. Lenis handles the internal scrolling, and GSAP controls the word animation.
3. **Slide 5:** name form, requiring at least three characters.
4. **Slide 6:** email form with client-side format validation.
5. **Slide 7:** completion message using the name entered in the form.

Use the on-screen buttons to move between slides. Back and restart controls appear in the header. Horizontal Swiper gestures are currently disabled; vertical scrolling on slides 2–4 drives the text animation.

The name and email are stored temporarily in React Context. **There is no persistent storage or server submission.** Reloading the page resets the form data and onboarding position.

## Project structure

```text
app/
  page.tsx                    Main page and context provider
  layout.tsx                  Metadata, local fonts, and base layout
  globals.css                 Tailwind import, theme, and global CSS rules
components/
  Onboarding.tsx              Slide navigation, validation, and main animations
  ScrollRevealText.tsx        Lenis scrolling and word color animation
  Background.tsx              Background image layers
  OrbImage.tsx                Orb artwork and Lottie overlay
  Slides/                     Introduction, walkthrough, form, and completion slides
context/MainContext.tsx       Slide, name, email, and validation state
lib/constants.ts              Walkthrough text and feature copy
assets/                       Backgrounds, orb, Lottie JSON, icons, and logo
fonts/                        Local fonts loaded with next/font/local
```

Background and orb images are imported directly from `assets/`; they are not served through `public/assets/` URLs. The local fonts are PP Agrandir, Bagoss, and Sohne. Tailwind color and typography tokens are defined in `app/globals.css`.

## Animation and customization

- **Swiper** renders seven slides with a fade transition.
- **Lenis + GSAP** reveal words on slides 2–4. Scroll inside the text area to see the colors change.
- **GSAP** changes the orb size and background opacity. `bg-main.png` appears while slide 2 is active; `bg-intro.png` is the base layer on the other slides.
- **Lottie React** uses `assets/JB2G_Lottie.json` for the overlay shown during the form and completion steps.
- The **reduced motion** preference removes the Swiper transition duration and immediately displays all walkthrough words in white.

Edit `lib/constants.ts` to change the walkthrough text. To replace images or the Lottie animation, update files in `assets/` or the imports in `components/Background.tsx` and `components/OrbImage.tsx`. Slide layouts are in `components/Slides/`.

## Troubleshooting

- **Port 3000 is in use:** run `npm run dev -- -p 3001` and open the matching port in your browser.
- **An image or font is missing:** check that filenames in `assets/` and `fonts/` match their import paths, including letter case.
- **The text color does not change:** scroll within slides 2–4. With reduced motion enabled, all words are white immediately.
- **The form clears after a refresh:** form data is currently kept only in browser memory.
