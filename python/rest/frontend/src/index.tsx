import React from "react";
import ReactDOM from "react-dom/client";
import { RepoCard } from "./components/repo-card";
import { Search } from "./components/search";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Search onSearch={console.log} />
    <RepoCard
      repo={{
        description: "Some repo",
        language: "en",
        full_name: "Fawad Ali",
        repo_id: 123,
        repo_url: "https://github.com/9inpachi/notes",
        repo_name: "notes",
        user_id: "test_user",
      }}
    />
  </React.StrictMode>
);
