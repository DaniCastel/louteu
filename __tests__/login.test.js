/**
 * @jest-environment jsdom
 */

import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "@/pages/login/index";

describe("Login", () => {
  it("renders a heading", () => {
    render(<Login />);

    const heading = screen.getByRole("heading", {
      name: /Login/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
