import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import React, { ChangeEvent, FC } from "react";
import TextField from "@material-ui/core/TextField";
import * as t from "../ts/types";

const SearchComponent: FC<{
  showSearch: t.ShowSearch;
  searchTodos: t.SearchTodos;
  visibleTodosLength: number;
}> = (props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    props.searchTodos(e.target.value);
  };

  return (
    <ListItem>
      <TextField
        autoComplete="off"
        error={props.visibleTodosLength === 0}
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
          onClick={props.showSearch}
        >
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SearchComponent;
