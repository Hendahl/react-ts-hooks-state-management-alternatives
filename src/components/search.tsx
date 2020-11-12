import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import React, { ChangeEvent, FC, ReactElement } from "react";
import TextField from "@material-ui/core/TextField";

interface SearchI {
  onShowSearch: () => void;
  onSearchTodos: (searchTerm: string) => void;
  visibleTodosLength: number;
}

const SearchComponent: FC<SearchI> = ({
  onSearchTodos,
  onShowSearch,
  visibleTodosLength,
}): ReactElement => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onSearchTodos(e.target.value);
  };

  return (
    <ListItem>
      <TextField
        autoComplete="off"
        error={visibleTodosLength === 0}
        fullWidth
        id="title"
        label="Search todos"
        onChange={handleChange}
        type="search"
        variant="outlined"
      />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Search"
          color="primary"
          edge="end"
          onClick={onShowSearch}
        >
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SearchComponent;
