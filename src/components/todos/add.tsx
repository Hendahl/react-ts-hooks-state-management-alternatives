import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import TextField from "@material-ui/core/TextField";
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEvent,
  ReactElement,
  useState,
} from "react";

interface AddProps {
  todos: Todos;
  handleAddTodo: AddTodo;
}

const AddForm: FC<AddProps> = ({
  todos,
  handleAddTodo,
}: AddProps): ReactElement => {
  const [newTitle, setNewTitle] = useState<string>();

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTitle(e.target.value);
  };

  const onAdd = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    handleAddTodo(newTitle);
    setNewTitle("");
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && newTitle !== "") {
      handleAddTodo(newTitle);
      setNewTitle("");
    }
  };
  return (
    <ListItem>
      <TextField
        autoComplete="off"
        fullWidth
        id="title"
        label="What needs to be done?"
        onChange={onChange}
        onKeyPress={onEnter}
        type="text"
        value={newTitle}
        variant="outlined"
      />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Add"
          color="primary"
          disabled={newTitle === ""}
          edge="end"
          onClick={onAdd}
        >
          <AddIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default AddForm;
