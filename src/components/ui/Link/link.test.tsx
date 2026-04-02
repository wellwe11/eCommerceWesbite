import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it } from "vitest";
import LinkWrapper from "./link";

it("renders correctly and points to the right destination", () => {
  render(
    <MemoryRouter>
      <LinkWrapper to="/target" label="test link">
        Test Link
      </LinkWrapper>
    </MemoryRouter>,
  );

  const link = screen.getByRole("link", { name: /test link/i });
  expect(link).toHaveAttribute("href", "/target");
});

describe("Navbar integration", () => {
  it("should navigate to destination page when link is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <LinkWrapper to="/target" label="test link">
          Test Link
        </LinkWrapper>

        <Routes>
          <Route path="/target" element={<div>This is the target</div>} />
        </Routes>
      </MemoryRouter>,
    );

    const targetLink = screen.getByRole("link", { name: /test link/i });
    fireEvent.click(targetLink);

    expect(screen.getByText(/this is the target/i)).toBeDefined();
  });
});
