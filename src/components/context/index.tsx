import * as types from "../../ts/types";
import AddComponent from "./add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import EditComponent from "./edit";
import FilterComponent from "./filter";
import List from "@material-ui/core/List";
import ProgressComponent from "./progress";
import React, { FC, useContext, useEffect } from "react";
import SearchComponent from "./search";
import TodoComponent from "./todo";
import Typography from "@material-ui/core/Typography";
import { Context } from "../../context/store";

const Todos: FC = () => {
  const { todos, dispatch } = useContext(Context);

  useEffect(() => {
    if (todos.isUpdating) {
      dispatch({ type: types.UPDATE_TODOS });
    }
  }, [todos, dispatch]);

  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          Todos - Context
        </Box>
      </Typography>
      <ProgressComponent isUpdating={todos.isUpdating} />
      {todos.editing.length !== 0 && <EditComponent />}
      <List>
        {todos.isSearching ? (
          <SearchComponent />
        ) : (
          <>
            <AddComponent />
            <FilterComponent />
          </>
        )}
        {todos.visible.map((_todo: types.Todo) => (
          <TodoComponent key={_todo.id} todo={_todo} />
        ))}
      </List>
    </Container>
  );
};

export default Todos;
