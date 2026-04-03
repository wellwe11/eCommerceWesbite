import fetchData from "@/services/api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";

import { vi, describe, it, expect } from "vitest";
import useGalleryData from "./useGallery";

vi.mock("@/services/api", () => ({
  default: vi.fn(),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false }, // Saves time during tests
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe("useGalleryData", () => {
  it("should fetch and slice data based on limit", async () => {
    const mockData = [
      { id: 1, name: "Img 1" },
      { id: 2, name: "Img 2" },
      { id: 3, name: "Img 3" },
    ];

    vi.mocked(fetchData).mockResolvedValue(mockData);

    const { result } = renderHook(() => useGalleryData(2), {
      wrapper: createWrapper(),
    });

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.items).toHaveLength(2);
    expect(result.current.data?.total).toBe(3);
    expect(result.current.data?.items[0].name).toBe("Img 1");
  });
});
