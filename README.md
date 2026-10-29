# enstso.com

Personal engineering portfolio and technical writing platform for Enstso Janvier. The application uses Next.js App Router, TypeScript, Tailwind CSS, PostgreSQL and Prisma, and remains compatible with Docker standalone output and Coolify.

## What is included

- Editorial portfolio pages for Home, Work and About
- Responsive light and dark themes
- Public technical writing at `/blog` and `/blog/[slug]`
- Secure Markdown rendering with syntax highlighting, code copy and tables of contents
- Protected browser-based article studio at `/admin/articles`
- Draft, private preview, publish, edit, unpublish and delete lifecycle
- Published-article metadata, `BlogPosting` structured data, sitemap entries and RSS
- Static portfolio fallbacks when PostgreSQL is unavailable

Legacy `/article/[id]` links redirect to the corresponding published slug. Drafts never appear in public article queries, the sitemap or RSS.

## Local development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env.local` and provide server-only values.

3. Apply reviewed migrations to the configured PostgreSQL database:

   ```bash
   npm run db:migrate
   ```

4. Start the application:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000). Existing admin credentials stored in PostgreSQL continue to work at `/login`.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `DATABASE_URL` | Yes for writing/admin | PostgreSQL connection used by Prisma |
| `JWT_SECRET_KEY` | Yes for admin | Long random secret used to sign secure session cookies |
| `GITHUB_TOKEN` | No | Protected project archive synchronization only |

Do not expose these values through `NEXT_PUBLIC_` variables.

## Database migration safety

The migration in `prisma/migrations/20261028230000_article_publishing` is additive. It:

- adds publication fields, ownership and stable slugs;
- assigns deterministic slugs to legacy articles;
- keeps every legacy article in `DRAFT` state;
- adds indexes and the suggested article categories;
- does not delete or reset existing data.

Review and back up the production database before applying a migration. Use `prisma migrate deploy` (or `npm run db:migrate`) in production. Do not use `prisma migrate reset` or `prisma db push` against production.

## Coolify deployment

Coolify should continue building from the root `Dockerfile`. The application keeps `output: "standalone"`; no Vercel-specific service or persistent container filesystem is required.

Recommended deployment sequence:

1. Back up PostgreSQL.
2. Build and deploy the Docker image. The production container runs `prisma migrate deploy` before starting Next.js, applying only migrations that have not yet been recorded in the target database.
3. Verify `/blog`, `/admin/articles` and one published article.

The runtime image includes the Prisma CLI and `prisma/migrations` specifically for this startup migration step. If an existing portfolio database predates Prisma Migrate, startup first verifies it against one of the two reviewed historical portfolio schemas, records the `0_init` baseline, and then applies the additive article migration. Any unknown schema mismatch aborts startup instead of baselining an unrecognized database. A failed migration prevents the new application container from becoming ready instead of starting against an incompatible schema.

The build runs `prisma generate` but does not require a live database. Article images use validated persistent external HTTP(S) URLs; uploads are intentionally not written into the container.

## Verification

```bash
npm run lint
npm run type-check
npm run build
```

## Content sources

Curated portfolio content remains in:

- `lib/data/featuredProjects.ts`
- `lib/data/additionalProjects.ts`
- `lib/data/experiences.ts`
- `lib/data/skills.ts`

Published writing lives in PostgreSQL and changes without a Git commit or deployment.
