import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGetUser } from "../hooks/queries";
import { useLogout } from "../hooks/hooks";
interface IProtectedRouteProps {
    children: React.ReactNode;
}
const ProtectedRoute: React.FC<IProtectedRouteProps> = ({ children }) => {
    const { isPending, isError } = useGetUser();
    const { pathname } = useLocation();
    const { logout } = useLogout();

    useEffect(() => {
        if (isPending) return;

        if (isError) {
            logout();
        }
    }, [pathname, isPending, isError, logout]);

    return <>{children}</>;
};

export default ProtectedRoute;
