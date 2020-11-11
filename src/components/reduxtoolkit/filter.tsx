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
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../reduxtoolkit/rootReducer";
import { useStyles } from "../../theme";
import {
  filter,
  removeAll,
  showSearch,
  toggleAll,
} from "../../reduxtoolkit/todos";
import React, {
  FC,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
  ChangeEvent,
} from "react";

const FilterComponent: FC = (): ReactElement => {
  const classes = useStyles();
  const {
    countAll,
    countCompleted,
    data,
    isSearching,
    visibilityFilter,
  } = useSelector((state: RootState) => state.todos);
  const dispatch = useDispatch();
  const [stateIsAllCompleted, setStateIsAllCompleted] = useState<boolean>(
    false
  );
  const [stateFilter, setStateFilter] = useState<string>(t.FILTER_ALL);

  useEffect(() => {
    if (data[0]) {
      setStateIsAllCompleted(!data[0].completed);
    }
  }, [data]);

  const handleChange = (e: ChangeEvent<{ value: unknown }>) => {
    setStateFilter(e.target.value as string);
    dispatch(filter({ filter: e.target.value as string }));
  };

  const handleDeleteTodos = () => {
    dispatch(removeAll());
  };

  const handleFilterTodos = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    dispatch(filter({ filter: e.currentTarget.id }));
  };

  const handleToggleTodos = (): void => {
    if (data[0]) {
      setStateIsAllCompleted(!stateIsAllCompleted);
    }
    dispatch(toggleAll({ isAllCompleted: stateIsAllCompleted }));
  };

  return (
    <ListItem>
      {countAll !== 0 && (
        <>
          <ListItemIcon>
            <IconButton
              aria-label="Edit Completed"
              color={stateIsAllCompleted ? "primary" : "inherit"}
              disabled={countAll === 0}
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
                disabled={visibilityFilter === t.FILTER_ALL || countAll === 0}
                id={t.FILTER_ALL}
                onClick={handleFilterTodos}
              >
                ALL ({countAll})
              </Button>
              <Button
                disabled={
                  visibilityFilter === t.FILTER_ACTIVE || countAll === 0
                }
                id={t.FILTER_ACTIVE}
                onClick={handleFilterTodos}
              >
                ACTIVE ({countAll - countCompleted})
              </Button>
              <Button
                disabled={
                  visibilityFilter === t.FILTER_COMPLETED || countAll === 0
                }
                id={t.FILTER_COMPLETED}
                onClick={handleFilterTodos}
              >
                COMPLETEDED ({countCompleted})
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
                <MenuItem value={t.FILTER_ALL}>ALL ({countAll})</MenuItem>
                <MenuItem value={t.FILTER_ACTIVE}>
                  ACTIVE ({countAll - countCompleted})
                </MenuItem>
                <MenuItem value={t.FILTER_COMPLETED}>
                  COMPLETED ({countCompleted})
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
            disabled={isSearching}
            edge="end"
            aria-label="Search"
            onClick={() => dispatch(showSearch())}
          >
            <SearchIcon />
          </IconButton>
        </>
      )}
    </ListItem>
  );
};

export default FilterComponent;
