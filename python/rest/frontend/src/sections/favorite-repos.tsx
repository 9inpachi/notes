import { Alert } from "@mui/material";
import { FC, useEffect, useState } from "react";
import { RepoCardProps } from "../components/repo-card";
import { ReposList } from "../components/repos-list";
import { useFetchWrapper } from "../hooks/use-fetch-wrapper";
import { endpoints } from "../library/endpoints";
import { Repo } from "../models/repo";

type ReposResponse = Repo[];

export const FavoriteRepos: FC = () => {
  const [repos, setRepos] = useState<Repo[] | undefined>(undefined);

  const [getRepos, { data, error, loading }] = useFetchWrapper<
    void,
    ReposResponse
  >(endpoints.index.url, {
    method: endpoints.index.method,
    auth: true,
  });

  const onRepoFavoriteChange: RepoCardProps["onFavoriteChange"] = (
    repoId,
    isFavorite
  ) => {
    if (isFavorite === false) {
      setRepos(data?.filter((repo) => repo.repo_id !== repoId) ?? []);
    }
  };

  useEffect(() => {
    setRepos(data?.map((repo) => ({ ...repo, isFavorite: true })) ?? []);
  }, [data]);

  useEffect(() => {
    getRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
