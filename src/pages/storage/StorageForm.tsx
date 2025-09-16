import { useFormik } from "formik";
import * as Yup from "yup";
import TxtInput from "../../components/TxtInput";
import type { IStorage } from "../../allTypes";

interface FormProps {
  initialData?: IStorage; // your type from earlier
  onSubmit: (values: any) => void; // callback for create or update
  isPending?: boolean;
}

const validationSchema = Yup.object({
  title: Yup.string().required("الزامی است"),
  storage_keeper: Yup.string().required("الزامی است"),
  phone: Yup.string().required("الزامی است"),
  address: Yup.string().required("الزامی است"),
});

function StorageForm({ initialData, onSubmit, isPending }: FormProps) {
  const formik = useFormik({
    initialValues: {
      title: initialData?.title || "",
      storage_keeper: initialData?.storage_keeper || "",
      phone: initialData?.phone || "",
      address: initialData?.address || "",
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
  );
}

export default StorageForm;
