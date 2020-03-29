import Add from "./add";
import Box from "@material-ui/core/Box";
import Filter from "./filter";
import List from "@material-ui/core/List";
import Progress from "../shared/progress";
import React, { FC, useMemo } from "react";
import Todo from "./todo";
import Typography from "@material-ui/core/Typography";
import { observer } from "mobx-react-lite";
import { useStore } from "../../mobx/store";
import Container from "@material-ui/core/Container";

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
      <List>
        <Add />
        {todos.visibleTodos.map(_todo => (
          <Todo key={_todo.id} todo={_todo} />
        ))}
        <Filter />
      </List>
    </Container>
  );
});

export default Todos;
