import { useQuery } from "@tanstack/react-query";
import fetchData from "@/services/api";

const useHomeData = () => {
  return useQuery({
    queryKey: ["home"],
    queryFn: () => fetchData("/homeData.json"),
  });
};

export default useHomeData;
