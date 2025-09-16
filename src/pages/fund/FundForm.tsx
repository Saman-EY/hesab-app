import TxtArea from "../../components/TxtArea";
import TxtInput from "../../components/TxtInput";
import * as Yup from "yup";
import { useFormik } from "formik";
import type { IFund } from "../../allTypes";

interface FormProps {
  initialData?: IFund; // your type from earlier
  onSubmit: (values: any) => void; // callback for create or update
  isPending?: boolean;
}

const validationSchema = Yup.object({
  title: Yup.string().required("الزامی است"),
  description: Yup.string(),
});

function FundForm({ initialData, onSubmit, isPending }: FormProps) {
  const formik = useFormik({
    initialValues: {
      title: initialData?.title || "",
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
  );
}

export default FundForm;
