import * as actions from "../../constants/actions";
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
  const { todos, dispatch } = useContext(Context);
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
          value={todos.editing[0].title}
        />
        <TextField
          disabled={true}
          margin="dense"
          id="id"
          label="Id"
          fullWidth
          value={todos.editing[0].id}
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary">Reset</Button>
        <Button
          color="primary"
          onClick={() =>
            dispatch({ type: actions.EDITING_TODO, todo: todos.editing[0] })
          }
        >
          Cancel
        </Button>
        <Button color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditForm;
