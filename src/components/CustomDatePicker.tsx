import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";

function CustomDatePicker({
  formik,
  label,
  containerClass,
  name,
}: {
  formik: any;
  label: string;
  containerClass?: string;
  name: string;
}) {
  return (
    <div className={`${containerClass} w-full mx-auto flex flex-col col-span-2 md:col-span-1`}>
      <span className="text-sm mb-2 text-gray-700">{label}</span>

      <DatePicker
        value={formik.values.date}
        onChange={(date: any) => {
          const formatted = date?.isValid ? date.format("YYYY/MM/DD") : "";
          formik.setFieldValue(name, formatted);
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
  );
}

export default CustomDatePicker;
