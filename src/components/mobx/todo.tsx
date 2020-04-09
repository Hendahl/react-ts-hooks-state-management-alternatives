import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import React, { FC } from "react";
import Switch from "@material-ui/core/Switch";
import { observer } from "mobx-react-lite";
import { useStore } from "../../mobx/store";
import { useStyles } from "../../theme";
import EditIcon from "@material-ui/icons/Edit";

interface TodoProps {
  todo: Todo;
}

const Todo: FC<TodoProps> = observer(({ todo }) => {
  const classes = useStyles();
  const { todos } = useStore();

  return (
    <ListItem role={undefined} button divider={true}>
      <ListItemIcon>
        <Switch
          checked={todo.completed}
          onChange={() => todos.editTodo(todo)}
          color="primary"
          value="completed"
          size="small"
        />
      </ListItemIcon>
      <ListItemText
        className={
          todo.completed ? classes.listItemTextCompleted : classes.listItemText
        }
        primary={todo.title}
        secondary={todo.id}
      />
      <ListItemSecondaryAction>
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => todos.editingTodo(todo)}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="Delete Todo"
          onClick={() => todos.deleteTodo(todo)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
});

export default Todo;
