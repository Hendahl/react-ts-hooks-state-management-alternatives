import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useStyles } from "../../theme";
import * as actions from "../../redux/todos/actions";
import * as filter from "../../constants/filter";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import React, {
  FC,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
  ChangeEvent,
} from "react";
import SearchIcon from "@material-ui/icons/Search";
import Hidden from "@material-ui/core/Hidden";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

interface FilterProps {
  todos: Todos;
}

const FilterTodos: FC = (): ReactElement => {
  const classes = useStyles();
  const typedUseSelector: TypedUseSelectorHook<FilterProps> = useSelector;
  const todos = typedUseSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [isAllCompleted, setIsAllCompleted] = useState<boolean>(false);
  const [filterState, setFilterState] = useState<string>(filter.ALL_TODOS);

  useEffect(() => {
    if (todos.payload[0]) {
      setIsAllCompleted((isAllCompleted) => !todos.payload[0].completed);
    }
  }, [todos]);

  const handleChange = (e: ChangeEvent<{ value: unknown }>) => {
    setFilterState(e.target.value as string);
    dispatch(actions.setFilter(e.target.value as string));
  };

  const handleFilterTodos = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch(actions.setFilter(e.currentTarget.id));
  };

  const handleDeleteTodos = () => {
    dispatch(actions.deleteTodos());
  };

  const handleEditAll = (): void => {
    setIsAllCompleted(isAllCompleted);
    dispatch(actions.changeTodosCompleted(isAllCompleted));
  };

  return (
    <ListItem>
      {todos.countAll !== 0 && (
        <>
          <ListItemIcon>
            <IconButton
              aria-label="Edit Completed"
              color={isAllCompleted ? "primary" : "inherit"}
              disabled={todos.countAll === 0}
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
                value={filterState}
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
            onClick={() => dispatch(actions.searchToggle())}
          >
            <SearchIcon />
          </IconButton>
        </>
      )}
    </ListItem>
  );
};

export default FilterTodos;
