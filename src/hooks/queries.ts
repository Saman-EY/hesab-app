import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import Cookies from "js-cookie";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const token = Cookies.get("token");

      if (!token) {
        throw new Error("No token found");
      }

      const { data } = await api.get("/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return data;
    },
    retry: false,
  });
};

// export const useLandingPngsQry = (params?: Record<string, any>) => {
//   return useQuery({
//     queryKey: ["landingSlider", params],
//     queryFn: async () => {
//       const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/slider/getSliders`, { params });
//       return data;
//     },
//     staleTime: 1000 * 60 * 1, // 1 minute
//   });
// };
