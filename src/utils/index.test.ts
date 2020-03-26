import * as selector from "./index";
import * as actions from "../constants/filter";

describe("Selector", () => {
  it("uuid", () => {
    const id = selector.uuid();
    expect(id).toBeGreaterThan(1585058456482);
    expect(id).toBeLessThan(99999999999999999);
  });
});
