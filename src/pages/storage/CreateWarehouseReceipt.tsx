import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";
import * as Yup from "yup";
import SelectInput from "../../components/SelectInput";

function CreateWarehouseReceipt() {
  //   const { mutate: updateApi, isPending: isPending2 } = useUpdateExchange();
  //   const { data } = useGetExchangesQry();

  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {},
    validationSchema: Yup.object({
      //   USDtoRial: Yup.string().required("الزامی است"),
      //   CADtoRial: Yup.string().required("الزامی است"),
      //   AEDtoRial: Yup.string().required("الزامی است"),
      //   OMRtoRial: Yup.string().required("الزامی است"),
      //   EURtoRial: Yup.string().required("الزامی است"),
    }),
    enableReinitialize: true,
    onSubmit: (values) => {
      const body = {};

      // if (!currencyArray.length) {
      //   // create
      //   createApi(body, {
      //     onSuccess: () => {
      //       queryClient.invalidateQueries({ queryKey: ["exchanges-list"] });
      //     },
      //   });
      // } else {
      //   // update
      //   updateApi(body, {
      //     onSuccess: () => {
      //       queryClient.invalidateQueries({ queryKey: ["exchanges-list"] });
      //     },
      //   });
      // }

      console.log("submit", body);
    },
  });

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 w-full max-w-2xl mx-auto">
        <SelectInput
          className="!col-span-3 md:!col-span-1"
          options={[]}
          formik={formik}
          name="vault"
          withId
          label="انتخاب انبار"
        />
        <SelectInput
          className="!col-span-3 md:!col-span-1"
          options={[]}
          formik={formik}
          name="vault"
          withId
          label="نوع حواله انبار"
        />
        <SelectInput
          className="!col-span-3 md:!col-span-1"
          options={[]}
          formik={formik}
          name="vault"
          withId
          label="انتخاب فاکتور"
        />

        <button
          //   disabled={isPending}
          type="submit"
          className="btn md:col-span-2 bg-sky-600 text-white w-full max-w-80 md:max-w-none mx-auto"
        >
          ثبت
        </button>
      </div>
    </section>
  );
}

export default CreateWarehouseReceipt;
