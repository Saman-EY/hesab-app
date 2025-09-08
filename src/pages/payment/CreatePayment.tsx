import { useFormik } from "formik";
import * as Yup from "yup";
import { useCreateReceive } from "../../hooks/mutation";
import TxtInput from "../../components/TxtInput";
import SelectInput from "../../components/SelectInput";
import { kindofbusinessList, receiveTypeList } from "../../localDatas";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

const validationSchema = Yup.object({
  //   code: Yup.number().required("الزامی است"),
  //   date: Yup.string().required("الزامی است"),
  //   project: Yup.string().required("الزامی است"),
  //   receipt_kind: Yup.string().required("الزامی است"),
  //   price: Yup.number().required("الزامی است"),
  //   reference: Yup.string().required("الزامی است"),
  //   fee: Yup.number().required("الزامی است"),
});

function CreatePayment() {
  const { mutate, isPending } = useCreateReceive();

  const formik = useFormik({
    initialValues: {
      code: "", //number
      date: "",
      project: "",
      payment_kind: "",
      price: null, //number
      reference: "",
      fee: null, // number
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values, {
        onSuccess: () => {
          formik.resetForm(); // clears all fields
        },
      });
    },
  });

  console.log(formik.values);

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 w-full max-w-2xl mx-auto"
      >
        <TxtInput formik={formik} type="number" name="code" label="شماره" />
        <div className={`w-full mx-auto flex flex-col col-span-2 md:col-span-1`}>
          <span className="text-sm mb-2 text-gray-700">تاریخ</span>

          <DatePicker
            value={formik.values.date} // ✅ bind to formik state
            onChange={(date: any) => {
              // store formatted value in Formik
              const formatted = date?.isValid ? date.format("YYYY/MM/DD") : "";
              formik.setFieldValue("date", formatted);
            }}
            style={{
              backgroundColor: "#f3f4f6",
              borderColor: "#d1d5dc",
              borderRadius: "4px",
              fontSize: "14px",
              padding: "3px 10px",
              width: "100%",
              height: "38px",
            }}
            calendar={persian}
            locale={persian_fa}
            calendarPosition="bottom-right"
          />
          {formik.errors.date && formik.touched.date && (
            <span className="text-red-500 text-sm mt-2">{formik.errors.date}</span>
          )}
        </div>
        <TxtInput formik={formik} name="project" label="پروژه" />
        {/* <SelectUsers formik={formik} name="" /> */}
        <TxtInput className="!col-span-2" formik={formik} name="description" label="شرح" />

        <SelectInput options={receiveTypeList} formik={formik} name="payment_kind" label="نوع دریافت" />
        <TxtInput placeholder="تومان" type="number" formik={formik} name="price" label="مبلغ" />
        <TxtInput formik={formik} name="reference" label="ارجاع" />
        <TxtInput placeholder="تومان" type="number" formik={formik} name="fee" label="کارمزد خدمات بانکی" />

        {/* <div className="w-full  mx-auto col-span-2 flex flex-col ">
          <span className="text-sm mb-2 text-gray-700">آدرس</span>
          <textarea
            name="address"
            id="address"
            cols={5}
            className="resize-none textarea-ghost textarea w-full !border border-gray-300 bg-gray-100"
            value={formik.values.address}
            onChange={formik.handleChange}
          ></textarea>
        </div> */}

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

export default CreatePayment;

// const SelectUsers = ({ formik, name }: { formik: any; name: string }) => {
//   return (
//     <div className={`w-full mx-auto flex flex-col col-span-2 md:col-span-1`}>
//       <span className="text-sm mb-2 text-gray-700">شخص</span>
//       <select
//         value={formik.values[name]}
//         onChange={formik.handleChange}
//         name={name}
//         className="select !outline-0 !border border-gray-300 w-full bg-gray-100"
//       >
//         <option value={""} disabled={true}>
//           یک مورد انتخاب کنید
//         </option>
//         {/* {options.map((item, idx) => (
//         <option value={item.value} key={idx}>
//         {item.title}
//         </option>
//         ))} */}
//       </select>
//       {formik.errors[name] && formik.touched[name] && (
//         <span className="text-red-500 text-sm mt-2">{formik.errors[name]}</span>
//       )}
//     </div>
//   );
// };
