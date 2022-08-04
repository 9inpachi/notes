import { Favorite, FavoriteBorder, Link } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";
import { Repo } from "../models/repo";

export type RepoCardProps = {
  repo: Repo;
  isFavorite?: boolean;
  onFavoriteChange?: (toggle: boolean) => void;
};

export const RepoCard: FC<RepoCardProps> = (props) => {
  const [isFavorite, setIsFavorite] = useState(props.isFavorite ?? false);

  const toggleFavorite = () => {
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