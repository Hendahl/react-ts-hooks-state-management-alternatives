import { useStyles } from "../../theme";
import * as filter from "../../constants/filter";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import React, { FC, FormEvent, ReactElement, useState, useEffect } from "react";
import SearchIcon from "@material-ui/icons/Search";

interface FilterProps {
  handleChangeTodosCompleted: ChangeTodos;
  handleDeleteTodos: DeleteTodos;
  handleFilterTodos: FilterTodos;
  todos: Todos;
}

const FilterTodos: FC<FilterProps> = ({
  handleChangeTodosCompleted,
  handleDeleteTodos,
  handleFilterTodos,
  todos,
}: FilterProps): ReactElement => {
  const classes = useStyles();
  const [isAllCompleted, setIsAllCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (todos.payload[0]) {
      setIsAllCompleted((isAllCompleted) => !todos.payload[0].completed);
    }
  }, [todos]);

  const onFilter = (e: FormEvent<HTMLButtonElement>): void => {
    console.log(e.currentTarget.id);
    e.preventDefault();
    handleFilterTodos(e.currentTarget.id);
  };

  const onEditAll = (): void => {
    setIsAllCompleted(isAllCompleted);
    handleChangeTodosCompleted(isAllCompleted);
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
              onClick={onEditAll}
            >
              <KeyboardArrowDownIcon />
            </IconButton>
          </ListItemIcon>
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
              onClick={onFilter}
            >
              ALL ({todos.countAll})
            </Button>
            <Button
              disabled={
                todos.visibilityFilter === filter.ACTIVE_TODOS ||
                todos.countAll === 0
              }
              id={filter.ACTIVE_TODOS}
              onClick={onFilter}
            >
              ACTIVE ({todos.countAll - todos.countCompleted})
            </Button>
            <Button
              disabled={
                todos.visibilityFilter === filter.COMPLETED_TODOS ||
                todos.countAll === 0
              }
              id={filter.COMPLETED_TODOS}
              onClick={onFilter}
            >
              COMPLETEDED ({todos.countCompleted})
            </Button>
          </ButtonGroup>
          <IconButton
            color="primary"
            edge="end"
            aria-label="Delete all"
            onClick={handleDeleteTodos}
          >
            <SearchIcon />
          </IconButton>
          <IconButton
            color="primary"
            edge="end"
            aria-label="Delete all"
            onClick={handleDeleteTodos}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </ListItem>
  );
};

export default FilterTodos;
