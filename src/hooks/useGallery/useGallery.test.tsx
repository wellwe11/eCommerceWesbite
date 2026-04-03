import fetchData from "@/services/api";
import { waitFor } from "@testing-library/react";

import { vi, describe, it, expect } from "vitest";
import useGalleryData from "./useGallery";
import { renderWithClient } from "@/tests/utils/queryClient_provider_utils";

vi.mock("@/services/api", () => ({
  default: vi.fn(),
}));

describe("useGalleryData", () => {
  it("should fetch and slice data based on limit", async () => {
    const mockData = [
      { id: 1, name: "Img 1" },
      { id: 2, name: "Img 2" },
      { id: 3, name: "Img 3" },
    ];

    vi.mocked(fetchData).mockResolvedValue(mockData); // Currently error because of type: Will fix.

    const { result } = renderWithClient(() => useGalleryData(2));

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data?.items).toHaveLength(2);
    expect(result.current.data?.total).toBe(3);
    expect(result.current.data?.items[0].name).toBe("Img 1");
  });
});
