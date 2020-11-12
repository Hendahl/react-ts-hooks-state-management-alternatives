import * as t from "../ts/types";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import FormControl from "@material-ui/core/FormControl";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import MenuItem from "@material-ui/core/MenuItem";
import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import { useStyles } from "../theme";

const FilterComponent: FC<{
  removeTodos: t.RemoveTodos;
  filterTodos: t.FilterTodos;
  showSearch: t.ShowSearch;
  toggleTodos: t.ToggleTodos;
  todos: t.TodosT;
}> = (props) => {
  const classes = useStyles();

  const [stateIsAllCompleted, setStateIsAllCompleted] = useState<boolean>(
    false
  );
  const [stateFilter, setStateFilter] = useState<string>(t.FILTER_ALL);

  useEffect(() => {
    if (props.todos.data[0]) {
      setStateIsAllCompleted(!props.todos.data[0].completed);
    }
  }, [props.todos]);

  const handleChange = (e: ChangeEvent<{ value: unknown }>) => {
    setStateFilter(e.target.value as string);
    props.filterTodos(e.target.value as string);
  };

  const handleFilterTodos = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    props.filterTodos(e.currentTarget.id);
  };

  const handleToggleTodos = (): void => {
    if (props.todos.data[0]) {
      setStateIsAllCompleted(!stateIsAllCompleted);
    }
    props.toggleTodos(stateIsAllCompleted);
  };

  return (
    <ListItem>
      {props.todos.countAll !== 0 && (
        <>
          <ListItemIcon>
            <IconButton
              aria-label="Edit Completed"
              color={stateIsAllCompleted ? "primary" : "inherit"}
              disabled={props.todos.countAll === 0}
              edge="end"
              onClick={handleToggleTodos}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </ListItemIcon>
          <Hidden smDown>
            <ButtonGroup
              aria-label="text primary button group"
              color="primary"
              variant="text"
              className={classes.buttonGroup}
            >
              <Button
                disabled={
                  props.todos.visibilityFilter === t.FILTER_ALL ||
                  props.todos.countAll === 0
                }
                id={t.FILTER_ALL}
                onClick={handleFilterTodos}
              >
                ALL ({props.todos.countAll})
              </Button>
              <Button
                disabled={
                  props.todos.visibilityFilter === t.FILTER_ACTIVE ||
                  props.todos.countAll === 0
                }
                id={t.FILTER_ACTIVE}
                onClick={handleFilterTodos}
              >
                ACTIVE ({props.todos.countAll - props.todos.countCompleted})
              </Button>
              <Button
                disabled={
                  props.todos.visibilityFilter === t.FILTER_COMPLETED ||
                  props.todos.countAll === 0
                }
                id={t.FILTER_COMPLETED}
                onClick={handleFilterTodos}
              >
                COMPLETEDED ({props.todos.countCompleted})
              </Button>
            </ButtonGroup>
          </Hidden>
          <Hidden mdUp>
            <FormControl variant="outlined" fullWidth>
              <Select
                id="filter-select"
                value={stateFilter}
                onChange={handleChange}
              >
                <MenuItem value={t.FILTER_ALL}>
                  ALL ({props.todos.countAll})
                </MenuItem>
                <MenuItem value={t.FILTER_ACTIVE}>
                  ACTIVE ({props.todos.countAll - props.todos.countCompleted})
                </MenuItem>
                <MenuItem value={t.FILTER_COMPLETED}>
                  COMPLETED ({props.todos.countCompleted})
                </MenuItem>
              </Select>
            </FormControl>
          </Hidden>
          <IconButton
            color="primary"
            edge="end"
            aria-label="Delete all"
            onClick={props.removeTodos}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="primary"
            disabled={props.todos.isSearching}
            edge="end"
            aria-label="Search"
            onClick={props.showSearch}
          >
            <SearchIcon />
          </IconButton>
        </>
      )}
    </ListItem>
  );
};

export default FilterComponent;
