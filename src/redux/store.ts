import rootReducer from "./rootReducer";
import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";
import { createLogger } from "redux-logger";

const logger = createLogger({
  collapsed: true
});

const initialTodos = {};
const enhancers = [];
export const middleware = [thunk];

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w: any = window as any;
  const devToolsExtension = w.__REDUX_DEVTOOLS_EXTENSION__;
  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware, logger),
  ...enhancers
);

export default createStore(rootReducer, initialTodos, composedEnhancers);
