import * as actions from "../../constants/actions";
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
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import SearchIcon from "@material-ui/icons/Search";
import Select from "@material-ui/core/Select";
import { Context } from "../../context/store";
import { useStyles } from "../../theme";

const FilterTodos: FC = (): ReactElement => {
  const classes = useStyles();
  const { todos, dispatch } = useContext(Context);
  const [isAllCompleted, setIsAllCompleted] = useState<boolean>(false);
  const [filterState, setFilterState] = useState<string>(filter.ALL_TODOS);

  useEffect(() => {
    if (todos.payload[0]) {
      setIsAllCompleted((isAllCompleted) => !todos.payload[0].completed);
    }
  }, [todos]);

  const handleChange = (e: ChangeEvent<{ value: unknown }>) => {
    setFilterState(e.target.value as string);
    dispatch({
      type: actions.SET_FILTER,
      visibiltityFilter: e.target.value as string,
    });
  };

  const handleEditAll = (): void => {
    setIsAllCompleted(isAllCompleted);
    dispatch({
      type: actions.CHANGE_TODOS_COMPLETED,
      isAllCompleted: isAllCompleted,
    });
  };

  const handleFilterTodos = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch({
      type: actions.SET_FILTER,
      visibiltityFilter: e.currentTarget.id,
    });
  };

  const handleDeleteTodos = () => {
    dispatch({ type: actions.DELETE_TODOS });
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
            onClick={() => dispatch({ type: actions.SEARCH_TOGGLE })}
          >
            <SearchIcon />
          </IconButton>
        </>
      )}
    </ListItem>
  );
};

export default FilterTodos;
