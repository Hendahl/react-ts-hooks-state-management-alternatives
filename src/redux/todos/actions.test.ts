import * as actions from "./actions";

describe("Actions", () => {
  it("addTodo", () => {
    expect(actions.addTodo("test title")).toBeDefined();
  });
});
