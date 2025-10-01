import { getIn } from "formik";
import { testArray } from "../localDatas";

const SelectInput = ({
    label,
    name,
    formik,
    options = testArray,
    className,
    withId = false,
    item,
}: {
    label: string;
    formik: any;
    name: string;
    options?: { title?: string; value?: string; _id?: string }[];
    className?: string;
    withId?: boolean;
    item?: boolean;
}) => {
    const fieldValue = getIn(formik.values, name);

    return (
        <div className={`w-full mx-auto flex flex-col col-span-2 md:col-span-1 ${className}`}>
            <span className="text-sm mb-2 text-gray-700">{label}</span>
            <select
                value={fieldValue || ""}
                onChange={formik.handleChange}
                name={name}
                className="select !outline-0 !border border-gray-300 w-full bg-gray-100"
            >
                <option value={""} disabled={true}>
                    یک مورد انتخاب کنید
                </option>

                {withId
                    ? options.map((item, idx) => (
                          <option value={item._id} key={idx}>
                              {item.title}
                          </option>
                      ))
                    : options.map((item, idx) => (
                          <option value={item.value} key={idx}>
                              {item.title}
                          </option>
                      ))}

                {}
            </select>
            {formik.errors[name] && formik.touched[name] && (
                <span className="text-red-500 text-sm mt-2">{formik.errors[name]}</span>
            )}
        </div>
    );
};

export default SelectInput;
