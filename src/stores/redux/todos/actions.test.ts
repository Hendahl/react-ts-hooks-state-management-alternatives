import * as actions from "./actions";

describe("Actions", () => {
  it("add", () => {
    expect(actions.add("test title")).toBeDefined();
  });
});
