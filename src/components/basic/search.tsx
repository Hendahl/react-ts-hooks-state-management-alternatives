import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import React, { ChangeEvent, FC, ReactElement } from "react";
import TextField from "@material-ui/core/TextField";

interface SearchFormProps {
  handleSearchToggle: SearchToggle;
  handleSearchTodos: SearchTodos;
  todos: Todos;
}

type SearchState = {
  searchTerm: string;
};

const SearchForm: FC<SearchFormProps> = ({
  handleSearchToggle,
  handleSearchTodos,
  todos,
}): ReactElement => {
  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    handleSearchTodos(e.target.value);
  };

  return (
    <ListItem>
      <TextField
        autoComplete="off"
        error={todos.visible.length === 0}
        fullWidth
        id="title"
        label="Search todos"
        onChange={onChange}
        type="search"
        variant="outlined"
      />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Search"
          color="primary"
          edge="end"
          onClick={handleSearchToggle}
        >
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SearchForm;
