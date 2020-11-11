import { combineReducers } from "@reduxjs/toolkit";

import todosReducer from "./todos";

const rootReducer = combineReducers({
  todos: todosReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
