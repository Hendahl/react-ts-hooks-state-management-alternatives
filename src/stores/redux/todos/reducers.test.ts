import * as t from "../../../ts/types";
import reducer from "./reducers";

describe("Reducer", () => {
  it(t.REMOVE_ALL, () => {
    expect(reducer({}, { type: t.REMOVE_ALL }));
  });
});
