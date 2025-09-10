import { useQueryClient } from "@tanstack/react-query";
import TxtArea from "../../components/TxtArea";
import TxtInput from "../../components/TxtInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useCreateFund } from "../../hooks/mutation";

const validationSchema = Yup.object({
  title: Yup.string().required("الزامی است"),
  description: Yup.string(),
});

function CreateFund() {
  const { mutate, isPending } = useCreateFund();

  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["funds-list"] });
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

export default CreateFund;
