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

export const useGetAllCustomersQry = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["customers-list", params],
    queryFn: async () => {
      const { data } = await api.get(`/customer/all`, { params });
      return data;
    },
    staleTime: 1000 * 60 * 1, // 1 minute
  });
};

export const useGetAllReceivesQry = () => {
  return useQuery({
    queryKey: ["receives-list"],
    queryFn: async () => {
      const { data } = await api.get(`/receipt/getlist`);
      return data;
    },
    staleTime: 1000 * 60 * 1, // 1 minute
  });
};
