import Add from "./add";
import Box from "@material-ui/core/Box";
import Filter from "./filter";
import List from "@material-ui/core/List";
import Progress from "../shared/progress";
import React, { FC, useEffect, useMemo } from "react";
import Todo from "./todo";
import Typography from "@material-ui/core/Typography";
import { observer } from "mobx-react-lite";
import { useStore } from "../../mobx/store";

const Todos: FC = observer(() => {
  const { todos } = useStore();

  useMemo(() => {
    todos.getTodos();
  }, [todos]);

  useEffect(() => {
    if (todos.isUpdating) {
      todos.updateTodos();
    }
  }, [todos]);

  return (
    <>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          Todos - MobX
        </Box>
      </Typography>
      <Progress isUpdating={todos.isUpdating} />
      <List>
        <Add />
        {todos.visible.map(_todo => (
          <Todo key={_todo.id} todo={_todo} />
        ))}
        <Filter />
      </List>
    </>
  );
});

export default Todos;
