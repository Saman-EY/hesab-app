import React from "react";

interface Props {
  label: string;
  name: string;
  formik: any;
  placeholder?: string;
  className?: string;
  rows?: number;
}

function TxtArea({ label, name, formik, placeholder, className, rows = 4 }: Props) {
  return (
    <div className="w-full  mx-auto col-span-2 flex flex-col ">
      <span className="text-sm mb-2 text-gray-700">{label}</span>
      <textarea
        name={name}
        rows={rows}
        className={`resize-none textarea-ghost textarea w-full !border border-gray-300 bg-gray-100 ${className}`}
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={formik.handleChange}
      ></textarea>
      {formik.errors[name] && formik.touched[name] && (
        <span className="text-red-500 text-sm mt-2">{formik.errors[name]}</span>
      )}
    </div>
  );
}

export default TxtArea;
