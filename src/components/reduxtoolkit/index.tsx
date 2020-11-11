import * as t from "../../ts/types";
import AddComponent from "./add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import FilterComponent from "./filter";
import List from "@material-ui/core/List";
import ProgressComponent from "../progress";
import React, { FC, useEffect } from "react";
import SearchComponent from "./search";
import TodoComponent from "./todo";
import Typography from "@material-ui/core/Typography";
import { get, update } from "../../reduxtoolkit/todos";
import { getTodosApi } from "../../api";
import { RootState } from "../../reduxtoolkit/rootReducer";
import { useDispatch, useSelector } from "react-redux";
import EditComponent from "./edit";

const Todos: FC = () => {
  const dispatch = useDispatch();
  const { editing, isUpdating, visibleTodos, isSearching } = useSelector(
    (state: RootState) => state.todos
  );

  useEffect(() => {
    dispatch(get(getTodosApi()));
  }, [dispatch]);

  useEffect(() => {
    if (isUpdating) {
      dispatch(update());
    }
  }, [isUpdating, dispatch]);

  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          Todos - Redux - Toolkit
        </Box>
      </Typography>
      <ProgressComponent isUpdating={isUpdating} />
      {editing.length !== 0 && <EditComponent />}
      <List>
        {isSearching ? (
          <SearchComponent visibleTodosLength={visibleTodos.length} />
        ) : (
          <>
            <AddComponent />
            <FilterComponent />
          </>
        )}
        {visibleTodos.map((_todo: t.Todo) => (
          <TodoComponent key={_todo.id} todo={_todo} />
        ))}
      </List>
    </Container>
  );
};

export default Todos;
