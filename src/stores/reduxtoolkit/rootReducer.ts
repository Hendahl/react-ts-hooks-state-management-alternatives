import todosReducer from "./todos/slices";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
