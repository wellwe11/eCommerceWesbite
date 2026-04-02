import { expect, it, vi } from "vitest";
import debounce from "./debounce";

it("should only call the function once after the delay", () => {
  vi.useFakeTimers();

  const mockFn = vi.fn();
  const debounced = debounce(mockFn, 1000);

  debounced();
  debounced();
  debounced();

  expect(mockFn).not.toHaveBeenCalled();

  vi.advanceTimersByTime(1000);

  expect(mockFn).toHaveBeenCalled();
});
