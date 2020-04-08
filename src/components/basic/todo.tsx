import { useStyles } from "../../theme";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import React, { FC, ReactElement } from "react";
import Switch from "@material-ui/core/Switch";

interface TodoProps {
  handleDelete: Delete;
  handleEditCompleted: Edit;
  handleEditing: Editing;
  todo: Todo;
}

const Todo: FC<TodoProps> = ({
  handleDelete,
  handleEditCompleted,
  handleEditing,
  todo,
}): ReactElement => {
  const classes = useStyles();

  return (
    <>
      <ListItem
        role={undefined}
        button
        divider={true}
        onClick={() => handleEditing(todo)}
      >
        <ListItemIcon>
          <Switch
            checked={todo.completed}
            color="primary"
            onChange={() => handleEditCompleted(todo)}
            value="completed"
            size="small"
          />
        </ListItemIcon>
        <ListItemText
          className={
            todo.completed
              ? classes.listItemTextCompleted
              : classes.listItemText
          }
          primary={todo.title}
          secondary={todo.id}
        />
        <ListItemSecondaryAction>
          <IconButton
            edge="end"
            aria-label="edit"
            onClick={() => handleEditing(todo)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            edge="end"
            aria-label="delete"
            onClick={() => handleDelete(todo)}
          >
            <DeleteIcon />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </>
  );
};

export default Todo;
