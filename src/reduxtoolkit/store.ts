import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import rootReducer from "./rootReducer";

const middleware = [...getDefaultMiddleware(), logger];

export default configureStore({
  reducer: rootReducer,
  middleware,
});
