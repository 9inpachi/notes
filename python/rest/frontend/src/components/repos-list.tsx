import { Grid } from "@mui/material";
import { FC } from "react";
import { GitHubRepo } from "../models/repo";
import { RepoCard, RepoCardProps } from "./repo-card";

type Props = {
  repos: GitHubRepo[];
  onFavoriteChange?: RepoCardProps["onFavoriteChange"];
};

export const ReposList: FC<Props> = ({ repos, onFavoriteChange }) => {
  return (
    <Grid container spacing={2} alignItems="stretch">
      {repos.map((repo) => {
        const { isFavorite, ...baseRepo } = repo;

        return (
          <Grid key={repo.repo_id} item xs={6} md={4}>
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
