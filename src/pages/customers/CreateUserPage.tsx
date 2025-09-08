import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateCustomer } from "../../hooks/mutation";
import TxtInput from "../../components/TxtInput";
import SelectInput from "../../components/SelectInput";
import { kindofbusinessList, priceList, taxTypeList } from "../../localDatas";

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
      // console.log("Submitted:", values);
      mutate(values, {
        onSuccess: () => {
          formik.resetForm(); // clears all fields
        },
      });
      // navigate("/dashboard");
    },
  });

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
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
              <SelectInput
                options={taxTypeList}
                className="col-span-3"
                formik={formik}
                name="tax_type"
                label="نوع مالیات"
              />
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
          ثبت
        </button>
      </form>
    </section>
  );
}

export default CreateUserPage;
