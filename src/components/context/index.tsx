import * as actions from "../../constants/actions";
import Add from "./add";
import Box from "@material-ui/core/Box";
import Filter from "./filter";
import List from "@material-ui/core/List";
import Progress from "../shared/progress";
import React, { FC, useContext, useEffect } from "react";
import Todo from "./todo";
import Typography from "@material-ui/core/Typography";
import { Context } from "../../context/store";
import Container from "@material-ui/core/Container";

const Todos: FC = () => {
  const { todos, dispatch } = useContext(Context);

  useEffect(() => {
    if (todos.isUpdating) {
      dispatch({ type: actions.UPDATE_TODOS });
    }
  }, [todos, dispatch]);

  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          Todos - Context
        </Box>
      </Typography>
      <Progress isUpdating={todos.isUpdating} />
      <List>
        <Add />
        {todos.visible.map((_todo: Todo) => (
          <Todo key={_todo.id} todo={_todo} />
        ))}
        <Filter />
      </List>
    </Container>
  );
};

export default Todos;
