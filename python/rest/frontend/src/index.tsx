import { Container } from "@mui/system";
import React from "react";
import ReactDOM from "react-dom/client";
import { HeaderNavigation } from "./sections/header-navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchRepos } from "./sections/search-repos";
import { FavoriteRepos } from "./sections/favorite-repos";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <HeaderNavigation />
    <Container fixed>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FavoriteRepos />} />
          <Route path="/search" element={<SearchRepos />} />
        </Routes>
      </BrowserRouter>
    </Container>
  </React.StrictMode>
);
