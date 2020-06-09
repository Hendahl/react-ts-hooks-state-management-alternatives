import * as actions from "../../redux/todos/actions";
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
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useStyles } from "../../theme";
import React, {
  FC,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
  ChangeEvent,
} from "react";

interface IFilterComponent {
  todos: Todos;
}

const FilterComponent: FC = (): ReactElement => {
  const classes = useStyles();
  const typedUseSelector: TypedUseSelectorHook<IFilterComponent> = useSelector;
  const todos = typedUseSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [stateIsAllCompleted, setStateIsAllCompleted] = useState<boolean>(
    false
  );
  const [stateFilter, setStateFilter] = useState<string>(filter.ALL_TODOS);

  useEffect(() => {
    if (todos.payload[0]) {
      setStateIsAllCompleted(!todos.payload[0].completed);
    }
  }, [todos]);

  const handleChange = (e: ChangeEvent<{ value: unknown }>) => {
    setStateFilter(e.target.value as string);
    dispatch(actions.filterTodos(e.target.value as string));
  };

  const handleDeleteTodos = () => {
    dispatch(actions.deleteTodos());
  };

  const handleFilterTodos = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch(actions.filterTodos(e.currentTarget.id));
  };

  const handleToggleTodos = (): void => {
    if (todos.payload[0]) {
      setStateIsAllCompleted(!stateIsAllCompleted);
    }
    dispatch(actions.toggleTodos(stateIsAllCompleted));
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
                  todos.visibilityFilter === filter.ALL_TODOS ||
                  todos.countAll === 0
                }
                id={filter.ALL_TODOS}
                onClick={handleFilterTodos}
              >
                ALL ({todos.countAll})
              </Button>
              <Button
                disabled={
                  todos.visibilityFilter === filter.ACTIVE_TODOS ||
                  todos.countAll === 0
                }
                id={filter.ACTIVE_TODOS}
                onClick={handleFilterTodos}
              >
                ACTIVE ({todos.countAll - todos.countCompleted})
              </Button>
              <Button
                disabled={
                  todos.visibilityFilter === filter.COMPLETED_TODOS ||
                  todos.countAll === 0
                }
                id={filter.COMPLETED_TODOS}
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
                <MenuItem value={filter.ALL_TODOS}>
                  ALL ({todos.countAll})
                </MenuItem>
                <MenuItem value={filter.ACTIVE_TODOS}>
                  ACTIVE ({todos.countAll - todos.countCompleted})
                </MenuItem>
                <MenuItem value={filter.COMPLETED_TODOS}>
                  COMPLETED ({todos.countCompleted})
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
            onClick={() => dispatch(actions.showSearch())}
          >
            <SearchIcon />
          </IconButton>
        </>
      )}
    </ListItem>
  );
};

export default FilterComponent;
