// import { PiCalendarDuotone } from "react-icons/pi";
// import { Link } from "react-router-dom";

import { Link, useLocation } from "react-router-dom";

const Links = [
  {
    key: "dashboard",
    title: "داشبورد",
    path: "/dashboard",
    // icon: (
    //   <IoDocumentTextOutline
    //     size={20}
    //     className="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
    //   />
    // ),
  },
  {
    key: "documents",
    title: "اسناد",
    path: "/docs",
    // icon: (
    //   <IoDocumentTextOutline
    //     size={20}
    //     className="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
    //   />
    // ),
  },
  {
    key: "requests",
    title: "درخواست ها",
    path: "/requests",
    // icon: (
    //   <VscRequestChanges
    //     size={20}
    //     className="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
    //   />
    // ),
  },
  {
    key: "base-info",
    title: "اطلاعات پایه",
    path: "/baseInfo",
    // icon: (
    //   <BsInfoCircle
    //     size={20}
    //     className="text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500"
    //   />
    // ),
  },
];

const Sidebar = () => {
  const { pathname } = useLocation();

  console.log("*location", pathname);

  return (
    <div className="hidden md:flex flex-col w-55 text-white shadow-md">
      <div className="flex flex-col w-full h-full text-black bg-[#F4F5F8] border-l border-gray-200">
        {Links.map((link) => {
          return (
            <Link to={link.path} className="block w-full" key={link.key}>
              <button
                className={` ${
                  pathname === link.path ? "bg-gray-200" : ""
                } w-full flex items-center justify-start px-4 py-3 hover:bg-gray-200 transition-all  border-b border-gray-300 `}
              >
                {/* {link.icon} */}
                {/* <img src={link.icon} alt="" /> */}
                <span className="font-medium text-[#757575]">{link.title}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
