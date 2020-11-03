import * as types from "../../ts/types";
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
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import { useStyles } from "../../theme";
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
interface FilterI {
  onDeleteTodos: () => void;
  onFilterTodos: (visibiltityFilter: string) => void;
  onShowSearch: () => void;
  onToggleTodos: (IsAllCompleted: boolean) => void;
  todos: types.Todos;
}

const FilterComponent: FC<FilterI> = ({
  onDeleteTodos,
  onFilterTodos,
  onShowSearch,
  onToggleTodos,
  todos,
}: FilterI): ReactElement => {
  const classes = useStyles();

  const [stateIsAllCompleted, setStateIsAllCompleted] = useState<boolean>(
    false
  );
  const [stateFilter, setStateFilter] = useState<string>(types.ALL_TODOS);

  useEffect(() => {
    if (todos.payload[0]) {
      setStateIsAllCompleted(!todos.payload[0].completed);
    }
  }, [todos]);

  const handleChange = (e: ChangeEvent<{ value: unknown }>) => {
    setStateFilter(e.target.value as string);
    onFilterTodos(e.target.value as string);
  };

  const handleFilterTodos = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    onFilterTodos(e.currentTarget.id);
  };

  const handleToggleTodos = (): void => {
    if (todos.payload[0]) {
      setStateIsAllCompleted(!stateIsAllCompleted);
    }
    onToggleTodos(stateIsAllCompleted);
  };

  return (
    <ListItem>
      {todos.countAll !== 0 && (
        <>
          <ListItemIcon>
            <IconButton
              aria-label="Edit Completed"
              color={stateIsAllCompleted ? "primary" : "inherit"}
              disabled={todos.countAll === 0}
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
                  todos.visibilityFilter === types.ALL_TODOS ||
                  todos.countAll === 0
                }
                id={types.ALL_TODOS}
                onClick={handleFilterTodos}
              >
                ALL ({todos.countAll})
              </Button>
              <Button
                disabled={
                  todos.visibilityFilter === types.ACTIVE_TODOS ||
                  todos.countAll === 0
                }
                id={types.ACTIVE_TODOS}
                onClick={handleFilterTodos}
              >
                ACTIVE ({todos.countAll - todos.countCompleted})
              </Button>
              <Button
                disabled={
                  todos.visibilityFilter === types.COMPLETED_TODOS ||
                  todos.countAll === 0
                }
                id={types.COMPLETED_TODOS}
                onClick={handleFilterTodos}
              >
                COMPLETEDED ({todos.countCompleted})
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
                <MenuItem value={types.ALL_TODOS}>
                  ALL ({todos.countAll})
                </MenuItem>
                <MenuItem value={types.ACTIVE_TODOS}>
                  ACTIVE ({todos.countAll - todos.countCompleted})
                </MenuItem>
                <MenuItem value={types.COMPLETED_TODOS}>
                  COMPLETED ({todos.countCompleted})
                </MenuItem>
              </Select>
            </FormControl>
          </Hidden>
          <IconButton
            color="primary"
            edge="end"
            aria-label="Delete all"
            onClick={onDeleteTodos}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            color="primary"
            disabled={todos.isSearching}
            edge="end"
            aria-label="Search"
            onClick={onShowSearch}
          >
            <SearchIcon />
          </IconButton>
        </>
      )}
    </ListItem>
  );
};

export default FilterComponent;
