import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import TxtInput from "../../components/TxtInput";
import CustomDatePicker from "../../components/CustomDatePicker";
import { jalaliToGregorian } from "../../tools";

const validationSchema = Yup.object({
  date: Yup.string().required("الزامی است"),
  project: Yup.string().required("الزامی است"),
  description: Yup.string().required("الزامی است"),
  from_kind: Yup.string().required("الزامی است"),
  to_kind: Yup.string().required("الزامی است"),
  from_bank: Yup.string().required("الزامی است"),
  to_bank: Yup.string().required("الزامی است"),
  from_vault: Yup.string().required("الزامی است"),
  to_vault: Yup.string().required("الزامی است"),
  from_fund: Yup.string().required("الزامی است"),
  to_fund: Yup.string().required("الزامی است"),
  price: Yup.number().required("الزامی است"),
  fee: Yup.number().required("الزامی است"),
  referral: Yup.string().required("الزامی است"),
});

function CreateTransfer() {
  //   const { mutate, isPending } = useCreateImprest();

  const queryClient = useQueryClient();

  const formik = useFormik({
    initialValues: {
      date: "2022-01-01",
      project: "",
      description: "",
      from_kind: "bank",
      to_kind: "bank",
      from_bank: "68c1791c7005f0131e895afe",
      to_bank: "68c1791c7005f0131e895afe",
      from_vault: "68c17a76343f54a7bc95c3d2",
      to_vault: "68c17a76343f54a7bc95c3d2",
      from_fund: "68c17b98c0a0fb6f686f6f6e",
      to_fund: "68c17b98c0a0fb6f686f6f6e",
      price: "", //number only
      fee: "", //number only
      referral: "123456789",
    },
    validationSchema,
    onSubmit: (values) => {
      //   const body = {
      //     ...values,
      //     date: jalaliToGregorian(values.date),
      //   };
      // mutate(values, {
      //   onSuccess: () => {
      //     queryClient.invalidateQueries({ queryKey: ["payments-list"] });
      //     formik.resetForm(); // clears all fields
      //   },
      // });
    },
  });

  // console.log(formik.values);

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <section className="w-full max-w-6xl mx-auto grid grid-cols-2 gap-5">
        <TxtInput className="" formik={formik} name="" label="نام" />
        <CustomDatePicker name="" formik={formik} label="تاریخ" />
        <TxtInput className="!col-span-2" formik={formik} name="" label="شرح" />
        <section className="border-t border-gray-300 pt-5 col-span-2 grid grid-cols-1 md:grid-cols-2">
          <div>
            {/* tabs */}
            test1
          </div>

          <div>test2</div>
        </section>
      </section>
    </section>
  );
}

export default CreateTransfer;
