import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { IconButton, InputBase, Paper } from "@mui/material";

export type SearchProps = {
  onSearch?: (keyword: string) => void;
  onChange?: (value: string) => void;
};

export const Search: FC<SearchProps> = ({ onSearch, onChange }) => {
  const [value, setValue] = useState("");

  const changeHandler: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
    onChange?.(event.target.value);
  };

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    onSearch?.(value);
  };

  return (
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
        placeholder="Search"
        inputProps={{ "aria-label": "Search" }}
        onChange={changeHandler}
      />
      <IconButton type="submit">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};
