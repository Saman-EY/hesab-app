import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IProtectedRouteProps {
  children: React.ReactNode;
}
const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children }) => {
  const navigate = useNavigate();
  const token: string | null = localStorage.getItem("token");

  const { pathname } = useLocation();

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [pathname, token]);

  return <>{children}</>;
};

export default ProtectedRoute;
