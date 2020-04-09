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
  useState,
} from "react";
import TextField from "@material-ui/core/TextField";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
interface EditFormProps {
  todos: Todos;
}

const EditForm: FC = (): ReactElement => {
  const typedUseSelector: TypedUseSelectorHook<EditFormProps> = useSelector;
  const editTodo = typedUseSelector((state) => state.todos.editing[0]);
  const dispatch = useDispatch();
  const [existingTitle] = useState<string>(editTodo.title);

  const handleChangeTodoTitle = (e: ChangeEvent<HTMLInputElement>): void => {
    const todoState = {
      ...editTodo,
      title: e.target.value,
    };
    dispatch({ type: actions.CHANGE_TODO_TITLE, todo: todoState });
  };

  const handleSaveTodoOnEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (
      e.key === "Enter" &&
      editTodo.title !== "" &&
      editTodo.title !== existingTitle
    ) {
      dispatch({ type: actions.SAVE_TODO });
    }
  };

  const handleUndo = () => {
    const todoState = {
      ...editTodo,
      title: existingTitle,
    };
    dispatch({ type: actions.CHANGE_TODO_TITLE, todo: todoState });
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
          onChange={handleChangeTodoTitle}
          onKeyPress={handleSaveTodoOnEnter}
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
          onClick={handleUndo}
        >
          Undo
        </Button>
        <Button
          color="primary"
          onClick={() =>
            dispatch({ type: actions.EDITING_TODO, todo: editTodo })
          }
        >
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={editTodo.title === "" || editTodo.title === existingTitle}
          onClick={() => dispatch({ type: actions.SAVE_TODO })}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditForm;
