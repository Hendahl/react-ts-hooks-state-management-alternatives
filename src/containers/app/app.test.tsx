import App from "./app";
import React from "react";
import { render } from "@testing-library/react";

describe("Components", () => {
  test("Renders React Hooks TodosT", () => {
    const { getByText } = render(<App />);
    const headerText = getByText(/React Hooks TodosT/i);
    expect(headerText).toBeInTheDocument();
  });
});
