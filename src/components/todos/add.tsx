import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  ReactElement,
  useState,
} from "react";

interface AddProps {
  todos: Todos;
  handleAddTodo: AddTodo;
}

type AddState = {
  title: string;
};

const AddForm: FC<AddProps> = ({
  todos,
  handleAddTodo,
}: AddProps): ReactElement => {
  const [state, setState] = useState<AddState>({
    title: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, title: e.target.value });
  };

  const onEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && state.title !== "") {
      handleAddTodo(state.title);
      setState({ ...state, title: "" });
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
        value={state.title}
        variant="outlined"
      />
    </ListItem>
  );
};

export default AddForm;
