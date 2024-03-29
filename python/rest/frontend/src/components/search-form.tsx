import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { IconButton, InputBase, Paper } from "@mui/material";
import { Search } from "@mui/icons-material";

export type SearchFormProps = {
  onSearch?: (keyword: string) => void;
  onChange?: (value: string) => void;
};

export const SearchForm: FC<SearchFormProps> = ({ onSearch, onChange }) => {
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
        placeholder="Search on GitHub"
        inputProps={{ "aria-label": "Search" }}
        onChange={changeHandler}
      />
      <IconButton type="submit">
        <Search />
      </IconButton>
    </Paper>
  );
};
