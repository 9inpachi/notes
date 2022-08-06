import { useState, useEffect } from "react";
import { endpoints } from "../library/endpoints";
import { Repo } from "../models/repo";
import { useFetchWrapper } from "./use-fetch-wrapper";

type ReposResponse = Repo[];

export const useFavoriteRepos = () => {
  const [repos, setRepos] = useState<Repo[] | undefined>(undefined);

  const [getRepos, { data, error, loading }] = useFetchWrapper<
    void,
    ReposResponse
  >(endpoints.index.url, {
    method: endpoints.index.method,
    auth: true,
  });

  useEffect(() => {
    setRepos(data?.map((repo) => ({ ...repo, isFavorite: true })) ?? []);
  }, [data]);

  useEffect(() => {
    getRepos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { repos, setRepos, error, loading };
};
