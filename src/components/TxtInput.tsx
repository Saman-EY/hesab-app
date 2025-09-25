// import { noSpaces, onlyGetsNumbers } from "../tools";

// const TxtInput = ({
//   label,
//   name,
//   formik,
//   placeholder,
//   type = "text",
//   className,
//   numberFormat,
// }: {
//   label: string;
//   formik: any;
//   name: string;
//   type?: string;
//   placeholder?: string;
//   className?: string;
//   numberFormat?: boolean;
// }) => {
//   return (
//     <div className={`w-full  mx-auto flex flex-col col-span-2 md:col-span-1 ${className}`}>
//       <span className="text-sm mb-2 text-gray-700">{label}</span>
//       <label className="input input-ghost !border border-gray-300 w-full bg-gray-100">
//         <input
//           onInput={type === "number" ? onlyGetsNumbers : noSpaces}
//           name={name}
//           value={formik.values[name]}
//           onChange={formik.handleChange}
//           placeholder={placeholder}
//           type={numberFormat ? "number" : "text"}
//         />
//       </label>
//       {formik.errors[name] && formik.touched[name] && (
//         <span className="text-red-500 text-sm mt-2">{formik.errors[name]}</span>
//       )}
//     </div>
//   );
// };

// export default TxtInput;

import { noSpaces, onlyGetsNumbers } from "../tools";
import { addCama } from "../tools"; // your comma formatter

const TxtInput = ({
  label,
  name,
  formik,
  placeholder,
  type = "text",
  className,
  numberFormat,
  formatWithComma, // 👈 new prop
}: {
  label: string;
  formik: any;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
  numberFormat?: boolean;
  formatWithComma?: boolean; // 👈 optional
}) => {
  const rawValue = formik.values[name];

  // only format when formatWithComma is true
  const displayValue = formatWithComma && rawValue ? addCama(Number(rawValue)) : rawValue;

  return (
    <div className={`w-full mx-auto flex flex-col col-span-2 md:col-span-1 ${className}`}>
      <span className="text-sm mb-2 text-gray-700">{label}</span>
      <label className="input input-ghost !border border-gray-300 w-full bg-gray-100">
        <input
          name={name}
          value={displayValue}
          placeholder={placeholder}
          onInput={type === "number" ? onlyGetsNumbers : noSpaces}
          onChange={(e) => {
            let value = e.target.value;
            if (formatWithComma) {
              value = value.replace(/,/g, ""); // remove commas before saving
              // format with comma after saving
              formik.setFieldValue(name, Number(value));
              return;
            }
            formik.setFieldValue(name, value); // store clean digits/string
          }}
          type={numberFormat ? "text" : type} // force text if formatting
        />
      </label>
      {formik.errors[name] && formik.touched[name] && (
        <span className="text-red-500 text-sm mt-2">{formik.errors[name]}</span>
      )}
    </div>
  );
};

export default TxtInput;
