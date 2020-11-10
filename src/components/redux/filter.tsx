import * as actions from "../../redux/todos/actions";
import * as t from "../../ts/types";
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
interface FilterI {
  todos: t.Todos;
}

const FilterComponent: FC = (): ReactElement => {
  const classes = useStyles();
  const typedUseSelector: TypedUseSelectorHook<FilterI> = useSelector;
  const storeTodos = typedUseSelector((state) => state.todos);
  const dispatch = useDispatch();
  const [stateIsAllCompleted, setStateIsAllCompleted] = useState<boolean>(
    false
  );
  const [stateFilter, setStateFilter] = useState<string>(t.ALL_TODOS);

  useEffect(() => {
    if (storeTodos.payload[0]) {
      setStateIsAllCompleted(!storeTodos.payload[0].completed);
    }
  }, [storeTodos]);

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
    if (storeTodos.payload[0]) {
      setStateIsAllCompleted(!stateIsAllCompleted);
    }
    dispatch(actions.toggleTodos(stateIsAllCompleted));
  };

  return (
    <ListItem>
      {storeTodos.countAll !== 0 && (
        <>
          <ListItemIcon>
            <IconButton
              aria-label="Edit Completed"
              color={stateIsAllCompleted ? "primary" : "inherit"}
              disabled={storeTodos.countAll === 0}
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
                  storeTodos.visibilityFilter === t.ALL_TODOS ||
                  storeTodos.countAll === 0
                }
                id={t.ALL_TODOS}
                onClick={handleFilterTodos}
              >
                ALL ({storeTodos.countAll})
              </Button>
              <Button
                disabled={
                  storeTodos.visibilityFilter === t.ACTIVE_TODOS ||
                  storeTodos.countAll === 0
                }
                id={t.ACTIVE_TODOS}
                onClick={handleFilterTodos}
              >
                ACTIVE ({storeTodos.countAll - storeTodos.countCompleted})
              </Button>
              <Button
                disabled={
                  storeTodos.visibilityFilter === t.COMPLETED_TODOS ||
                  storeTodos.countAll === 0
                }
                id={t.COMPLETED_TODOS}
                onClick={handleFilterTodos}
              >
                COMPLETEDED ({storeTodos.countCompleted})
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
                <MenuItem value={t.ALL_TODOS}>
                  ALL ({storeTodos.countAll})
                </MenuItem>
                <MenuItem value={t.ACTIVE_TODOS}>
                  ACTIVE ({storeTodos.countAll - storeTodos.countCompleted})
                </MenuItem>
                <MenuItem value={t.COMPLETED_TODOS}>
                  COMPLETED ({storeTodos.countCompleted})
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
            disabled={storeTodos.isSearching}
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
