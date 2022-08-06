import { Grid } from "@mui/material";
import { FC } from "react";
import { Repo } from "../models/repo";
import { RepoCard, RepoCardProps } from "./repo-card";

type Props = {
  repos: ({ isFavorite?: boolean } & Repo)[];
  onFavoriteChange?: RepoCardProps["onFavoriteChange"];
};

export const ReposList: FC<Props> = ({ repos, onFavoriteChange }) => {
  return (
    <Grid container spacing={2}>
      {repos.map((repo) => {
        const { isFavorite, ...baseRepo } = repo;

        return (
          <Grid key={repo.repo_id} item xs={6} md={3}>
            <RepoCard
              isFavorite={isFavorite}
              repo={baseRepo}
              onFavoriteChange={onFavoriteChange}
            />
          </Grid>
        );
      })}
    </Grid>
  );
};
