import { getIntroText, getLinkText } from "../pageObjects/app";
import { load } from "../pageObjects/index";

describe("React App", () => {
  beforeEach(async () => {
    await load();
  });

  it("should show Home Text", async () => {
    expect(await getIntroText()).toBe("Home");
  });

  it("First link text", async () => {
    expect(await getLinkText()).toBe("Basic");
  });

  it("Take a screendump", async () => {
    await page.screenshot({ path: "example.png" });
  });
});
