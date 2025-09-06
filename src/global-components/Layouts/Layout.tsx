import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";


function Layout() {
  return (
    <div className="flex flex-col h-[100dvh]">
      <Header />
      <div className="flex h-full mt-[60px]" dir="rtl">
        <Sidebar />
        <main className="flex w-full md:p-6">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}

export default Layout;

const BottomNav = () => {
  return <div className="h-20 bg-black w-full"></div>;
};
