import * as utils from "./index";
import * as actions from "../constants/filter";

describe("utils", () => {
  it("uuid", () => {
    const id = utils.uuid();
    expect(id).toBeGreaterThan(1585058456482);
    expect(id).toBeLessThan(99999999999999999);
  });
});
