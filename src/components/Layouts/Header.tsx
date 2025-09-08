import { useLogout } from "../../hooks/hooks";

function Header({ setDashDrawer }: { setDashDrawer: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { logout } = useLogout();
  return (
    <div className="bg-[#455C76] w-full py-3 px-5 text-white flex items-center justify-between font-semibold">
      {/* drawer btn */}
      <div>
        <button onClick={() => setDashDrawer((prev) => !prev)} className="lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="size-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </button>
      </div>
      <h6>نرم افزار حسابداری</h6>

      {/* logout btn */}
      <button onClick={logout}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
          />
        </svg>
      </button>
    </div>
  );
}

export default Header;
