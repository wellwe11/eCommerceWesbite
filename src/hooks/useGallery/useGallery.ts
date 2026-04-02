import { useQuery } from "@tanstack/react-query";
import fetchData from "@/services/api";

const useGalleryData = (limit: number) => {
  return useQuery({
    queryKey: ["gallery", limit],
    queryFn: () => fetchData("galleryData.json"),
    select: (data) => ({
      items: data.slice(0, limit),
      total: data.length,
    }),

    placeholderData: (previousData) => previousData,
  });
};

export default useGalleryData;
