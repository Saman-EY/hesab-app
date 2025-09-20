import { useFormik } from "formik";
import * as Yup from "yup";
import TxtInput from "../../components/TxtInput";
import TxtArea from "../../components/TxtArea";
import type { ISeller } from "../../allTypes";

interface FormProps {
  initialData?: ISeller; // your type from earlier
  onSubmit: (values: any) => void; // callback for create or update
  isPending?: boolean;
}

const validationSchema = Yup.object({
  name: Yup.string().required("نام را وارد کنید"),
  sell_price: Yup.string().required("مبلغ فروش را وارد کنید"),
  refund_price: Yup.string().required("مبلغ برگشت از فروش را وارد کنید"),
  refund_percentage: Yup.string().required("درصد برگشت از فروش را وارد کنید"),
  description: Yup.string(),
});

function SellerForm({ initialData, onSubmit, isPending }: FormProps) {
  const formik = useFormik({
    initialValues: {
      name: initialData?.name || "",
      refund_price: initialData?.refund_price || "", //only number
      refund_percentage: initialData?.refund_percentage || "", //only number
      sell_price: initialData?.sell_price || "", // only number
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
      <TxtInput formik={formik} name="name" label="نام" />
      <TxtInput formik={formik} numberFormat name="sell_price" label="مبلغ فروش" />
      <TxtInput formik={formik} numberFormat name="refund_percentage" label="درصد برگشت از فروش" />
      <TxtInput formik={formik} numberFormat name="refund_price" label="مبلغ برگشت از فروش" />
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

export default SellerForm;
