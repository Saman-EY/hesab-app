import { useFormik } from "formik";
import * as Yup from "yup";
import TxtInput from "../../components/TxtInput";
import TxtArea from "../../components/TxtArea";

interface FormProps {
  //   initialData?: IReceive; // your type from earlier
  onSubmit: (values: any) => void; // callback for create or update
  isPending?: boolean;
}

const validationSchema = Yup.object({});

function SellerForm({ initialData, onSubmit, isPending }: FormProps) {
  const formik = useFormik({
    initialValues: {
      test: "",
      //   date: initialData?.date || "",
      //   project: initialData?.project || "",
      //   receipt_kind: initialData?.receipt_kind || "",
      //   price: initialData?.price || "", //number
      //   reference: initialData?.reference || "",
      //   customer: initialData?.customer || "",
      //   description: initialData?.description || "",
      //   fee: initialData?.fee || "", // number
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
      <TxtInput formik={formik} name="" label="نام" />
      <TxtInput formik={formik} name="" label="مبلغ فروش" />
      <TxtInput formik={formik} name="" label="درصد برگشت از فروش" />
      <TxtInput formik={formik} name="" label="مبلغ برگشت از فروش" />
      <TxtArea className="!col-span-2" formik={formik} name="" label="توضیحات" />

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

export default SellerForm;
