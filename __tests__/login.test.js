import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "@/pages/login/index";

// In a describe block
describe("test suite", () => {
  it("initial conditions", () => {
    render(<Login />);
  });
});
