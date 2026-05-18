# ClearPath

A mental firewall against cognitive bias. Describe a decision — ClearPath surfaces the three biases most likely distorting your thinking and forces a 60-second pause before you act.

GmanFooFoo side-project. v0.1 prototype.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS 4
- Vercel AI SDK + Anthropic Claude Sonnet 4.5
- Zod for structured AI output
- Vercel deployment

## Local development

```bash
cp .env.example .env.local
# fill in ANTHROPIC_API_KEY
npm install
npm run dev
```

Open http://localhost:3000.

## Deployment

```bash
vercel env add ANTHROPIC_API_KEY production
vercel env add ANTHROPIC_API_KEY preview
vercel deploy --prod
```

## v0.1 scope

- Single page, three states (input → analyzing → veto).
- 18 verified cognitive biases bundled as static JSON.
- No auth, no persistence, no tracking — anonymous use.
- 60-second timer enforces the Friction-by-Design pause before any action.

## Roadmap

- v0.2 — Decision-Cemetery (auth + Vercel Postgres), expand to full Dobelli 52.
- v0.3 — Strategic Deep-Dive (5-Gate workflow).
- v0.4 — Pre-Mortem Generator + voice input.
- v1.0 — Team-mode + Obsidian-Sync.

Detailed spec + roadmap live in `omnopsis-planning/docs/superpowers/specs/2026-05-18-clearpath-52-design.md` and `roadmap-clearpath-52.md`.
