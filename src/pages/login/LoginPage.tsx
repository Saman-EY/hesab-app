import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateUser } from "../../hooks/mutation";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { Toaster } from "react-hot-toast";

const validationSchema = Yup.object({
  username: Yup.string().required("نام کاربری الزامی است").min(4, "حداقل ۴ کاراکتر باشد"),
  password: Yup.string()
    .required("رمز عبور الزامی است")
    .min(8, "حداقل ۸ کاراکتر باشد")
    .matches(/[a-z]/, "حداقل یک حرف کوچک داشته باشد")
    // .matches(/[A-Z]/, "حداقل یک حرف بزرگ داشته باشد")
    .matches(/\d/, "حداقل یک عدد داشته باشد"),
  department: Yup.string().required("انتخاب دپارتمان الزامی است"),
});

function LoginPage() {
  const { mutate, isPending } = useCreateUser();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      department: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // console.log("Submitted:", values);
      mutate(values);
    },
  });

  useEffect(() => {
    // const token = localStorage.getItem("token");
    const token = Cookies.get("token");

    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <section className="p-5">
      <section className="bg-gray-100 shadow-lg mt-20 p-5 w-full max-w-100 rounded-lg flex flex-col justify-center items-center mx-auto gap-5">
        <div>
          <img className="w-full" src="/login-cover.jpg" alt="" />
        </div>
        <div className="w-full flex flex-col">
          <span className="text-sm mb-2 text-gray-700">نام کاربری</span>
          <label className="input input-ghost !border border-gray-300 w-full bg-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-[1.3em] opacity-50"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <input name="username" className="" value={formik.values.username} onChange={formik.handleChange} />
          </label>
          {formik.touched.username && formik.errors.username && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.username}</p>
          )}
        </div>

        <div className="w-full flex flex-col">
          <span className="text-sm mb-2 text-gray-700">رمز عبور</span>
          <label className="input input-ghost !border border-gray-300 w-full bg-white">
            <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
            />
          </label>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.password}</p>
          )}
        </div>

        <div className="w-full flex flex-col">
          <span className="text-sm mb-2 text-gray-700">دپارتمان</span>
          <select
            value={formik.values.department}
            onChange={formik.handleChange}
            name="department"
            className="select w-full !outline-0 !border border-gray-300"
          >
            <option value={""} disabled={true}>
              یک مورد انتخاب کنید
            </option>
            <option value={"اداری"}>اداری</option>
            <option value={"فروش"}>فروش</option>
            <option value={"حسابداری"}>حسابداری</option>
          </select>
          {formik.touched.department && formik.errors.department && (
            <p className="text-red-500 text-xs mt-1">{formik.errors.department}</p>
          )}
        </div>

        <button
          disabled={isPending}
          onClick={() => formik.handleSubmit()}
          className="btn bg-sky-600 text-white   mt-5 w-full"
        >
          ورود
        </button>
      </section>
      <Toaster />
    </section>
  );
}

export default LoginPage;
