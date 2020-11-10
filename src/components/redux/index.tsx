import * as actions from "../../redux/todos/actions";
import AddComponent from "./add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import EditComponent from "./edit";
import FilterComponent from "./filter";
import List from "@material-ui/core/List";
import ProgressComponent from "./progress";
import React, { FC, useEffect } from "react";
import TodoComponent from "./todo";
import Typography from "@material-ui/core/Typography";
import SearchComponent from "./search";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import * as t from "../../ts/types";

const Todos: FC = () => {
  const typedUseSelector: TypedUseSelectorHook<t.TodosI> = useSelector;
  const storeTodos = typedUseSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getTodos());
    // a callback is recommended here
  }, [dispatch]);

  useEffect(() => {
    if (storeTodos.isUpdating) {
      dispatch(actions.updateTodos());
    }
  }, [storeTodos, dispatch]);

  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          Todos - Redux
        </Box>
      </Typography>
      <ProgressComponent isUpdating={storeTodos.isUpdating} />
      {storeTodos.editing.length !== 0 && <EditComponent />}
      <List>
        {storeTodos.isSearching ? (
          <SearchComponent />
        ) : (
          <>
            <AddComponent />
            <FilterComponent />
          </>
        )}
        {storeTodos.visible.map((_todo: t.Todo) => (
          <TodoComponent key={_todo.id} todo={_todo} />
        ))}
      </List>
    </Container>
  );
};

export default Todos;
