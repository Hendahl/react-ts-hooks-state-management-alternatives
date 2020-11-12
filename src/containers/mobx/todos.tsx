import * as t from "../../ts/types";
import AddComponent from "../../components/add";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import EditComponent from "../../components/edit";
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
    todos.getTodos();
  }, [todos]);

  const handleAddTodo = (title: string) => {
    todos.addTodo(title);
  };

  const handleRemoveTodo: t.RemoveTodo = (todo) => {
    todos.removeTodo(todo);
  };

  const handleShowEdit: t.ShowEdit = (todo) => {
    todos.showEdit(todo);
  };

  const handleToggleTodo: t.ToggleTodo = (todo) => {
    todos.toggleTodo(todo);
  };

  const handleSaveTodo: t.SaveTodo = () => {
    todos.saveTodo();
  };

  const handleEditTodo: t.EditTodo = (todo) => {
    todos.editTodo(todo);
  };

  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          Todos - MobX
        </Box>
      </Typography>
      <ProgressComponent isUpdating={todos.isUpdating} />
      {todos.editing.length !== 0 && (
        <EditComponent
          onEditTodo={handleEditTodo}
          onSaveTodo={handleSaveTodo}
          onShowEdit={handleShowEdit}
          todo={todos.editing[0]}
        />
      )}
      <List>
        <AddComponent onAddTodo={handleAddTodo} />
        {todos.visibleTodosView.map((_todo: t.Todo) => (
          <TodoComponent
            key={_todo.id}
            onRemoveTodo={handleRemoveTodo}
            onShowEdit={handleShowEdit}
            onToggleTodo={handleToggleTodo}
            todo={_todo}
          />
        ))}
      </List>
    </Container>
  );
});

export default TodosContainer;
