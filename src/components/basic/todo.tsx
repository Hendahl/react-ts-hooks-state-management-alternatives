import { useStyles } from "../../theme";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import React, { FC, useState, ReactElement } from "react";
import Switch from "@material-ui/core/Switch";
import EditForm from "./edit";

interface TodoProps {
  handleDelete: Delete;
  handleEdit: (todo: Todo) => void;
  todo: Todo;
}

const Todo: FC<TodoProps> = ({
  handleDelete,
  handleEdit,
  todo,
}): ReactElement => {
  const classes = useStyles();
  const [isEditing, setIsEditing] = useState(false);

  const handleEditCompleted = () => {
    handleEdit({
      ...todo,
      completed: !todo.completed,
    });
  };

  return (
    <>
      <EditForm
        handleEdit={handleEdit}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        todo={todo}
      />
      <ListItem
        role={undefined}
        button
        divider={true}
        onClick={handleEditCompleted}
      >
        <ListItemIcon>
          <Switch
            checked={todo.completed}
            color="primary"
            onChange={handleEditCompleted}
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
            onClick={() => setIsEditing(true)}
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
