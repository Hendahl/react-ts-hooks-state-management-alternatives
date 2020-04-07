import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, {
  ChangeEvent,
  FC,
  useState,
  ReactElement,
  KeyboardEvent,
} from "react";
import TextField from "@material-ui/core/TextField";

interface EditFormProps {
  setIsEditing: (isEditing: boolean) => void;
  handleEdit: (todo: Todo) => void;
  todo: Todo;
  isEditing: boolean;
}

const EditForm: FC<EditFormProps> = ({
  isEditing,
  handleEdit,
  setIsEditing,
  todo,
}): ReactElement => {
  const [title, setTitle] = useState<string>(todo.title);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const handleEditTitle = (): void => {
    handleEdit({
      ...todo,
      title: title,
    });
    setIsEditing(false);
  };

  const handleEditTitleOnEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && title !== "" && title !== todo.title) {
      handleEdit({
        ...todo,
        title: title,
      });
      setIsEditing(false);
    }
  };

  return (
    <Dialog open={isEditing} aria-labelledby="todo-dialog-title">
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
          value={title}
          onChange={handleTitleChange}
          onKeyPress={handleEditTitleOnEnter}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => setIsEditing(false)}>
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={title === "" || title === todo.title}
          onClick={handleEditTitle}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditForm;
