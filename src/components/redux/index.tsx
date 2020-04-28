import * as actions from "../../redux/todos/actions";
import AddForm from "./add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import EditForm from "./edit";
import FilterTodos from "./filter";
import List from "@material-ui/core/List";
import Progress from "../shared/progress";
import React, { FC, useEffect } from "react";
import Todo from "./todo";
import Typography from "@material-ui/core/Typography";
import SearchForm from "./search";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

interface TodosProps {
  todos: Todos;
}

const Todos: FC = () => {
  const typedUseSelector: TypedUseSelectorHook<TodosProps> = useSelector;
  const todos = typedUseSelector((state) => state.todos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getTodos());
  }, [dispatch]);

  useEffect(() => {
    if (todos.isUpdating) {
      dispatch(actions.updateTodos());
    }
  }, [todos, dispatch]);

  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          Todos - Redux
        </Box>
      </Typography>
      <Progress isUpdating={todos.isUpdating} />
      {todos.editing.length !== 0 && <EditForm />}
      <List>
        {todos.isSearching ? (
          <SearchForm />
        ) : (
          <>
            <AddForm />
            <FilterTodos />
          </>
        )}
        {todos.visible.map((_todo: Todo) => (
          <Todo key={_todo.id} todo={_todo} />
        ))}
      </List>
    </Container>
  );
};

export default Todos;
