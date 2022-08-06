import { FC } from "react";
import { ReposList } from "../components/repos-list";

export const FavoriteRepos: FC = () => {
  return (
    <ReposList
      repos={[
        {
          description: "Some repo",
          language: "en",
          full_name: "Fawad Ali",
          repo_id: 123,
          repo_url: "https://github.com/9inpachi/notes",
          repo_name: "notes",
          user_id: "test_user",
        },
      ]}
    />
  );
};
