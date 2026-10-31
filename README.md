# Clicker Save Forge

Next.js App Router, TypeScript, Bootstrap 5 and Node.js. Edits gold, Hero Souls and rubies in Unity-format Clicker Heroes saves.

## Run

Use Node.js 20.9+ (Node 24 recommended).

```sh
npm install
npm run dev
```

Open http://localhost:3000. Paste or upload a save, set amounts, boost, then copy or download the result. Back up your original first. Output encoding is checked, but game-specific limits and import acceptance are not guaranteed.

## Vercel

Import this GitHub repository into Vercel, select Next.js, and deploy. No environment variables or database required. `npm run build` builds production; `npm start` serves it.

Saves are sent to the app's Node.js API route for processing. They are not stored or logged by application code. Only gold, heroSouls and rubies change. Unity format uses a fixed prefix followed by base64 raw DEFLATE JSON; see https://github.com/egoroof/clicker-heroes-save-decoder for format reference. Legacy Flash saves are unsupported.
