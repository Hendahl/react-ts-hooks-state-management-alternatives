import * as t from "../../ts/types";
import AddComponent from "../../components/add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import List from "@material-ui/core/List";
import ProgressComponent from "../../components/progress";
import React, { FC, useMemo } from "react";
import TodoComponent from "../../components/todo";
import Typography from "@material-ui/core/Typography";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/mobx";

const TodosContainer: FC = observer(() => {
  const { todos } = useStore();

  useMemo(() => {
    todos.get();
  }, [todos]);

  const handleAdd = (title: string) => {
    todos.add(title);
  };

  const handleRemove: t.Remove = (todo) => {
    todos.remove(todo);
  };

  const handleToggle: t.Toggle = (todo) => {
    todos.toggle(todo);
  };

  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          Todos - MobX
        </Box>
      </Typography>
      <ProgressComponent isUpdating={todos.isUpdating} />
      <List>
        <AddComponent add={handleAdd} />
        {todos.visibleTodosView.map((_todo: t.TodoT) => (
          <TodoComponent
            key={_todo.id}
            remove={handleRemove}
            toggle={handleToggle}
            todo={_todo}
          />
        ))}
      </List>
    </Container>
  );
});

export default TodosContainer;
