import { useStyles } from "../../theme";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import React, {
  ChangeEvent,
  FC,
  useState,
  ReactElement,
  KeyboardEvent,
} from "react";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

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
  const [editState, setEditState] = useState<EditState>({
    isEditing: false,
    title: todo.title,
  });

  const handleEditCompleted = () => {
    handleEdit({
      ...todo,
      completed: !todo.completed,
    });
  };

  const handleEditDialog = (isEditing: boolean): void => {
    setEditState({
      ...todo,
      isEditing: isEditing,
    });
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditState({ ...editState, title: e.target.value });
  };

  const handleEditTitle = (): void => {
    handleEdit({
      ...todo,
      title: editState.title,
    });
    handleEditDialog(false);
  };

  const handleEditTitleOnEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (
      e.key === "Enter" &&
      editState.title !== "" &&
      editState.title !== todo.title
    ) {
      handleEdit({
        ...todo,
        title: editState.title,
      });
      handleEditDialog(false);
    }
  };

  return (
    <>
      <Dialog open={editState.isEditing} aria-labelledby="todo-dialog-title">
        <DialogTitle id="todo-dialog-title">Edit {todo.title}</DialogTitle>
        <DialogContent>
          <DialogContentText>Change title of the todo ...</DialogContentText>
          <TextField
            autoComplete="off"
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
            value={editState.title}
            onChange={handleTitleChange}
            onKeyPress={handleEditTitleOnEnter}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => handleEditDialog(false)}>
            Cancel
          </Button>
          <Button
            color="primary"
            disabled={editState.title === "" || editState.title === todo.title}
            onClick={handleEditTitle}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
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
            onClick={() => handleEditDialog(true)}
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
