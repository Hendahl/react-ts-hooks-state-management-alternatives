import * as filter from "../../constants/filter";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import React, { FC, FormEvent } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../mobx/store";

const Filter: FC = observer(() => {
  const { todos } = useStore();

  const handleFilter = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    todos.setFilter(e.currentTarget.id);
  };

  const handleDeleteAll = () => {
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
            style={{ margin: "0 auto" }}
          >
            <Button
              disabled={
                todos.visibilityFilter === filter.ALL_TODOS ||
                todos.countAll === 0
              }
              id={filter.ALL_TODOS}
              onClick={handleFilter}
            >
              ALL ({todos.countAll})
            </Button>
            <Button
              disabled={
                todos.visibilityFilter === filter.ACTIVE_TODOS ||
                todos.countAll === 0
              }
              id={filter.ACTIVE_TODOS}
              onClick={handleFilter}
            >
              ACTIVE ({todos.countAll - todos.countCompleted})
            </Button>
            <Button
              disabled={
                todos.visibilityFilter === filter.COMPLETED_TODOS ||
                todos.countAll === 0
              }
              id={filter.COMPLETED_TODOS}
              onClick={handleFilter}
            >
              COMPLETEDED ({todos.countCompleted})
            </Button>
          </ButtonGroup>
          <IconButton
            edge="end"
            aria-label="Delete all"
            onClick={handleDeleteAll}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </ListItem>
  );
});

export default Filter;
