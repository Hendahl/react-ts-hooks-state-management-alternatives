import AddComponent from "./add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import EditComponent from "./edit";
import FilterComponent from "./filter";
import List from "@material-ui/core/List";
import ProgressComponent from "./progress";
import React, { FC, useMemo } from "react";
import TodoComponent from "./todo";
import Typography from "@material-ui/core/Typography";
import { observer } from "mobx-react-lite";
import { useStore } from "../../mobx/store";

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
      <ProgressComponent isUpdating={todos.isUpdating} />
      {todos.editing.length !== 0 && <EditComponent />}
      <List>
        <AddComponent />
        <FilterComponent />
        {todos.visibleView.map((_todo: Todo) => (
          <TodoComponent key={_todo.id} todo={_todo} />
        ))}
      </List>
    </Container>
  );
});

export default Todos;
