import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";
import { useStore } from "../../mobx/store";
import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  ReactElement,
  useState,
} from "react";

const AddForm: FC = (): ReactElement => {
  const { todos } = useStore();
  const [state, setState] = useState<AddState>({
    title: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setState({ ...state, title: e.target.value });
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && state.title !== "") {
      todos.addTodo(state.title);
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
        onChange={handleChange}
        onKeyPress={handleEnter}
        type="text"
        value={state.title}
        variant="outlined"
      />
    </ListItem>
  );
};

export default AddForm;
