import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import TxtInput from "../../components/TxtInput";
import TxtArea from "../../components/TxtArea";
import { useCreateBank } from "../../hooks/mutation";
import type { IBank } from "../../allTypes";
import { currencyList } from "../../localDatas";
import SelectInput from "../../components/SelectInput";

interface FormProps {
  initialData?: IBank; // your type from earlier
  onSubmit: (values: any) => void; // callback for create or update
  isPending?: boolean;
}

const validationSchema = Yup.object({
  title: Yup.string().required("الزامی است"),
  account_number: Yup.string().required("الزامی است"),
  cart_number: Yup.string().required("الزامی است"),
  shaba_number: Yup.string().required("الزامی است"),
  account_user_name: Yup.string().required("الزامی است"),
  description: Yup.string(),
  phone_number_inbank: Yup.string().required("الزامی است"),
  branch: Yup.string().required("الزامی است"),
  money: Yup.string().required("الزامی است"),
});

function BankForm({ initialData, onSubmit, isPending }: FormProps) {
  const formik = useFormik({
    initialValues: {
      title: initialData?.title || "",
      account_number: initialData?.account_number || "",
      cart_number: initialData?.cart_number || "",
      shaba_number: initialData?.shaba_number || "",
      account_user_name: initialData?.account_user_name || "",
      description: initialData?.description || "",
      phone_number_inbank: initialData?.phone_number_inbank || "",
      branch: initialData?.branch || "",
      money: initialData?.money || "", // number
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
      <TxtInput className="!col-span-2" formik={formik} name="title" label="نام" />
      <TxtInput formik={formik} name="branch" label="شعبه" />
      <TxtInput formik={formik} name="account_number" label="شماره حساب" />
      <TxtInput formik={formik} type="number" name="cart_number" label="شماره کارت" />
      <TxtInput formik={formik} name="shaba_number" label="شبا" />
      <SelectInput options={currencyList} formik={formik} name="money" label="واحد پول" />
      <TxtInput formik={formik} name="account_user_name" label="نام صاحب حساب" />
      <TxtArea className="!col-span-2" formik={formik} name="description" label="توضیحات" />
      <TxtInput type="number" formik={formik} name="phone_number_inbank" label="شماره موبایل ثبت شده در اینترنت بانک" />

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

export default BankForm;
