import * as filter from "../../constants/filter";
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
import Select from "@material-ui/core/Select";
import { observer } from "mobx-react-lite";
import { useStore } from "../../mobx/store";
import { useStyles } from "../../theme";
import SearchIcon from "@material-ui/icons/Search";

const FilterTodos: FC = observer(() => {
  const classes = useStyles();
  const { todos } = useStore();
  const [isAllCompleted, setIsAllCompleted] = useState<boolean>(false);
  const [filterState, setFilterState] = useState<string>(filter.ALL_TODOS);

  useEffect(() => {
    if (todos.payload[0]) {
      setIsAllCompleted(!todos.payload[0].completed);
    }
  }, [todos.payload]);

  const handleChange = (e: ChangeEvent<{ value: unknown }>) => {
    setFilterState(e.target.value as string);
  };

  const handleFilterTodos = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    todos.setFilter(e.currentTarget.id);
  };

  const handleEditAll = (): void => {
    setIsAllCompleted(!isAllCompleted);
    todos.changeTodosCompleted(isAllCompleted);
  };

  const handleDeleteTodos = () => {
    todos.deleteTodos();
  };

  return (
    <ListItem>
      {todos.countAllView !== 0 && (
        <>
          <ListItemIcon>
            <IconButton
              aria-label="Edit Completed"
              color={isAllCompleted ? "primary" : "inherit"}
              disabled={todos.countAllView === 0}
              edge="end"
              onClick={handleEditAll}
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
                  todos.visibilityFilter === filter.ALL_TODOS ||
                  todos.countAllView === 0
                }
                id={filter.ALL_TODOS}
                onClick={handleFilterTodos}
              >
                ALL ({todos.countAllView})
              </Button>
              <Button
                disabled={
                  todos.visibilityFilter === filter.ACTIVE_TODOS ||
                  todos.countAllView === 0
                }
                id={filter.ACTIVE_TODOS}
                onClick={handleFilterTodos}
              >
                ACTIVE ({todos.countAllView - todos.countCompletedView})
              </Button>
              <Button
                disabled={
                  todos.visibilityFilter === filter.COMPLETED_TODOS ||
                  todos.countAllView === 0
                }
                id={filter.COMPLETED_TODOS}
                onClick={handleFilterTodos}
              >
                COMPLETEDED ({todos.countCompletedView})
              </Button>
            </ButtonGroup>
          </Hidden>
          <Hidden mdUp>
            <FormControl variant="outlined" fullWidth>
              <Select
                id="filter-select"
                value={filterState}
                onChange={handleChange}
              >
                <MenuItem value={filter.ALL_TODOS}>
                  ALL ({todos.countAllView})
                </MenuItem>
                <MenuItem value={filter.ACTIVE_TODOS}>
                  ACTIVE ({todos.countAllView - todos.countCompletedView})
                </MenuItem>
                <MenuItem value={filter.COMPLETED_TODOS}>
                  COMPLETED ({todos.countCompletedView})
                </MenuItem>
              </Select>
            </FormControl>
          </Hidden>
          <IconButton
            color="primary"
            edge="end"
            aria-label="Delete all"
            onClick={handleDeleteTodos}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="primary"
            disabled={todos.isSearching}
            edge="end"
            aria-label="Search"
            onClick={() => todos.searchToggle()}
          >
            <SearchIcon />
          </IconButton>
        </>
      )}
    </ListItem>
  );
});

export default FilterTodos;
