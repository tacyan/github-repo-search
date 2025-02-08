export interface Contributor {
  login: string;
  avatar_url: string;
  contributions: number;
}

export interface Repository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  language?: string;
  topics?: string[];
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  default_branch: string;
  homepage: string | null;
} 