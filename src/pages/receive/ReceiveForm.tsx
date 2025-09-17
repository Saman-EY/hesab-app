import { useFormik } from "formik";
import * as Yup from "yup";
import { useQueryClient } from "@tanstack/react-query";
import { jalaliToGregorian } from "../../tools";
import type { ICustomer, IReceive } from "../../allTypes";
import TxtInput from "../../components/TxtInput";
import SelectInput from "../../components/SelectInput";
import { currencyList, receiveTypeList } from "../../localDatas";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useGetAllCustomersQry } from "../../hooks/queries";

interface FormProps {
  initialData?: IReceive; // your type from earlier
  onSubmit: (values: any) => void; // callback for create or update
  isPending?: boolean;
}

const validationSchema = Yup.object({
  date: Yup.string().required("الزامی است"),
  project: Yup.string().required("الزامی است"),
  receipt_kind: Yup.string().required("الزامی است"),
  price: Yup.number().required("الزامی است"),
  reference: Yup.string().required("الزامی است"),
  fee: Yup.number().required("الزامی است"),
  description: Yup.string().required("الزامی است"),
});

function ReceiveForm({ initialData, onSubmit, isPending }: FormProps) {
  const { data } = useGetAllCustomersQry();

  const queryClient = useQueryClient();
  const peopleList = data?.customers;

  const formik = useFormik({
    initialValues: {
      date: initialData?.date || "",
      project: initialData?.project || "",
      receipt_kind: initialData?.receipt_kind || "",
      price: initialData?.price || "", //number
      reference: initialData?.reference || "",
      customer: initialData?.customer || "",
      description: initialData?.description || "",
      fee: initialData?.fee || "", // number
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const body = {
        ...values,
        date: jalaliToGregorian(values.date),
      };
      onSubmit(body);
      resetForm();
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 w-full max-w-2xl mx-auto"
    >
      <SelectUsers className="md:col-span-2" data={peopleList} formik={formik} name="customer" />
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
      <TxtInput className="!col-span-2" formik={formik} name="description" label="شرح" />

      <SelectInput options={receiveTypeList} formik={formik} name="receipt_kind" label="نوع دریافت" />
      <SelectInput options={currencyList} formik={formik} name="" label="واحد پول" />
      <TxtInput placeholder="تومان" type="number" formik={formik} name="price" label="مبلغ" />
      <TxtInput formik={formik} name="reference" label="ارجاع" />
      <TxtInput placeholder="تومان" type="number" formik={formik} name="fee" label="کارمزد خدمات بانکی" />

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

export default ReceiveForm;

export const SelectUsers = ({
  formik,
  name,
  data,
  className,
}: {
  formik: any;
  name: string;
  data: ICustomer[];
  className?: string;
}) => {
  return (
    <div className={`w-full mx-auto flex flex-col col-span-2 md:col-span-1 ${className}`}>
      <span className="text-sm mb-2 text-gray-700">شخص</span>
      <select
        value={formik.values[name]}
        onChange={formik.handleChange}
        name={name}
        className="select !outline-0 !border border-gray-300 w-full bg-gray-100 "
      >
        <option value={""} disabled={true}>
          یک مورد انتخاب کنید
        </option>
        {data?.map((item, idx) => (
          <option className="truncate" value={item._id} key={idx}>
            {item.first_name} {item.last_name}
          </option>
        ))}
      </select>
      {formik.errors[name] && formik.touched[name] && (
        <span className="text-red-500 text-sm mt-2">{formik.errors[name]}</span>
      )}
    </div>
  );
};
