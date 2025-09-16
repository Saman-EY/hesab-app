import React from "react";
import TxtInput from "../../components/TxtInput";
import TxtArea from "../../components/TxtArea";
import { useFormik } from "formik";
import * as Yup from "yup";
import type { IVault } from "../../allTypes";

interface FormProps {
  initialData?: IVault; // your type from earlier
  onSubmit: (values: any) => void; // callback for create or update
  isPending?: boolean;
}

const validationSchema = Yup.object({
  title: Yup.string().required("الزامی است"),
  description: Yup.string(),
  switch_number_payment: Yup.string().required("الزامی است"),
  terrminal_number_payment: Yup.string().required("الزامی است"),
  shop_number: Yup.string().required("الزامی است"),
});

function VaultForm({ initialData, onSubmit, isPending }: FormProps) {
  const formik = useFormik({
    initialValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      switch_number_payment: initialData?.switch_number_payment || "",
      terrminal_number_payment: initialData?.terrminal_number_payment || "",
      shop_number: initialData?.shop_number || "",
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
      <TxtArea className="!col-span-2" formik={formik} name="description" label="توضیحات" />
      <TxtInput type="number" formik={formik} name="switch_number_payment" label="شماره سوییچ پرداخت" />
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
  );
}

export default VaultForm;
