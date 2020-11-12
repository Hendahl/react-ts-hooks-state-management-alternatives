import { combineReducers } from "redux";
import todos from "./todos/reducers";

const RootReducer = combineReducers({
  todos,
});

export default RootReducer;
