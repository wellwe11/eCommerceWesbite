import { sortByArtist } from "@/services/api";
import { useQuery } from "@tanstack/react-query";

export const useGlobalProducts = (selectFn) => {
  return useQuery({
    queryKey: ["products"],
    queryFn: sortByArtist,
    select: selectFn,
    staleTime: 0,
    gcTime: 0,
  });
};
