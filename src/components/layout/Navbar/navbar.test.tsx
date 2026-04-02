import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { expect, it, describe } from "vitest";
import Navbar from "./navbar";

describe("Navbar Navigation Links", () => {
  it("should have the correct paths for all navigation buttons", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const homeLink = screen.getByRole("link", { name: /home/i });
    const galleryLink = screen.getByRole("link", { name: /gallery/i });
    const contactLink = screen.getByRole("link", { name: /contact/i });

    expect(homeLink).toHaveAttribute("href", "/");
    expect(galleryLink).toHaveAttribute("href", "/gallery");
    expect(contactLink).toHaveAttribute("href", "/contact");
  });
});
