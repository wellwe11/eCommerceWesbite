import { waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import fetchData from "@/services/api";
import { renderWithClient } from "@/tests/utils/queryClient_provider_utils";
import useHomeData from "./useHome";

vi.mock("@/services/api", () => ({
  default: vi.fn(),
}));

describe("useHomeData", () => {
  it("should fetch data for homepage", async () => {
    const mockData = [
      { id: 1, name: "Img 1" },
      { id: 2, name: "Img 2" },
      { id: 3, name: "Img 3" },
    ];

    vi.mocked(fetchData).mockResolvedValue(mockData); // Currently error because of type: Will fix.

    const { result } = renderWithClient(() => useHomeData());

    expect(result.current.isLoading).toBe(true);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toHaveLength(3);
    expect(result.current.data[0].name).toBe("Img 1");
  });
});
