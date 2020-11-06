import * as actions from "../../redux/todos/actions";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import React, { ChangeEvent, FC, ReactElement } from "react";
import TextField from "@material-ui/core/TextField";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import * as types from "../../ts/types";

const SearchComponent: FC = (): ReactElement => {
  const typedUseSelector: TypedUseSelectorHook<types.TodosI> = useSelector;
  const storeTodos = typedUseSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(actions.searchTodos(e.target.value));
  };

  return (
    <ListItem>
      <TextField
        autoComplete="off"
        error={storeTodos.visible.length === 0}
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
          onClick={() => dispatch(actions.showSearch())}
        >
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SearchComponent;
