import { useQuery } from "@tanstack/react-query";
import { api } from "../api";
import Cookies from "js-cookie";

// validate token
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

// get all customers
export const useGetAllCustomersQry = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ["customers-list", params],
    queryFn: async () => {
      const token = Cookies.get("token");

      const { data } = await api.get(`/customer/all`, {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return data;
    },
    staleTime: 1000 * 60 * 1, // 1 minute
  });
};

// get all receives
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
// get all payments
export const useGetAllPaymentsQry = () => {
  return useQuery({
    queryKey: ["payments-list"],
    queryFn: async () => {
      const { data } = await api.get(`/payment/getlist`);
      return data;
    },
    staleTime: 1000 * 60 * 1, // 1 minute
  });
};
