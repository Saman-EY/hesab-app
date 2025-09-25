import { useMutation } from "@tanstack/react-query";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const useCreateUser = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (body: { username: string; password: string; role: string }) => {
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
export const useUpdateCustomer = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: any }) => {
      const response = await api.patch(`/customer/update/${id}`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ویرایش شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useDeleteCustomer = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/customer/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("حذف شد");
    },
    onError: (error: any) => {
      console.error("Error deleting transfer:", error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("خطایی رخ داد");
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
export const useUpdateReceive = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: any }) => {
      const response = await api.patch(`/receipt/update/${id}`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ویرایش شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useDeleteReceive = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/receipt/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("حذف شد");
    },
    onError: (error: any) => {
      console.error("Error deleting transfer:", error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("خطایی رخ داد");
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
export const useUpdatePayment = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: any }) => {
      const response = await api.patch(`/payment/update/${id}`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ویرایش شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useDeletePayment = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/payment/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("حذف شد");
    },
    onError: (error: any) => {
      console.error("Error deleting transfer:", error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("خطایی رخ داد");
      }
    },
  });
};

export const useCreateProduct = () => {
  return useMutation({
    mutationFn: async (body: FormData) => {
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
export const useUpdateProduct = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: FormData }) => {
      console.log(body);

      const response = await api.patch(`/product/update/${id}`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("ویرایش شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useDeleteProduct = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/product/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("حذف شد");
    },
    onError: (error: any) => {
      console.error("Error deleting transfer:", error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("خطایی رخ داد");
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
export const useUpdateService = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: any }) => {
      const response = await api.patch(`/service/update/${id}`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("ویرایش شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useDeleteService = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/service/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("حذف شد");
    },
    onError: (error: any) => {
      console.error("Error deleting transfer:", error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("خطایی رخ داد");
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
export const useUpdateBank = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: any }) => {
      const response = await api.patch(`/bank/update/${id}`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ویرایش شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useDeleteBank = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/bank/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("حذف شد");
    },
    onError: (error: any) => {
      console.error("Error deleting transfer:", error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("خطایی رخ داد");
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
export const useUpdateVault = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: any }) => {
      const response = await api.patch(`/vault/update/${id}`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ویرایش شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useDeleteVault = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/vault/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("حذف شد");
    },
    onError: (error: any) => {
      console.error("Error deleting transfer:", error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("خطایی رخ داد");
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
export const useUpdateFund = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: any }) => {
      const response = await api.patch(`/fund/update/${id}`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ویرایش شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useDeleteFund = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/fund/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("حذف شد");
    },
    onError: (error: any) => {
      console.error("Error deleting transfer:", error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("خطایی رخ داد");
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
export const useUpdateTransfer = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: any }) => {
      const response = await api.patch(`/transfer/update/${id}`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ویرایش شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useDeleteTransfer = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/transfer/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("حذف شد");
    },
    onError: (error: any) => {
      console.error("Error deleting transfer:", error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("خطایی رخ داد");
      }
    },
  });
};

export const useCreateStorage = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await api.post("/storage/create", body);
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
export const useUpdateStorage = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: any }) => {
      const response = await api.patch(`/storage/update/${id}`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ویرایش شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useDeleteStorage = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/storage/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("حذف شد");
    },
    onError: (error: any) => {
      console.error("Error deleting transfer:", error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("خطایی رخ داد");
      }
    },
  });
};

export const useCreateSeller = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await api.post("/seller/create", body);
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
export const useUpdateSeller = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: any }) => {
      const response = await api.patch(`/seller/update/${id}`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ویرایش شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useDeleteSeller = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/seller/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("حذف شد");
    },
    onError: (error: any) => {
      console.error("Error deleting transfer:", error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("خطایی رخ داد");
      }
    },
  });
};

export const useCreateProject = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await api.post("/project/create", body);
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
export const useUpdateProject = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: any }) => {
      const response = await api.patch(`/project/update/${id}`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ویرایش شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useDeleteProject = () => {
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/project/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("حذف شد");
    },
    onError: (error: any) => {
      console.error("Error deleting transfer:", error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("خطایی رخ داد");
      }
    },
  });
};
export const useCreateSale = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await api.post("/factore/create", body);
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
export const useUpdateSale = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: any }) => {
      const response = await api.patch(`/factore/update/${id}`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ویرایش شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};

export const useCreateSaleReturn = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await api.post("/saleback/create", body);
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
export const useUpdateSaleReturn = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: any }) => {
      const response = await api.patch(`/saleback/update/${id}`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ویرایش شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useCreateBuy = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await api.post("/buyfactore/create", body);
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
export const useUpdateBuy = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: any }) => {
      const response = await api.patch(`/buyfactore/update/${id}`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ویرایش شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};
export const useCreateBuyRetun = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await api.post("/buyback/create", body);
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
export const useUpdateBuyReturn = () => {
  return useMutation({
    mutationFn: async ({ id, body }: { id: string; body: any }) => {
      const response = await api.patch(`/buyback/update/${id}`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ویرایش شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};

export const useCreateExchange = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await api.post("/currency/create", body);
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

export const useUpdateExchange = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await api.patch(`/currency/update/`, body);
      return response.data;
    },
    onSuccess: () => {
      toast.success("ویرایش شد");
    },
    onError: (error: any) => {
      console.error("Error creating user:", error);
      if (error.response.data.message) {
        toast.error(error.response.data.message);
      }
    },
  });
};