import { Grid } from "@mui/material";
import { FC } from "react";
import { Repo } from "../models/repo";
import { RepoCard } from "./repo-card";

type Props = {
  repos: Repo[];
};

export const ReposList: FC<Props> = ({ repos }) => {
  return (
    <Grid container spacing={2}>
      {repos.map((repo) => (
        <Grid key={repo.repo_id} item xs={6} md={3}>
          <RepoCard repo={repo} />
        </Grid>
      ))}
    </Grid>
  );
};
