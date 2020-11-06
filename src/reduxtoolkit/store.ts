import {
  configureStore,
  createSlice,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import logger from "redux-logger";

const counterSlice = createSlice({
  name: "counter",
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

export const {
  increment: incrementAction,
  increment: decrementAction,
} = counterSlice.actions;

const middleware = [...getDefaultMiddleware(), logger];

export default configureStore({
  reducer: counterSlice.reducer,
  middleware,
});
