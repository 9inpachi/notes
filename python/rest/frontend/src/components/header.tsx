import { Favorite, Search } from "@mui/icons-material";
import { Box, Button, Container } from "@mui/material";
import { FC } from "react";

export const Header: FC = () => (
  <header>
    <Box component="nav" sx={{ flexGrow: 1 }}>
      <Container
        fixed
        sx={{ justifyContent: "center", display: "flex", gap: 3 }}
      >
        <Button href="/" startIcon={<Favorite />}>
          Favorites
        </Button>
        <Button href="/search" startIcon={<Search />}>
          Search Repos
        </Button>
      </Container>
    </Box>
  </header>
);
