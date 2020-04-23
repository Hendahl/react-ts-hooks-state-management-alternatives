import SearchIcon from "@material-ui/icons/Search";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import React, { FC, ReactElement } from "react";
import ClearIcon from "@material-ui/icons/Clear";
import ListItemIcon from "@material-ui/core/ListItemIcon";

const SearchForm: FC = (): ReactElement => {
  return (
    <ListItem>
      <ListItemIcon>
        <IconButton aria-label="Search" color="primary" edge="end">
          <SearchIcon />
        </IconButton>
      </ListItemIcon>
      <TextField
        autoComplete="off"
        fullWidth
        id="title"
        label="What needs to be done?"
        type="text"
        variant="outlined"
      />
      <ListItemSecondaryAction>
        <IconButton aria-label="Search" color="primary" edge="end">
          <ClearIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default SearchForm;
