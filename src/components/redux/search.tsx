import * as actions from "../../redux/todos/actions";
import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import React, { ChangeEvent, FC, ReactElement } from "react";
import TextField from "@material-ui/core/TextField";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface TodosProps {
  todos: Todos;
}

const SearchForm: FC = (): ReactElement => {
  const typedUseSelector: TypedUseSelectorHook<TodosProps> = useSelector;
  const todos = typedUseSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(actions.searchTodos(e.target.value));
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
          onClick={() => dispatch(actions.searchToggle())}
        >
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SearchForm;
