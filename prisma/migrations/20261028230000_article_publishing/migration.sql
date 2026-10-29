-- Extend the legacy article table without publishing any existing content.
CREATE TYPE "ArticleStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- Keep legacy-only columns compatible with the current Prisma models without
-- dropping any historical data.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'Category' AND column_name = 'type'
  ) THEN
    EXECUTE 'ALTER TABLE "Category" ALTER COLUMN "type" SET DEFAULT ''ARTICLE''';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'Article' AND column_name = 'photo'
  ) THEN
    EXECUTE 'ALTER TABLE "Article" ALTER COLUMN "photo" SET DEFAULT ''''';
  END IF;

  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'Project' AND column_name = 'categoryId'
  ) THEN
    EXECUTE 'ALTER TABLE "Project" ALTER COLUMN "categoryId" DROP NOT NULL';
  END IF;
END $$;

ALTER TABLE "Article"
  ADD COLUMN "slug" TEXT,
  ADD COLUMN "status" "ArticleStatus" NOT NULL DEFAULT 'DRAFT',
  ADD COLUMN "publishedAt" TIMESTAMP(3),
  ADD COLUMN "coverImage" TEXT,
  ADD COLUMN "readingTime" INTEGER NOT NULL DEFAULT 1,
  ADD COLUMN "previousSlugs" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN "authorId" INTEGER;

-- Legacy records receive deterministic, collision-free slugs and remain drafts.
UPDATE "Article"
SET "slug" = COALESCE(
  NULLIF(TRIM(BOTH '-' FROM REGEXP_REPLACE(LOWER("name"), '[^a-z0-9]+', '-', 'g')), ''),
  'article'
) || '-' || "id"::TEXT;

ALTER TABLE "Article" ALTER COLUMN "slug" SET NOT NULL;

CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");
CREATE INDEX "Article_status_publishedAt_idx" ON "Article"("status", "publishedAt");
CREATE INDEX "Article_categoryId_status_idx" ON "Article"("categoryId", "status");
CREATE INDEX "Article_authorId_idx" ON "Article"("authorId");
CREATE INDEX "Category_name_idx" ON "Category"("name");

ALTER TABLE "Article"
  ADD CONSTRAINT "Article_authorId_fkey"
  FOREIGN KEY ("authorId") REFERENCES "User"("id")
  ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO "Category" ("name")
SELECT category_name
FROM (VALUES
  ('Artificial Intelligence'),
  ('Agentic AI'),
  ('Software Engineering'),
  ('Cloud & Infrastructure'),
  ('Architecture'),
  ('Data Engineering'),
  ('Engineering Notes')
) AS suggested(category_name)
WHERE NOT EXISTS (
  SELECT 1 FROM "Category" WHERE LOWER("Category"."name") = LOWER(category_name)
);
