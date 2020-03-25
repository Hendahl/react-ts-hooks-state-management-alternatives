import * as selector from "./index";
import * as actions from "../constants/filter";

describe("Selector", () => {
  it("uuid", () => {
    const id = selector.uuid();
    expect(id).toBeGreaterThan(1585058456482);
    expect(id).toBeLessThan(99999999999999999);
  });
  it("setVisibileTodos", () => {
    const testData = [
      {
        completed: true,
        id: 1,
        title: "A"
      },
      {
        completed: false,
        id: 2,
        title: "B"
      }
    ];
    const testResult = selector.setVisibileTodos(
      testData,
      actions.COMPLETED_TODOS
    );
    expect(testResult).toEqual([
      {
        completed: true,
        id: 1,
        title: "A"
      }
    ]);
  });
});
