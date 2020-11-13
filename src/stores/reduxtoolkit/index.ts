import logger from "redux-logger";
import rootReducer from "./rootReducer";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

const middleware = [...getDefaultMiddleware(), logger];

export default configureStore({
  reducer: rootReducer,
  middleware,
});
