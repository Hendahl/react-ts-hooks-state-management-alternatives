import React, {
  ChangeEvent,
  FC,
  KeyboardEvent,
  ReactElement,
  useState,
} from "react";
import { add } from "../../reduxtoolkit/todos";
import { useDispatch } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import TextField from "@material-ui/core/TextField";

const AddComponent: FC = (): ReactElement => {
  const dispatch = useDispatch();
  const [stateTitle, setStateTitle] = useState<string>("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setStateTitle(e.target.value);
  };

  const handleEnter = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && stateTitle !== "") {
      dispatch(add({ title: stateTitle }));
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

export default AddComponent;
