// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";

// export const useLandingPngsQry = () => {
//   return useQuery({
//     queryKey: ["landing-png"],
//     queryFn: async () => {
//       const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/cleanpng.landing.json`);
//       return data;
//     },
//     staleTime: 1000 * 60 * 1, // 1 minute
//   });
// };

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
