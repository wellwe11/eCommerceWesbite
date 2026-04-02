import { renderHook } from "@testing-library/react";
import { useLenis } from "lenis/react";
import { useLocation, useNavigate } from "react-router-dom";
import { beforeEach, describe, expect, it, vi } from "vitest";
import useNavigator from "./useNavigator";
import { act } from "react";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
  useLocation: vi.fn(),
}));

vi.mock("lenis/react", () => ({
  useLenis: vi.fn(),
}));

describe("useNavigator", () => {
  const mockNavigate = vi.fn();
  const mockScrollTo = vi.fn();

  const originalLocation = window.location;

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useNavigate).mockReturnValue(mockNavigate);
    vi.mocked(useLenis).mockReturnValue({ scrollTo: mockScrollTo } as any);

    delete (window as any).location;
    window.location = { ...originalLocation, reload: vi.fn() } as any;
  });

  it("should navigate to a new link if the pathname is different", () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: "/home" } as any);

    const { result } = renderHook(() => useNavigator("/gallery"));

    act(() => {
      result.current();
    });

    expect(mockNavigate).toHaveBeenCalledWith("/gallery");
    expect(window.location.reload).not.toHaveBeenCalled();
  });

  it("should reload and scroll to top to top if the pathname is the same", () => {
    vi.mocked(useLocation).mockReturnValue({ pathname: "/home" } as any);

    const { result } = renderHook(() => useNavigator("/home"));

    act(() => {
      result.current();
    });

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
    expect(mockScrollTo).toHaveBeenCalledWith(0, { immediate: true });
  });
});
