export type Repo = {
  user_id: string;
  repo_id: number;
  repo_name: string;
  repo_url: string;
  full_name: string;
  description: string;
  language: string;
  isFavorite?: boolean;
};

export type GitHubRepo = Omit<Repo, "user_id">;
