import { FC, FormEventHandler, useEffect, useState } from "react";
import { Paper, InputBase, Button, Alert } from "@mui/material";
import { LoginOutlined, Loop } from "@mui/icons-material";
import { useFetchWrapper } from "../hooks/use-fetch-wrapper";
import { endpoints } from "../library/endpoints";

type LoginRequest = { user_id: string };
type LoginResponse = { error?: string; auth_token?: string };

export const Login: FC = () => {
  const [userId, setUserId] = useState("");

  const [doLogin, { data, error, loading }] = useFetchWrapper<
    LoginRequest,
    LoginResponse
  >(endpoints.auth.url, {
    method: endpoints.auth.method,
    data: {
      user_id: userId,
    },
  });

  useEffect(() => {
    if (data) {
      localStorage.setItem("accessToken", data?.auth_token as string);
    }
  }, [data]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    doLogin();
  };

  return (
    <>
      <Paper
        component="form"
        sx={{
          display: "flex",
          px: 3,
          py: 1,
          width: "20rem",
          maxWidth: "90%",
          mx: "auto",
          my: 10,
        }}
        onSubmit={onSubmit}
      >
        <InputBase
          sx={{ flexGrow: 1 }}
          placeholder="User ID"
          inputProps={{ "aria-label": "Search" }}
          onChange={(event) => setUserId(event.target.value)}
        />
        <Button
          type="submit"
          disabled={loading}
          startIcon={loading ? <Loop /> : <LoginOutlined />}
          color="inherit"
        >
          Login
        </Button>
      </Paper>
      {error && <Alert severity="error">Login failed. Please try again.</Alert>}
      {data && <Alert severity="success">Logged in successfully.</Alert>}
    </>
  );
};
