import { Alert } from "@mui/material";
import { FC } from "react";
import { RepoCardProps } from "../components/repo-card";
import { ReposList } from "../components/repos-list";
import { useFavoriteRepos } from "../hooks/use-favorite-repos";

export const FavoriteRepos: FC = () => {
  const { repos, setRepos, error, loading } = useFavoriteRepos();

  const onRepoFavoriteChange: RepoCardProps["onFavoriteChange"] = (
    repoId,
    isFavorite
  ) => {
    if (isFavorite === false) {
      setRepos((currentRepos) => {
        return currentRepos?.filter((repo) => repo.repo_id !== repoId) ?? [];
      });
    }
  };

  if (error) {
    return <Alert severity="error">Error getting repos.</Alert>;
  }

  if (!repos || loading) {
    return <Alert severity="info">Fetching favorite repos.</Alert>;
  }

  if (repos.length === 0) {
    return <Alert severity="warning">No favorite repos.</Alert>;
  }

  return <ReposList repos={repos} onFavoriteChange={onRepoFavoriteChange} />;
};
