import { Favorite, LoginOutlined, Search } from "@mui/icons-material";
import { Box, Button, Container } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

export const HeaderNavigation: FC = () => (
  <header>
    <Box component="nav" sx={{ flexGrow: 1 }}>
      <Container
        fixed
        sx={{ justifyContent: "center", display: "flex", gap: 3 }}
      >
        <Button
          component={Link}
          to="/login"
          startIcon={<LoginOutlined />}
          color="inherit"
        >
          Login
        </Button>
        <Button
          component={Link}
          to="/"
          startIcon={<Favorite />}
          color="inherit"
        >
          Favorites
        </Button>
        <Button
          component={Link}
          to="/search"
          startIcon={<Search />}
          color="inherit"
        >
          Search Repos
        </Button>
      </Container>
    </Box>
  </header>
);
