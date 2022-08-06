import { Error, Favorite, FavoriteBorder, Link } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useFetchWrapper } from "../hooks/use-fetch-wrapper";
import { endpoints } from "../library/endpoints";
import { GitHubRepo } from "../models/repo";

export type RepoCardProps = {
  repo: GitHubRepo;
  isFavorite?: boolean;
  onFavoriteChange?: (repoId: number, toggle: boolean) => void;
};

export const RepoCard: FC<RepoCardProps> = (props) => {
  const [isFavorite, setIsFavorite] = useState(props.isFavorite ?? false);

  const [markFavorite, { loading: markLoading, error: markError }] =
    useFetchWrapper<GitHubRepo>(endpoints.create.url, {
      method: endpoints.create.method,
      auth: true,
      data: props.repo,
    });

  const [unmarkFavorite, { loading: unmarkLoading, error: unmarkError }] =
    useFetchWrapper(endpoints.delete.url(props.repo.repo_id), {
      method: endpoints.delete.method,
      auth: true,
    });

  const toggleFavorite = () => {
    if (isFavorite) {
      unmarkFavorite();
    } else {
      markFavorite();
    }

    const updatedValue = !isFavorite;
    setIsFavorite(updatedValue);
    props.onFavoriteChange?.(props.repo.repo_id, updatedValue);
  };

  return (
    <Card
      variant="outlined"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography variant="h6">{props.repo.repo_name}</Typography>
        <Typography variant="subtitle2">{props.repo.full_name}</Typography>
        <Typography variant="body2">{props.repo.description}</Typography>
      </CardContent>
      <CardActions>
        <IconButton
          disabled={markLoading || unmarkLoading}
          onClick={toggleFavorite}
        >
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <IconButton href={props.repo.repo_url} LinkComponent="a">
          <Link />
        </IconButton>
        {(markError || unmarkError) && (
          <Tooltip title="Error marking repo">
            <Error />
          </Tooltip>
        )}
      </CardActions>
    </Card>
  );
};
