import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import React, { ChangeEvent, FC, ReactElement } from "react";
import TextField from "@material-ui/core/TextField";

interface SearchFormProps {
  onShowSearch: SearchToggle;
  onSearchTodos: SearchTodos;
  todos: Todos;
}

const SearchForm: FC<SearchFormProps> = ({
  onSearchTodos,
  onShowSearch,
  todos,
}): ReactElement => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    onSearchTodos(e.target.value);
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
          onClick={onShowSearch}
        >
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SearchForm;
