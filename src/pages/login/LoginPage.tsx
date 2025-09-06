function LoginPage() {
  return (
    <section className="p-5">
      <section className="bg-gray-100 shadow-lg mt-20 p-5 w-full max-w-100 rounded-lg flex flex-col justify-center items-center mx-auto gap-5">
        <label className="input input-ghost !border border-gray-300 w-full bg-white">
          <input
            type="user-name"
            required
            placeholder="نام کاربری"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>
        <label className="input input-ghost !border border-gray-300 w-full bg-white">
          <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
              <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
              <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
            </g>
          </svg>
          <input
            type="password"
            required
            placeholder="پسورد"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
          />
        </label>

        <button className="btn bg-[#1A77F2] text-white border-[#005fd8]  self-end w-full">
         
          ورود
        </button>
      </section>
    </section>
  );
}

export default LoginPage;
