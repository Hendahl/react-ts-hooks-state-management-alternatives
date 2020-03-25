import * as actions from "../../constants/actions";
import reducer from "./index";

describe("Reducer", () => {
  it(actions.DELETE_TODOS, () => {
    expect(reducer({}, { type: actions.DELETE_TODOS }));
  });
});
