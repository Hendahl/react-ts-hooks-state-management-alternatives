import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import React, { FC, useState, ChangeEvent } from "react";
import * as t from "../ts/types";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const FormDialogComponent: FC<{
  showDialogState: boolean;
  setShowDialogState: (showDialogState: boolean) => void;
  todo: t.TodoT;
}> = (props) => {
  const [dataState, setDataState] = useState(props.todo);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>): void => {
    setDataState({ ...dataState, [e.target.id]: e.target.value });
  };

  const handleChangeBoolean = (e: ChangeEvent<HTMLInputElement>): void => {
    setDataState({ ...dataState, [e.target.id]: e.target.checked });
  };

  return (
    <div>
      <Dialog open={props.showDialogState} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Todo {dataState.id}</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormGroup>
              <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Title"
                fullWidth
                value={dataState.title}
                onChange={handleChangeText}
              />
              <FormControlLabel
                control={
                  <Switch
                    color="primary"
                    size="small"
                    id="isCompleted"
                    checked={dataState.isCompleted}
                    onChange={handleChangeBoolean}
                    value={dataState.isCompleted}
                  />
                }
                label="Genomförd"
              />
            </FormGroup>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={() => props.setShowDialogState(false)}
          >
            Avbryt
          </Button>
          <Button color="primary">Spara</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default FormDialogComponent;
