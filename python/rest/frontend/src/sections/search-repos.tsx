import { Alert } from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { ReposList } from "../components/repos-list";
import { SearchForm } from "../components/search-form";
import { useFavoriteRepos } from "../hooks/use-favorite-repos";
import { useFetchWrapper } from "../hooks/use-fetch-wrapper";
import { GitHubRepo } from "../models/repo";

const reposEndpoint = (query: string) =>
  `https://api.github.com/search/repositories?${new URLSearchParams({
    q: query,
    per_page: "30",
  })}`;

const mapReposResponse = (data: any): GitHubRepo[] =>
  data.items.map((rawRepo: any) => ({
    repo_id: rawRepo.id,
    repo_name: rawRepo.name,
    repo_url: rawRepo.html_url,
    full_name: rawRepo.full_name,
    description: rawRepo.description,
    language: rawRepo.language,
  }));

export const SearchRepos: FC = () => {
  const { repos: favoriteRepos } = useFavoriteRepos();
  const favoriteReposIds = useMemo(
    () => favoriteRepos?.map((repo) => repo.repo_id) ?? [],
    [favoriteRepos]
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [reposResult, setReposResult] = useState<GitHubRepo[] | undefined>(
    undefined
  );
  const [searchRepos, { data, error, loading }] = useFetchWrapper(
    reposEndpoint(searchQuery)
  );

  useEffect(() => {
    if (!searchQuery) {
      return;
    }

    searchRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  useEffect(() => {
    if (data) {
      const reposResultWithFavorites = mapReposResponse(data).map((repo) => ({
        ...repo,
        isFavorite: favoriteReposIds.includes(repo.repo_id) ? true : false,
      }));

      setReposResult(reposResultWithFavorites);
    }
  }, [data, favoriteReposIds]);

  return (
    <>
      <SearchForm onSearch={(keyword) => setSearchQuery(keyword)} />
      {error && <Alert severity="error">Error getting repos.</Alert>}
      {loading && <Alert severity="info">Fetching repos.</Alert>}
      {reposResult?.length === 0 && (
        <Alert severity="warning">No repos found.</Alert>
      )}
      {reposResult && reposResult.length > 0 && (
        <ReposList repos={reposResult ?? []} />
      )}
    </>
  );
};
