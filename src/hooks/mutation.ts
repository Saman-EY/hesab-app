import { useMutation } from "@tanstack/react-query";
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
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });
};
export const useCreateCustomer = () => {
  return useMutation({
    mutationFn: async (body: any) => {
      const response = await api.post("/customer/create", body);
      return response.data;
    },
    onSuccess: (data) => {
      // queryClient.invalidateQueries({ queryKey: ["users"] });
      console.log(data);
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

// examples:
// const { mutate, isPending } = useCreateUser();
