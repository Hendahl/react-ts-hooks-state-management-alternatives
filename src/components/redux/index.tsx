import * as actions from "../../redux/todos/actions";
import AddForm from "./add";
import Box from "@material-ui/core/Box";
import FilterTodos from "./filter";
import List from "@material-ui/core/List";
import Progress from "../shared/progress";
import React, { FC, useEffect } from "react";
import Todo from "./todo";
import Typography from "@material-ui/core/Typography";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import Container from "@material-ui/core/Container";

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
      <List>
        <AddForm />
        {todos.visible.map((_todo) => (
          <Todo key={_todo.id} todo={_todo} />
        ))}
        <FilterTodos />
      </List>
    </Container>
  );
};

export default Todos;
