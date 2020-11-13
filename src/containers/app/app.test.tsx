import App from "./app";
import React from "react";
import { render } from "@testing-library/react";

describe("Components", () => {
  test("Renders React Hooks Todos", () => {
    const { getByText } = render(<App />);
    const headerText = getByText(/React Hooks Todos/i);
    expect(headerText).toBeInTheDocument();
  });
});
