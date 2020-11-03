import * as types from "../../ts/types";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import React, { ChangeEvent, FC, ReactElement, useContext } from "react";
import TextField from "@material-ui/core/TextField";
import { Context } from "../../context/store";

const SearchComponent: FC = (): ReactElement => {
  const { todos, dispatch } = useContext(Context);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch({ type: types.SEARCH_TODOS, searchTerm: e.target.value });
  };

  return (
    <ListItem>
      <TextField
        autoComplete="off"
        error={todos.visible.length === 0}
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
          onClick={() => dispatch({ type: types.SHOW_SEARCH })}
        >
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SearchComponent;
