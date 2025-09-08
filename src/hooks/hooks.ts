import { useDispatch, useSelector, type TypedUseSelectorHook } from "react-redux";
import type { AppDispatch } from "../redux/store";
import Cookies from "js-cookie";
import type { RootState } from "../redux/store";

export const useAppdispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import { useNavigate } from "react-router-dom";
// import { api } from "../api"; // your axios instance

export const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    // 1. Remove token from localStorage
    // localStorage.removeItem("token");
    Cookies.remove("token");

    // 2. Remove token from axios default headers
    // delete api.defaults.headers.common["Authorization"];

    // 3. Optionally, redirect user to login page
    navigate("/");
  };

  return { logout };
};
