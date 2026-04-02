import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { expect, it, describe } from "vitest";
import Navbar from "./navbar";

// Test that navbar have appropriate links
describe("Navbar Navigation Links", () => {
  it("should have the correct paths for all navigation buttons", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>,
    );

    const homeLink = screen.getByRole("link", { name: /^home$/i });
    const logoLink = screen.getByRole("link", { name: /home logo/i });
    const galleryLink = screen.getByRole("link", { name: /gallery/i });
    const contactLink = screen.getByRole("link", { name: /contact/i });

    expect(homeLink).toHaveAttribute("href", "/");
    expect(logoLink).toHaveAttribute("href", "/");
    expect(galleryLink).toHaveAttribute("href", "/gallery");
    expect(contactLink).toHaveAttribute("href", "/contact");
  });
});

// Test that links actually are there & work
describe("Navbar Integration", () => {
  it("should navigate to the gallery page when the link is clicked", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar />

        <Routes>
          <Route path="/" element={<div>Home page</div>} />
          <Route path="/gallery" element={<div>Gallery page</div>} />
        </Routes>
      </MemoryRouter>,
    );

    const galleryLink = screen.getByRole("link", { name: /gallery/i });
    const logoLink = screen.getByRole("link", { name: /home logo/i });
    const homeLink = screen.getByRole("link", { name: /^home$/i });

    fireEvent.click(galleryLink);
    expect(screen.getByText(/gallery page/i)).toBeDefined();

    fireEvent.click(logoLink);
    expect(screen.getByText(/home page/i)).toBeDefined();

    fireEvent.click(homeLink);
    expect(screen.getByText(/home page/i)).toBeDefined();
  });
});
