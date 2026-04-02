import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it } from "vitest";
import Navbar from "./navbar";

it("renders correct navigation structure", () => {
  render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>,
  );

  expect(screen.getByText(/home/i)).toBeDefined();
  expect(screen.getByText(/gallery/i)).toBeDefined();
  expect(screen.getByText(/contact/i)).toBeDefined();
  expect(screen.getByText(/contact/i)).toBeDefined();
});
