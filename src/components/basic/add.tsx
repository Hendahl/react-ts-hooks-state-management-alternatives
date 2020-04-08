import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import React, {
  ChangeEvent,
  FC,
  FormEvent,
  KeyboardEvent,
  ReactElement,
  useState,
  useEffect,
} from "react";
import TextField from "@material-ui/core/TextField";

interface AddProps {
  todos: Todos;
  handleAddTodo: AddTodo;
  handleChangeTodos: ChangeTodos;
}

const AddForm: FC<AddProps> = ({
  todos,
  handleAddTodo,
  handleChangeTodos,
}: AddProps): ReactElement => {
  const [state, setState] = useState<AddState>({
    title: "",
    isAllCompleted: false,
  });

  useEffect(() => {
    if (todos.payload[0]) {
      setState((state) => ({
        ...state,
        isAllCompleted: !todos.payload[0].completed,
      }));
    }
  }, [todos]);

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, title: e.target.value });
  };

  const onEditAll = (): void => {
    setState({ ...state, isAllCompleted: !state.isAllCompleted });
    handleChangeTodos(state.isAllCompleted);
  };

  const onAdd = (e: FormEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    handleAddTodo(state.title);
    setState({ ...state, title: "" });
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && state.title !== "") {
      handleAddTodo(state.title);
      setState({ ...state, title: "" });
    }
  };
  return (
    <ListItem>
      <ListItemIcon>
        <IconButton
          aria-label="Edit Completed"
          color={state.isAllCompleted ? "primary" : "inherit"}
          disabled={todos.countAll === 0}
          edge="end"
          onClick={onEditAll}
        >
          <KeyboardArrowDownIcon />
        </IconButton>
      </ListItemIcon>
      <TextField
        autoComplete="off"
        fullWidth
        id="title"
        label="What needs to be done?"
        onChange={onChange}
        onKeyPress={onEnter}
        type="text"
        value={state.title}
        variant="outlined"
      />
      <ListItemSecondaryAction>
        <IconButton
          aria-label="Add"
          color="primary"
          disabled={state.title === ""}
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
