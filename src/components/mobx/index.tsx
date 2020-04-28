import AddForm from "./add";
import Box from "@material-ui/core/Box";
import FilterTodos from "./filter";
import List from "@material-ui/core/List";
import Progress from "../shared/progress";
import React, { FC, useMemo } from "react";
import Todo from "./todo";
import Typography from "@material-ui/core/Typography";
import { observer } from "mobx-react-lite";
import { useStore } from "../../mobx/store";
import Container from "@material-ui/core/Container";
import EditForm from "./edit";
import SearchForm from "./search";

const Todos: FC = observer(() => {
  const { todos } = useStore();

  useMemo(() => {
    todos.getTodos();
  }, [todos]);

  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          Todos - MobX
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
        {todos.visibleView.map((_todo: Todo) => (
          <Todo key={_todo.id} todo={_todo} />
        ))}
      </List>
    </Container>
  );
});

export default Todos;
