import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import React, { FC } from "react";
import Typography from "@material-ui/core/Typography";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import * as types from "../../ts/types";

const Todos: FC = () => {
  const typedUseSelector: TypedUseSelectorHook<types.TodosI> = useSelector;
  const todos = typedUseSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <Container>
      <Typography variant="h3" component="h2">
        <Box textAlign="center" m={1}>
          Todos - Redux
        </Box>
      </Typography>
    </Container>
  );
};

export default Todos;

/*import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
  FC,
} from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  createTodoActionCreator,
  editTodoActionCreator,
  toggleTodoActionCreator,
  deleteTodoActionCreator,
  selectTodoActionCreator,
} from "../../reduxtoolkit/store";
import { State } from "./types";

const Todos: FC = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state: State) => state.todos);
  const selectedTodoId = useSelector((state: State) => state.selectedTodo);
  const editedCount = useSelector((state: State) => state.counter);

  const [newTodoInput, setNewTodoInput] = useState<string>("");
  const [editTodoInput, setEditTodoInput] = useState<string>("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const editInput = useRef<HTMLInputElement>(null);

  const selectedTodo =
    (selectedTodoId && todos.find((todo) => todo.id === selectedTodoId)) ||
    null;

  const selectedTodo = null;

  const handleNewInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setNewTodoInput(e.target.value);
  };

  const handleEditInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setEditTodoInput(e.target.value);
  };

  const handleCreateNewTodo = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!newTodoInput.length) return;

    dispatch(createTodoActionCreator({ desc: newTodoInput }));
    setNewTodoInput("");
  };

  const handleSelectTodo = (todoId: string) => (): void => {
    dispatch(selectTodoActionCreator({ id: todoId }));
  };

  const handleEdit = (): void => {
    if (!selectedTodo) return;

    //setEditTodoInput(selectedTodo.desc);
    setIsEditMode(true);
  };

  useEffect(() => {
    if (isEditMode) {
      editInput?.current?.focus();
    }
  }, [isEditMode]);

  const handleUpdate = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!editTodoInput.length || !selectedTodoId) {
      handleCancelUpdate();
      return;
    }

    dispatch(
      editTodoActionCreator({ id: selectedTodoId, desc: editTodoInput })
    );
    setIsEditMode(false);
    setEditTodoInput("");
  };

  const handleCancelUpdate = (
    e?: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e?.preventDefault();
    setIsEditMode(false);
    setEditTodoInput("");
  };

  const handleToggle = (): void => {
    if (!selectedTodoId || !selectedTodo) return;
  };

  const handleDelete = (): void => {
    if (!selectedTodoId) return;

    dispatch(deleteTodoActionCreator({ id: selectedTodoId }));
  };

  return (
    <div>
      <div>Todos Updated Count: {editedCount}</div>
      <div>
        <h1>Todo: Redux vs RTK Edition</h1>
        <form onSubmit={handleCreateNewTodo}>
          <label htmlFor="new-todo">Add new:</label>
          <input
            onChange={handleNewInputChange}
            id="new-todo"
            value={newTodoInput}
          />
          <button type="submit">Create</button>
        </form>
      </div>
      <div>
        <ul>
          <h2>My Todos:</h2>
          {todos.map((todo, i) => (
            <li key={todo.id}>
              <span>{i + 1})</span>
            </li>
          ))}
        </ul>
        <div>
          <h2>Selected Todo:</h2>
        </div>
      </div>
    </div>
  );
};

export default Todos;*/
