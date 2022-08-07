import { Container } from "@mui/system";
import React from "react";
import ReactDOM from "react-dom/client";
import { HeaderNavigation } from "./sections/header-navigation";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchRepos } from "./sections/search-repos";
import { FavoriteRepos } from "./sections/favorite-repos";
import { Login } from "./sections/login";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <HeaderNavigation />
      <Container fixed sx={{ mt: 15 }}>
        <Routes>
          <Route path="/" element={<FavoriteRepos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search" element={<SearchRepos />} />
        </Routes>
      </Container>
    </BrowserRouter>
  </React.StrictMode>
);
