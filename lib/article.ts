import { z } from "zod";

export const articleCategories = [
  "Artificial Intelligence",
  "Agentic AI",
  "Software Engineering",
  "Cloud & Infrastructure",
  "Architecture",
  "Data Engineering",
  "Engineering Notes",
] as const;

const httpUrl = z
  .string()
  .trim()
  .max(2048)
  .refine((value) => {
    if (!value) return true;
    try {
      const protocol = new URL(value).protocol;
      return protocol === "http:" || protocol === "https:";
    } catch {
      return false;
    }
  }, "Use a valid http or https URL.");

export const articleInputSchema = z.object({
  name: z.string().trim().min(3, "Add a title.").max(160),
  slug: z
    .string()
    .trim()
    .min(3, "Add a URL slug.")
    .max(180)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only."),
  description: z.string().trim().min(10, "Add a short description.").max(320),
  content: z.string().trim().min(1, "Add article content.").max(100_000),
  categoryId: z.coerce.number().int().positive(),
  coverImage: httpUrl.optional().transform((value) => value || null),
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export const articleStatusSchema = z.object({
  status: z.enum(["DRAFT", "PUBLISHED"]),
});

export type ArticleInput = z.infer<typeof articleInputSchema>;

export function slugifyArticleTitle(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 180);
}

export function calculateReadingTime(markdown: string) {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]+`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]+\]\([^)]*\)/g, " ")
    .replace(/[#>*_~\-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

export function extractHeadings(markdown: string) {
  return markdown
    .split("\n")
    .map((line) => /^(#{2,3})\s+(.+)$/.exec(line.trim()))
    .filter((match): match is RegExpExecArray => Boolean(match))
    .map((match) => {
      const text = match[2].replace(/[*_`~\[\]]/g, "").trim();
      return { level: match[1].length, text, id: slugifyArticleTitle(text) };
    });
}
