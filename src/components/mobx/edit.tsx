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
  useContext,
  useState,
} from "react";
import TextField from "@material-ui/core/TextField";
import { Context } from "../../context/store";

const EditForm: FC = (): ReactElement => {
  const { dispatch } = useContext(Context);
  /*const [existingTitle] = useState<string>(todo.title);

 
  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    handleChangeTodo({
      ...todo,
      title: e.target.value,
    });
  };

  const handleEditTodoOnEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (
      e.key === "Enter" &&
      todo.title !== "" &&
      todo.title !== existingTitle
    ) {
      handleSaveTodo();
    }
  };

  const handleUndo = () => {
    handleChangeTodo({
      ...todo,
      title: existingTitle,
    });
  };*/

  return (
    <Dialog
      open={true}
      aria-labelledby="editTodo-dialog-title"
      fullWidth={true}
    >
      <DialogTitle id="editTodo-dialog-title">Edit</DialogTitle>
      <DialogContent>
        <DialogContentText>Change title of the todo ...</DialogContentText>
        <TextField
          autoComplete="off"
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          fullWidth
        />
        <TextField
          disabled={true}
          margin="dense"
          id="id"
          label="Id"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary">Reset</Button>
        <Button color="primary">Cancel</Button>
        <Button color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditForm;
