import * as utils from "./index";

describe("Utils", () => {
  it("uuid", () => {
    const id = utils.uuid();
    expect(id).toBeGreaterThan(1585058456482);
    expect(id).toBeLessThan(9999999999999);
  });
});
