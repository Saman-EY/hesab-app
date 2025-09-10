import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import TxtInput from "../../components/TxtInput";
import TxtArea from "../../components/TxtArea";
import { useCreateBank } from "../../hooks/mutation";

const validationSchema = Yup.object({
  title: Yup.string().required("الزامی است"),
  account_number: Yup.string().required("الزامی است"),
  cart_number: Yup.string().required("الزامی است"),
  shaba_number: Yup.string().required("الزامی است"),
  account_user_name: Yup.string().required("الزامی است"),
  pos_number: Yup.string().required("الزامی است"),
  description: Yup.string(),
  phone_number_inbank: Yup.string().required("الزامی است"),
  switch_number_payment: Yup.string().required("الزامی است"),
  shop_number: Yup.string().required("الزامی است"),
  terrminal_number_payment: Yup.string().required("الزامی است"),
  branch: Yup.string().required("الزامی است"),
});

function CreateBank() {
  const { mutate, isPending } = useCreateBank();

  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      title: "",
      account_number: "",
      cart_number: "",
      shaba_number: "",
      account_user_name: "",
      pos_number: "",
      description: "",
      phone_number_inbank: "",
      switch_number_payment: "",
      shop_number: "",
      terrminal_number_payment: "",
      branch: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["banks-list"] });
          formik.resetForm(); // clears all fields
        },
      });
    },
  });

  // console.log(formik.values);

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 w-full max-w-2xl mx-auto"
      >
        <TxtInput className="!col-span-2" formik={formik} name="title" label="نام" />
        <TxtInput formik={formik} name="branch" label="شعبه" />
        <TxtInput formik={formik} name="account_number" label="شماره حساب" />
        <TxtInput formik={formik} type="number" name="cart_number" label="شماره کارت" />
        <TxtInput formik={formik} name="shaba_number" label="شبا" />
        <TxtInput formik={formik} name="account_user_name" label="نام صاحب حساب" />
        <TxtInput formik={formik} name="pos_number" label="شماره POS" />
        <TxtArea className="!col-span-2" formik={formik} name="description" label="توضیحات" />
        <TxtInput
          type="number"
          formik={formik}
          name="phone_number_inbank"
          label="شماره موبایل ثبت شده در اینترنت بانک"
        />
        <TxtInput formik={formik} name="switch_number_payment" label="شماره سوییچ پرداخت" />
        <TxtInput formik={formik} name="terrminal_number_payment" label="شماره ترمینال پرداخت" />
        <TxtInput formik={formik} name="shop_number" label="شماره پذیرنده فروشگاهی" />

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

export default CreateBank;
