import * as actions from "../../redux/todos/actions";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import React, { FC } from "react";
import Switch from "@material-ui/core/Switch";
import { useDispatch } from "react-redux";
import { useStyles } from "../../theme";
import EditIcon from "@material-ui/icons/Edit";
import * as t from "../../ts/types";

const TodoComponent: FC<{
  todo: t.Todo;
}> = ({ todo }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  return (
    <ListItem role={undefined} button divider={true}>
      <ListItemIcon>
        <Switch
          checked={todo.completed}
          color="primary"
          value="completed"
          size="small"
          onChange={() => dispatch(actions.toggleTodo(todo))}
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
          aria-label="Delete Todo"
          onClick={() => dispatch(actions.removeTodo(todo))}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          edge="end"
          aria-label="edit"
          onClick={() => dispatch(actions.showEdit(todo))}
        >
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default TodoComponent;
