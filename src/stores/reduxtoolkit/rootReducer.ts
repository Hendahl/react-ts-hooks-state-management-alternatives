import { combineReducers } from "@reduxjs/toolkit";

import todosReducer from "./todos/slices";

const rootReducer = combineReducers({
  todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
