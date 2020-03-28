import * as selector from "./index";
import * as actions from "../constants/filter";

describe("Utils", () => {
  it("uuid", () => {
    const id = selector.uuid();
    expect(id).toBeGreaterThan(1585058456482);
    expect(id).toBeLessThan(999999999999999);
  });
});
