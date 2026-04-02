import React from "react";

import { describe, expect, it, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";

import { activeProductAtom } from "@/atoms/productAtoms";
import useProductData from "./useProductData";

import * as api from "@/services/fetchProductById";

vi.mock("@/services/fetchProductById", () => ({
  default: vi.fn(),
}));

const HydrateAtoms = ({
  initialValues,
  children,
}: {
  initialValues: any;
  children: React.ReactNode;
}) => {
  useHydrateAtoms(initialValues);
  return children;
};

const createWrapper = (initialAtomValue?: any) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <Provider>
        {initialAtomValue ? (
          <HydrateAtoms initialValues={[[activeProductAtom, initialAtomValue]]}>
            {children}
          </HydrateAtoms>
        ) : (
          children
        )}
      </Provider>
    </QueryClientProvider>
  );
};

describe("useProductData", () => {
  it("should use Jotai atom as initial data (placeholder", async () => {
    const mockPreview = { id: "123", name: "Preview name" };

    const { result } = renderHook(() => useProductData("123"), {
      wrapper: createWrapper(mockPreview),
    });

    expect(result.current.product).toEqual(mockPreview);
  });

  it("should eventually return full data from the API", async () => {
    const mockFullData = { id: "123", name: "Full Detailed Name", price: 100 };

    vi.mocked(api.default).mockResolvedValue(mockFullData);

    const { result } = renderHook(() => useProductData("123"), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isFetchingNull).toBe(false));

    expect(result.current.product.name).toBe("Full Detailed Name");
  });
});
