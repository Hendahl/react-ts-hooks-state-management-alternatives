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

const FilterComponent: FC = observer(() => {
  const classes = useStyles();
  const { todos } = useStore();
  const [state, setState] = useState({
    isAllCompleted: false,
    todosFilter: filter.ALL_TODOS,
  });

  useEffect(() => {
    if (todos.payload[0]) {
      setState({ ...state, isAllCompleted: !todos.payload[0].completed });
    }
  }, [todos.payload]);

  const handleChange = (e: ChangeEvent<{ value: unknown }>) => {
    setState({ ...state, todosFilter: e.target.value as string });
  };

  const handleDeleteTodos = () => {
    todos.deleteTodos();
  };

  const handleFilterTodos = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    todos.filterTodos(e.currentTarget.id);
  };

  const handleToggleTodos = (): void => {
    if (todos.payload[0]) {
      setState({ ...state, isAllCompleted: !state.isAllCompleted });
    }
    todos.toggleTodos(state.isAllCompleted);
  };

  return (
    <ListItem>
      {todos.countAllView !== 0 && (
        <>
          <ListItemIcon>
            <IconButton
              aria-label="Edit Completed"
              color={state.isAllCompleted ? "primary" : "inherit"}
              disabled={todos.countAllView === 0}
              edge="end"
              onClick={handleToggleTodos}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </ListItemIcon>
          <Hidden smDown>
            <ButtonGroup
              aria-label="text primary button group"
              className={classes.buttonGroup}
              color="primary"
              variant="text"
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
                onChange={handleChange}
                value={state.todosFilter}
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
            aria-label="Delete all"
            color="primary"
            edge="end"
            onClick={handleDeleteTodos}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </ListItem>
  );
});

export default FilterComponent;
