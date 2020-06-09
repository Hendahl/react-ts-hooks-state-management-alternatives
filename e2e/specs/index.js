import { load, getTitle, getScreenImage } from "../pageObjects/index";

describe("React App", () => {
  it("should be titled 'React Hooks Todos'", async () => {
    await load();
    expect(await getTitle()).toBe("React Hooks Todos");
    await getScreenImage();
  });
});
