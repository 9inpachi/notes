import { Favorite, FavoriteBorder, Link } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { useRequest } from "../hooks/use-request";
import { endpoints } from "../library/endpoints";
import { Repo } from "../models/repo";

export type RepoCardProps = {
  repo: Repo;
  isFavorite?: boolean;
  onFavoriteChange?: (toggle: boolean) => void;
};

export const RepoCard: FC<RepoCardProps> = (props) => {
  const [isFavorite, setIsFavorite] = useState(props.isFavorite ?? false);
  const [markFavorite] = useRequest<Omit<Repo, "user_id">, any>(
    endpoints.create.url,
    {
      method: endpoints.create.method,
    }
  );
  const [unmarkFavorite] = useRequest(
    endpoints.delete.url(props.repo.repo_id),
    { method: endpoints.delete.method }
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      unmarkFavorite();
    } else {
      const { user_id, ...repoForRequest } = props.repo;
      markFavorite(repoForRequest);
    }

    const updatedValue = !isFavorite;
    setIsFavorite(updatedValue);
    props.onFavoriteChange?.(updatedValue);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{props.repo.repo_name}</Typography>
        <Typography variant="subtitle1">{props.repo.full_name}</Typography>
        <Typography variant="body2">{props.repo.description}</Typography>
      </CardContent>
      <CardActions>
        <IconButton onClick={toggleFavorite}>
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
        <IconButton href={props.repo.repo_url} LinkComponent="a">
          <Link />
        </IconButton>
      </CardActions>
    </Card>
  );
};
