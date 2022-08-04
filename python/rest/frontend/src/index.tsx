import { Container } from "@mui/system";
import React from "react";
import ReactDOM from "react-dom/client";
import { ReposList } from "./components/repos-list";
import { Search } from "./components/search";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Container fixed>
      <Search onSearch={console.log} />
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
    </Container>
  </React.StrictMode>
);
