import { Store } from "pullstate";
import * as t from "../../ts/types";

export const pullStateStore = new Store(t.initialTodos);
