import "server-only";

const githubApiOrigin = "https://api.github.com";

export class GitHubApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "GitHubApiError";
  }
}

export async function fetchGitHubJson<T>(url: string): Promise<T> {
  const parsedUrl = new URL(url);
  if (parsedUrl.origin !== githubApiOrigin) {
    throw new Error("GitHub requests must use the official API origin");
  }

  const token = process.env.GITHUB_TOKEN;
  const response = await fetch(parsedUrl, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "enstso-portfolio",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const rateLimited = response.status === 403 || response.status === 429;
    throw new GitHubApiError(
      rateLimited
        ? "GitHub API rate limit reached; try the explicit sync again later"
        : `GitHub API request failed with status ${response.status}`,
      response.status,
    );
  }

  return (await response.json()) as T;
}
