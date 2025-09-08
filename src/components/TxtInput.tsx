import { noSpaces, onlyGetsNumbers } from "../tools";

const TxtInput = ({
  label,
  name,
  formik,
  placeholder,
  type = "text",
  className,
}: {
  label: string;
  formik: any;
  name: string;
  type?: string;
  placeholder?: string;
  className?: string;
}) => {
  return (
    <div className={`w-full  mx-auto flex flex-col col-span-2 md:col-span-1 ${className}`}>
      <span className="text-sm mb-2 text-gray-700">{label}</span>
      <label className="input input-ghost !border border-gray-300 w-full bg-gray-100">
        <input
          onInput={type === "number" ? onlyGetsNumbers : noSpaces}
          name={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          placeholder={placeholder}
          type="text"
        />
      </label>
      {formik.errors[name] && formik.touched[name] && (
        <span className="text-red-500 text-sm mt-2">{formik.errors[name]}</span>
      )}
    </div>
  );
};

export default TxtInput;
