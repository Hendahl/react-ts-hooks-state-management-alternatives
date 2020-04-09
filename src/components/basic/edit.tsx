import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import React, {
  ChangeEvent,
  FC,
  ReactElement,
  KeyboardEvent,
  useState,
} from "react";
import TextField from "@material-ui/core/TextField";

interface EditFormProps {
  handleSaveTodo: SaveTodo;
  handleEditing: EditingTodo;
  handleChangeTodoTitle: ChangeTodo;
  editTodo: Todo;
}

const EditForm: FC<EditFormProps> = ({
  handleSaveTodo,
  handleChangeTodoTitle,
  handleEditing,
  editTodo,
}): ReactElement => {
  const [existingTitle] = useState<string>(editTodo.title);

  const onChangeTodoTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    handleChangeTodoTitle({
      ...editTodo,
      title: e.target.value,
    });
  };

  const onSaveTodoOnEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (
      e.key === "Enter" &&
      editTodo.title !== "" &&
      editTodo.title !== existingTitle
    ) {
      handleSaveTodo();
    }
  };

  const onUndo = () => {
    handleChangeTodoTitle({
      ...editTodo,
      title: existingTitle,
    });
  };

  return (
    <Dialog
      open={true}
      aria-labelledby="editTodo-dialog-title"
      fullWidth={true}
    >
      <DialogTitle id="editTodo-dialog-title">
        Edit : {existingTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Change title of the todo ...</DialogContentText>
        <TextField
          autoComplete="off"
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          fullWidth
          value={editTodo.title}
          onChange={onChangeTodoTitle}
          onKeyPress={onSaveTodoOnEnter}
        />
        <TextField
          disabled={true}
          margin="dense"
          id="id"
          label="Id"
          fullWidth
          value={editTodo.id}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          disabled={editTodo.title === existingTitle}
          onClick={onUndo}
        >
          Reset
        </Button>
        <Button color="primary" onClick={() => handleEditing(editTodo)}>
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={editTodo.title === "" || editTodo.title === existingTitle}
          onClick={() => handleSaveTodo()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditForm;
