import React from "react";
import { render } from "@testing-library/react";
import App from "./app";

describe("Components", () => {
  test("Renders React Hooks TodosT", () => {
    const { getByText } = render(<App />);
    const headerText = getByText(/React Hooks TodosT/i);
    expect(headerText).toBeInTheDocument();
  });
});
