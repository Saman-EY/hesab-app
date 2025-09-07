import { useFormik } from "formik";
import { useEffect } from "react";
import * as Yup from "yup";
import { useCreateCustomer } from "../../hooks/mutation";

const validationSchema = Yup.object({
  first_name: Yup.string().required("الزامی است"),
  last_name: Yup.string().required("الزامی است"),
});

function CreateUserPage() {
  const { mutate, isPending } = useCreateCustomer();

  const formik = useFormik({
    initialValues: {
      accountant_code: "",
      company: "",
      title: "",
      first_name: "",
      last_name: "",
      address: "",
      kindofbusiness: "",
      telphone: "",
      phone: "",
      fax: "",
      email: "",
      site: "",
      bank: "",
      bank_number: "",
      cart_number: "",
      ir_code: "",
      money_ineventory: "",
      price_list: "",
      tax_type: "",
      national_code: "",
      economic_code: "",
      branch_code: "",
      register_number: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log("Submitted:", values);
      mutate(values, {
        onSuccess: () => {
          formik.resetForm(); // clears all fields
        },
      });
      // navigate("/dashboard");
    },
  });

  useEffect(() => {
    console.log("*test", formik);
  }, [formik.values]);

  return (
    <section className="h-[86dvh] my-auto w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 w-full max-w-2xl mx-auto"
      >
        <TxtInput formik={formik} type="number" name="accountant_code" label="کد حسابداری" />
        <TxtInput formik={formik} name="first_name" label="نام" />
        <TxtInput formik={formik} name="last_name" label="نام خانوادگی" />
        <TxtInput formik={formik} name="title" label="عنوان" />
        <TxtInput formik={formik} name="company" label="شرکت" />
        <SelectInput options={kindofbusinessList} formik={formik} name="kindofbusiness" label="نوع" />

        <div className="w-full  mx-auto col-span-2 flex flex-col ">
          <span className="text-sm mb-2 text-gray-700">آدرس</span>
          <textarea
            name="address"
            id="address"
            cols={5}
            className="resize-none textarea-ghost textarea w-full !border border-gray-300 bg-gray-100"
            value={formik.values.address}
            onChange={formik.handleChange}
          ></textarea>
        </div>

        {/* tabs */}
        <div className="tabs col-span-2 tabs-border  w-full">
          <input type="radio" name="my_tabs" className="tab" aria-label="عمومی" defaultChecked />
          <div className="tab-content border-base-300 bg-base-100 p-5 rounded-lg ">
            <section className="grid grid-cols-3 gap-5">
              <TxtInput
                className="col-span-3"
                type="number"
                formik={formik}
                name="money_ineventory"
                label="اعتبار مالی"
              />
              <SelectInput
                className="col-span-3"
                options={priceList}
                formik={formik}
                name="price_list"
                label="لیست قیمت"
              />
              <SelectInput options={taxTypeList} className="col-span-3" formik={formik} name="tax_type" label="نوع مالیات" />
              <TxtInput className="col-span-3" formik={formik} name="national_code" label="شناسه ملی" />
              <TxtInput className="col-span-3" formik={formik} name="economic_code" label="کد اقتصادی" />
              <TxtInput className="col-span-3" formik={formik} name="branch_code" label="شماره ثبت" />
              <TxtInput className="col-span-3" formik={formik} name="register_number" label="کد شعبه" />
              <div className="w-full   mx-auto  flex flex-col col-span-3 ">
                <span className="text-sm mb-2 text-gray-700">توضیحات</span>
                <textarea
                  name="description"
                  id="description"
                  cols={5}
                  className="resize-none textarea-ghost textarea w-full !border border-gray-300 bg-gray-100"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                ></textarea>
              </div>
            </section>
          </div>

          <input type="radio" name="my_tabs" className="tab" aria-label="تماس" />
          <div className="tab-content border-base-300 bg-base-100 p-5 rounded-lg ">
            <section className="grid grid-cols-3 gap-5">
              <TxtInput className="col-span-3" formik={formik} type="number" name="telphone" label="تلفن" />
              <TxtInput className="col-span-3" formik={formik} type="number" name="phone" label="موبایل" />
              <TxtInput className="col-span-3" formik={formik} type="number" name="fax" label="فکس" />
              <TxtInput className="col-span-3" formik={formik} name="email" label="ایمیل" />
              <TxtInput className="col-span-3" formik={formik} name="site" label="وب سایت" />
            </section>
          </div>

          <input type="radio" name="my_tabs" className="tab" aria-label="حساب بانکی" />
          <div className="tab-content border-base-300 bg-base-100 p-5 rounded-lg ">
            <section className="grid grid-cols-3 gap-5">
              <TxtInput className="col-span-3" formik={formik} name="bank" label="بانک" />
              <TxtInput className="col-span-3" formik={formik} name="bank_number" label="شماره حساب" />
              <TxtInput className="col-span-3" type="number" formik={formik} name="cart_number" label="شماره کارت" />
              <TxtInput className="col-span-3" formik={formik} name="ir_code" label="شبا" />
            </section>
          </div>

          {/* <input type="radio" name="my_tabs" className="tab" aria-label="Tab 2" /> */}
          {/* <div className="tab-content border-base-300 bg-base-100 p-10">Tab content 2</div> */}
        </div>

        <button
          disabled={isPending}
          type="submit"
          className="btn md:col-span-2 bg-sky-600 text-white w-full max-w-80 md:max-w-none mx-auto"
        >
          ثبت اطلاعات
        </button>
      </form>
    </section>
  );
}

