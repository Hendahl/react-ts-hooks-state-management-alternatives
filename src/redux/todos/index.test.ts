import * as t from "../../ts/types";
import reducer from "./index";

describe("Reducer", () => {
  it(t.DELETE_TODOS, () => {
    expect(reducer({}, { type: t.DELETE_TODOS }));
  });
});
