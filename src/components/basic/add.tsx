import ListItem from "@material-ui/core/ListItem";
import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  ReactElement,
  useState,
} from "react";
import TextField from "@material-ui/core/TextField";

interface AddProps {
  onAddTodo: AddTodo;
}

const AddForm: FC<AddProps> = ({ onAddTodo }): ReactElement => {
  const [stateTitle, setStateTitle] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setStateTitle(e.target.value);
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && stateTitle !== "") {
      onAddTodo(stateTitle);
      setStateTitle("");
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
        value={stateTitle}
        variant="outlined"
      />
    </ListItem>
  );
};

export default AddForm;
