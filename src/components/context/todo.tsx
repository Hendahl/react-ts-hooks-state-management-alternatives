import * as actions from "../../constants/actions";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import React, { FC, useContext } from "react";
import Switch from "@material-ui/core/Switch";
import { Context } from "../../context/store";
import { useStyles } from "../../theme";

interface TodoProps {
  todo: Todo;
}

const Todo: FC<TodoProps> = ({ todo }) => {
  const { dispatch } = useContext(Context);
  const classes = useStyles();

  const handleDelete = () => {
    dispatch({ type: actions.DELETE_TODO, id: todo.id });
  };
  const handleEdit = () => {
    dispatch({ type: actions.TOGGLE_TODO, id: todo.id });
  };

  return (
    <ListItem role={undefined} button divider={true}>
      <ListItemIcon>
        <Switch
          checked={todo.completed}
          color="primary"
          onChange={() => handleEdit()}
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
        <IconButton edge="end" aria-label="Delete Todo" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Todo;
