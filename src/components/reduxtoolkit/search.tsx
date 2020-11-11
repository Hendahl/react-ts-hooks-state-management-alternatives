import ClearIcon from "@material-ui/icons/Clear";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import React, { ChangeEvent, FC, ReactElement } from "react";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { search, showSearch } from "../../reduxtoolkit/todos";

const SearchComponent: FC<{ visibleTodosLength: number }> = (
  props
): ReactElement => {
  const dispatch = useDispatch();

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    dispatch(search({ searchTerm: e.target.value }));
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
          onClick={() => dispatch(showSearch())}
        >
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SearchComponent;
