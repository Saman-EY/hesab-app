import { QueryClient, useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const useCreateUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (body: { username: string; password: string; department: string }) => {
      const response = await api.post("/user/login", body);
      return response.data;
    },
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ["users"] });
      // localStorage.setItem("token", data.token);
      Cookies.set("token", data.token, {
        expires: 7, // 7 days
        secure: true, // only https
        sameSite: "strict", // CSRF protection
      });
      navigate("/dashboard");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);

      if (error.response.data.message) {
        if (error.response.data.message === "Invalid Password") {
          toast.error("رمز عبور اشتباه است");
        } else {
          toast.error(error.response.data.message);
        }
      }
    },
  });
};

export const useCreateCustomer = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const token = Cookies.get("token");

      const response = await api.post("/customer/create", body, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["customers-list"] });
      toast.success("ثبت شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useCreateReceive = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await api.post("/receipt/create", body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ثبت شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useCreatePayment = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await api.post("/payment/create", body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ثبت شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await api.post("/product", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("ثبت شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useCreateService = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await api.post("/service", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("ثبت شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useCreateBank = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await api.post("/bank/create", body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ثبت شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useCreateImprest = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await api.post("/", body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ثبت شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useCreateVault = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await api.post("/vault/create", body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ثبت شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useCreateFund = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await api.post("/fund/create", body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ثبت شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useCreateTransfer = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await api.post("/transfer/create", body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ثبت شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};

