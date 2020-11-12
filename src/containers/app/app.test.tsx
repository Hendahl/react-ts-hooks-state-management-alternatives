import React from "react";
import { render } from "@testing-library/react";
import App from "./app";

describe("Components", () => {
  test("Renders React Hooks Todos", () => {
    const { getByText } = render(<App />);
    const headerText = getByText(/React Hooks Todos/i);
    expect(headerText).toBeInTheDocument();
  });
});
