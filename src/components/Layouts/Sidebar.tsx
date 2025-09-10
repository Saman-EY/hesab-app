// import { PiCalendarDuotone } from "react-icons/pi";
// import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Links = [
  {
    key: "dashboard",
    title: "داشبورد",
    path: "/dashboard",
    icon: <img className="size-8" src={"/dash-icon.png"} alt="" />,
  },
  {
    key: "users",
    title: "اشخاص",

    icon: <img className="size-8" src={"/users-icon.png"} alt="" />,
    sublinks: [
      {
        key: "create-user",
        title: "شخص جدید",
        path: "/new-user",
      },
      {
        key: "all-users",
        title: "اشخاص",
        path: "/users",
      },
      {
        key: "create-receive",
        title: "دریافت",
        path: "/new-receive",
      },
      {
        key: "all-receive",
        title: "لیست دریافت",
        path: "/receives",
      },
      {
        key: "create-payment",
        title: "پرداخت",
        path: "/new-payment",
      },
      {
        key: "all-payments",
        title: "لیست پرداخت",
        path: "/payments",
      },
    ],
  },
  {
    key: "goods-services",
    title: "کالا ها و خدمات",

    icon: <img className="size-7" src={"/product-icon.png"} alt="" />,
    sublinks: [
      {
        key: "create-product",
        title: "کالای جدید",
        path: "/new-product",
      },
      {
        key: "create-service",
        title: "خدمات جدید",
        path: "/new-service",
      },

      {
        key: "product-service-list",
        title: "کالا ها و خدمات",
        path: "/product-service-list",
      },
    ],
  },
  {
    key: "managing-bank",
    title: "بانکداری",

    icon: <img className="size-7" src={"/bank-icon.png"} alt="" />,
    sublinks: [
      {
        key: "create-bank",
        title: "بانک جدید",
        path: "/new-bank",
      },
      {
        key: "bank-list",
        title: "بانک ها",
        path: "/banks",
      },
      {
        key: "create-imprest",
        title: "تنخواه گردان جدید",
        path: "/new-imprest",
      },
      {
        key: "imprest-list",
        title: "تنخواه گردان ها",
        path: "/imprests",
      },
      {
        key: "create-fund",
        title: "صندوق جدید",
        path: "/new-fund",
      },
      {
        key: "fund-list",
        title: "صندوق ها",
        path: "/funds",
      },
      {
        key: "create-transfer",
        title: "انتقال",
        path: "/new-transfer",
      },
      {
        key: "transfer-list",
        title: "لیست انتقال ها",
        path: "/transfers",
      },
    ],
  },
  // {
  //   key: "documents",
  //   title: "اسناد",
  //   path: "/docs",
  // },
  // {
  //   key: "requests",
  //   title: "درخواست ها",
  //   path: "/requests",
  // },
  // {
  //   key: "base-info",
  //   title: "اطلاعات پایه",
  //   path: "/baseInfo",
  // },
];

const Sidebar = ({ DashDrawer }: { DashDrawer: boolean }) => {
  const { pathname } = useLocation();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    // Check if current path is inside any sublink
    Links.forEach((link) => {
      if (link.sublinks?.some((sublink) => sublink.path === pathname)) {
        setOpenMenu(link.key);
      }
    });
  }, [pathname]);

  return (
    <div
      className={` ${
        DashDrawer ? "translate-x-0" : "translate-x-[100%]"
      }  z-20 h-full overflow-auto transition-all  absolute lg:static lg:!translate-x-0  flex flex-col w-50 shrink-0 text-white bg-[#F4F5F8] shadow-md`}
    >
      <div className="flex flex-col w-full h-full text-black bg-[#F4F5F8] border-l border-gray-200">
        {Links.map((link) => {
          const isActive = pathname === link.path;
          const hasSublinks = link.sublinks && link.sublinks.length > 0;

          if (hasSublinks) {
            return (
              <div key={link.key} className="border-b border-gray-300">
                <button
                  className={`w-full flex items-center gap-2 justify-between px-4 py-3 hover:bg-gray-200 transition-all ${
                    openMenu === link.key ? "bg-gray-200" : ""
                  }`}
                  onClick={() => {
                    setOpenMenu(openMenu === link.key ? null : link.key);
                  }}
                >
                  <div className="flex items-center gap-2">
                    {link.icon}
                    <span className="font-medium text-[#757575]">{link.title}</span>
                  </div>
                  {/* <span className="text-gray-500 text-xs">{openMenu === link.key ? "▲" : "▼"}</span> */}
                </button>

                {openMenu === link.key && (
                  <div className="mr-7 flex flex-col">
                    {link.sublinks.map((sublink) => (
                      <Link
                        to={sublink.path}
                        key={sublink.key}
                        className={`px-3 py-2 text-sm text-gray-500  hover:bg-gray-200  w-full transition ${
                          pathname === sublink.path ? "bg-gray-300 !text-black font-medium" : ""
                        }`}
                      >
                        {sublink.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <Link to={link.path || "#"} className="block w-full" key={link.key}>
              <button
                className={`w-full flex items-center gap-2 text-[#757575] justify-start px-4 py-3 hover:bg-gray-200 transition-all border-b border-gray-300 ${
                  isActive ? "bg-gray-300 !text-black" : ""
                }`}
              >
                {link.icon}
                <span className="font-medium ">{link.title}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
