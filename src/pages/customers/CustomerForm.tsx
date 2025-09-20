import { useFormik } from "formik";
import * as Yup from "yup";
import TxtInput from "../../components/TxtInput";
import SelectInput from "../../components/SelectInput";
import { kindofbusinessList, priceList, taxTypeCustomerList } from "../../localDatas";
import type { ICustomer } from "../../allTypes";

interface FormProps {
  initialData?: ICustomer; // your type from earlier
  onSubmit: (values: any) => void; // callback for create or update
  isPending?: boolean;
}

const validationSchema = Yup.object({
  first_name: Yup.string().required("الزامی است"),
  last_name: Yup.string().required("الزامی است"),
  nickname: Yup.string().required("الزامی است"),
  title: Yup.string().required("الزامی است"),
  company: Yup.string().required("الزامی است"),
  kindofbusiness: Yup.string().required("الزامی است"),
  address: Yup.string().required("الزامی است"),
});

function CustomerForm({ initialData, onSubmit, isPending }: FormProps) {
  const formik = useFormik({
    initialValues: {
      company: initialData?.company || "",
      title: initialData?.title || "",
      first_name: initialData?.first_name || "",
      last_name: initialData?.last_name || "",
      nickname: initialData?.nickname || "",
      address: initialData?.address || "",
      kindofbusiness: initialData?.kindofbusiness || "",
      telphone: initialData?.telphone || "",
      phone: initialData?.phone || "",
      fax: initialData?.fax || "",
      email: initialData?.email || "",
      site: initialData?.site || "",
      bank: initialData?.bank || "",
      bank_number: initialData?.bank_number || "",
      cart_number: initialData?.cart_number || "",
      ir_code: initialData?.ir_code || "",
      money_ineventory: initialData?.money_ineventory || "",
      price_list: initialData?.price_list || "",
      tax_type: initialData?.tax_type || "",
      national_code: initialData?.national_code || "",
      economic_code: initialData?.economic_code || "",
      branch_code: initialData?.branch_code || "",
      register_number: initialData?.register_number || "",
      description: initialData?.description || "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 w-full max-w-2xl mx-auto"
    >
      {/* <TxtInput formik={formik} type="number" numberFormat name="accountant_code" label="کد حسابداری" /> */}
      <TxtInput formik={formik} name="first_name" label="نام" />
      <TxtInput formik={formik} name="last_name" label="نام خانوادگی" />
      <TxtInput formik={formik} name="nickname" label="نام مستعار" />
      <TxtInput formik={formik} name="title" label="عنوان" />
      <TxtInput formik={formik} name="company" label="شرکت" />
      <SelectInput options={kindofbusinessList} formik={formik} name="kindofbusiness" label="نوع" />

      <div className="w-full  mx-auto col-span-2 flex flex-col ">
        <span className="text-sm mb-2 text-gray-700">آدرس</span>
        <textarea
          name="address"
          id="address"
          rows={4}
          className="resize-none textarea-ghost textarea w-full !border border-gray-300 bg-gray-100"
          value={formik.values.address}
          onChange={formik.handleChange}
        ></textarea>
        {formik.errors.address && formik.touched.address && (
          <span className="text-red-500 text-sm mt-2">{formik.errors.address}</span>
        )}
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
              options={taxTypeCustomerList}
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
                rows={4}
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
  );
}

export default CustomerForm;
