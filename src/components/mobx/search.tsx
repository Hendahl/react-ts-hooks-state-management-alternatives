import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import React, { ChangeEvent, FC, ReactElement, useContext } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../mobx/store";

const SearchForm: FC = observer(() => {
  const { todos } = useStore();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    todos.searchTodos(e.target.value as string);
  };

  return (
    <ListItem>
      <TextField
        autoComplete="off"
        error={todos.visibleView.length === 0}
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
          onClick={() => todos.searchToggle()}
        >
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
});

export default SearchForm;