export default CreateUserPage;

const TxtInput = ({
  label,
  name,
  formik,
  type = "text",
  className,
}: {
  label: string;
  formik: any;
  name: string;
  type?: string;
  className?: string;
}) => {
  return (
    <div className={`w-full  mx-auto flex flex-col col-span-2 md:col-span-1 ${className}`}>
      <span className="text-sm mb-2 text-gray-700">{label}</span>
      <label className="input input-ghost !border border-gray-300 w-full bg-gray-100">
        <input
          onInput={type === "number" ? onlyGetsNumbers : noSpaces}
          name={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          type="text"
        />
      </label>
      {formik.errors[name] && formik.touched[name] && (
        <span className="text-red-500 text-sm mt-2">{formik.errors[name]}</span>
      )}
    </div>
  );
};
const SelectInput = ({
  label,
  name,
  formik,
  options = testArray,
  className,
}: {
  label: string;
  formik: any;
  name: string;
  options?: { title: string; value: string }[];
  className?: string;
}) => {
  return (
    <div className={`w-full mx-auto flex flex-col col-span-2 md:col-span-1 ${className}`}>
      <span className="text-sm mb-2 text-gray-700">{label}</span>
      <select
        value={formik.values[name]}
        onChange={formik.handleChange}
        name={name}
        className="select !outline-0 !border border-gray-300 w-full bg-gray-100"
      >
        <option value={""} disabled={true}>
          یک مورد انتخاب کنید
        </option>
        {options.map((item, idx) => (
          <option value={item.value} key={idx}>
            {item.title}
          </option>
        ))}
      </select>
      {formik.errors[name] && formik.touched[name] && (
        <span className="text-red-500 text-sm mt-2">{formik.errors[name]}</span>
      )}
    </div>
  );
};

const priceList = [
  {
    title: "همکار",
    value: "همکار",
  },
  {
    title: "عمده",
    value: "عمده",
  },
  {
    title: "دلاری",
    value: "دلاری",
  },
  {
    title: "پرسنل",
    value: "پرسنل",
  },
];
const kindofbusinessList = [
  {
    title: "مشتری",
    value: "مشتری",
  },
  {
    title: "تامین کننده",
    value: "تامین کننده",
  },
  {
    title: "سهامدار",
    value: "سهامدار",
  },
  {
    title: "کارمند",
    value: "کارمند",
  },
];
const taxTypeList = [
  {
    title: "مودی مشمول ثبت نام در نظام مالیاتی",
    value: "مودی مشمول ثبت نام در نظام مالیاتی",
  },
  {
    title: "مشمولین حقیقی ماده 81",
    value: "مشمولین حقیقی ماده 81",
  },
  {
    title: "افرادی که مسمول ثبت نام در نظام مالیاتی ندارند",
    value: "افرادی که مسمول ثبت نام در نظام مالیاتی ندارند",
  },
  {
    title: "مصرف کننده نهایی",
    value: "مصرف کننده نهایی",
  },
];

const testArray = [
  {
    title: "تست1",
    value: "تست1",
  },
  {
    title: "تست2",
    value: "تست2",
  },
  {
    title: "تست3",
    value: "تست3",
  },
  {
    title: "تست4",
    value: "تست4",
  },
];

const onlyGetsNumbers = (e: any) => {
  e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, "");
};

const noSpaces = (e: any) => {
  e.currentTarget.value = e.currentTarget.value.replace(/^\s+/, "");
};
