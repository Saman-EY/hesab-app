import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import TxtInput from "../../components/TxtInput";
import { useCreateStorage } from "../../hooks/mutation";

const validationSchema = Yup.object({
  title: Yup.string().required("الزامی است"),
  storage_keeper: Yup.string().required("الزامی است"),
  phone: Yup.string().required("الزامی است"),
  address: Yup.string().required("الزامی است"),
});

function CreateStorage() {
  const { mutate, isPending } = useCreateStorage();

  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      title: "",
      storage_keeper: "",
      phone: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["storages-list"] });
          formik.resetForm();
        },
      });
    },
  });

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 w-full max-w-2xl mx-auto"
      >
        <TxtInput className="!col-span-2" formik={formik} name="title" label="نام" />
        <TxtInput className="!col-span-2" formik={formik} name="storage_keeper" label="انباردار" />
        <TxtInput className="!col-span-2" type="number" formik={formik} name="phone" label="تلفن" />
        <TxtInput className="!col-span-2" formik={formik} name="address" label="آدرس" />

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

export default CreateStorage;
