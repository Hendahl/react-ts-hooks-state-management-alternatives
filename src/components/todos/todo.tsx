import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import React, { FC } from "react";
import Switch from "@material-ui/core/Switch";
import { useStyles } from "../../theme";

interface TodoProps {
  handleDelete: Delete;
  handleEdit: Edit;
  todo: Todo;
}

const Todo: FC<TodoProps> = ({ handleDelete, handleEdit, todo }) => {
  const classes = useStyles();
  return (
    <ListItem
      role={undefined}
      button
      divider={true}
      onClick={() => handleEdit(todo)}
    >
      <ListItemIcon>
        <Switch
          checked={todo.completed}
          color="primary"
          onChange={() => handleEdit(todo)}
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
          aria-label="comments"
          onClick={() => handleDelete(todo)}
        >
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};
export default Todo;
