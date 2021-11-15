import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "@/pages/login/index";

describe("login", () => {
  it("renders a heading", () => {
    expect.hasAssertions();
    render(<Login />);

    const heading = screen.getByRole("heading", {
      name: /Login/i,
    });

    expect(heading).toBeInTheDocument();
  });
  it("dani test", () => {
    expect.hasAssertions();
    const colorButton = screen.getByRole("button", {
      name: "Change to Midnight Blue",
    });

    expect(colorButton).toHaveTextContent("Change to Medium Violet Red");
  });
});
