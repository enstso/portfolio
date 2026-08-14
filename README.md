# enstso.com portfolio

Recruiter- and client-facing portfolio for Enstso JANVIER, built with Next.js, React, TypeScript and Tailwind CSS.

The public experience is statically rendered and centers on software engineering, AI and agentic systems, data, cloud/platform engineering, and product-aware technical delivery. Featured and additional project data is curated locally, so public pages do not depend on Prisma, a GitHub token, or a live database.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Verification

```bash
npm run lint
npm run type-check
npm run build
```

## Deployment

Production is deployed directly from the GitHub repository with Coolify. Coolify builds the application from the root `Dockerfile` and manages deployment configuration and environment variables; no GitHub Actions or Kubernetes cluster is required.

## Environment

Copy `.env.example` and provide server-only values for authenticated administration. `GITHUB_TOKEN` is optional and is used only by the protected, explicit project-archive synchronization operation.

Public project content lives in:

- `lib/data/featuredProjects.ts`
- `lib/data/additionalProjects.ts`

The Blog route currently redirects home and is intentionally excluded from navigation and search indexing until real articles are available.
