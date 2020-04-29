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

type Todo = {
  completed: boolean;
  id: number;
  title: string;
};

type Todos = {
  countAll: number;
  countCompleted: number;
  isSearching: boolean;
  isUpdating: boolean;
  payload: Todo[];
  visibilityFilter: string;
  visible: Todo[];
  editing: Todo[];
};
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
        {todos.visible.map((_todo: Todo) => (
          <TodoComponent key={_todo.id} todo={_todo} />
        ))}
      </List>
    </Container>
  );
};

export default Todos;
