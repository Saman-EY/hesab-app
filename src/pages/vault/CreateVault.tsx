import React from "react";
import TxtInput from "../../components/TxtInput";
import { useQueryClient } from "@tanstack/react-query";
import TxtArea from "../../components/TxtArea";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateVault } from "../../hooks/mutation";

const validationSchema = Yup.object({
  title: Yup.string().required("الزامی است"),
  description: Yup.string(),
  switch_number_payment: Yup.string().required("الزامی است"),
  terrminal_number_payment: Yup.string().required("الزامی است"),
  shop_number: Yup.string().required("الزامی است"),
});

function CreateVault() {
  const { mutate, isPending } = useCreateVault();

  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      switch_number_payment: "",
      terrminal_number_payment: "",
      shop_number: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["vault-list"] });
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
    </section>
  );
}

export default CreateVault;
