import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useEffect, useState } from "react";
import ProtectedRoute from "../ProtectedRoot";
import { Toaster } from "react-hot-toast";

function Layout() {
  const { pathname } = useLocation();

  const [DashDrawer, setDashDrawer] = useState(false);

  useEffect(() => {
    setDashDrawer(false);
  }, [pathname]);

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-[100dvh]">
        <Header setDashDrawer={setDashDrawer} />
        <div className="flex h-full ">
          <Sidebar DashDrawer={DashDrawer} />
          <main className="flex-1 p-5 overflow-auto">
            <Outlet />
          </main>
        </div>
        {/* <BottomNav /> */}
      </div>
      <Toaster />
    </ProtectedRoute>
  );
}

export default Layout;
