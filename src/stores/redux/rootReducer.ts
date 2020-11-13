import todos from "./todos/reducers";
import { combineReducers } from "redux";

const RootReducer = combineReducers({
  todos,
});

export default RootReducer;
