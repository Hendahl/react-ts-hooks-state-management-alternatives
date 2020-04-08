import * as filter from "../../constants/filter";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import React, { FC, FormEvent } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../mobx/store";
import { useStyles } from "../../theme";

const FilterTodos: FC = observer(() => {
  const classes = useStyles();
  const { todos } = useStore();

  const handleFilterTodos = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    todos.setFilter(e.currentTarget.id);
  };

  const handleDeleteTodos = () => {
    todos.deleteTodos();
  };

  return (
    <ListItem>
      {todos.countAll !== 0 && (
        <>
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
});

export default FilterTodos;
