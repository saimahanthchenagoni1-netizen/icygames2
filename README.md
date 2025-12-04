<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1aZ6sEvzHL4r0tpryxIA_FzWIGQ_hGYXg

## Run Locally

**Prerequisites:** Node.js

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env` and set your `API_KEY` value locally (do not commit `.env`):
   `cp .env.example .env`
3. Run the app:
   `npm run dev`

## Deploy to Vercel

1. Push your repository to GitHub.
2. In the Vercel dashboard, import your GitHub project.
3. Set the environment variable `API_KEY` in Vercel's Settings > Environment Variables (do NOT commit secrets to GitHub).
4. Vercel will detect the project and run `npm run build` automatically. The `vercel.json` in this repo sets the output directory to `dist`.

Notes:
- The `.env` file is ignored by `.gitignore`. Use the Vercel dashboard to configure production env variables.
- If you want to use a different AI provider, update `services/geminiService.ts` accordingly.
