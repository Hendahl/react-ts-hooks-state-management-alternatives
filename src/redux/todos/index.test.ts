import * as t from "../../ts/types";
import reducer from "./reducers";

describe("Reducer", () => {
  it(t.TODOS_DELETE, () => {
    expect(reducer({}, { type: t.TODOS_DELETE }));
  });
});
