import { useFormik } from "formik";
import * as Yup from "yup";
import TxtInput from "../../components/TxtInput";
import SelectInput from "../../components/SelectInput";
import { currencyList, receiveTypeList } from "../../localDatas";

import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useGetAllCustomersQry, useGetAllProjectsQry } from "../../hooks/queries";
import { jalaliToGregorian } from "../../tools";
import { SelectUsers } from "../receive/ReceiveForm";
import type { IPayment } from "../../allTypes";

interface FormProps {
    initialData?: IPayment; // your type from earlier
    onSubmit: (values: any) => void; // callback for create or update
    isPending?: boolean;
}

const validationSchema = Yup.object({
    date: Yup.string().required("الزامی است"),
    project: Yup.string().required("الزامی است"),
    payment_kind: Yup.string().required("الزامی است"),
    reference: Yup.string().required("الزامی است"),
    fee: Yup.number().required("الزامی است"),
    description: Yup.string().required("الزامی است"),
    money: Yup.string().required("الزامی است"),
});

function PaymentForm({ initialData, onSubmit, isPending }: FormProps) {
    const { data } = useGetAllCustomersQry();
    const { data: projectsList } = useGetAllProjectsQry();

    const peopleList = data?.customers;

    const formik = useFormik({
        initialValues: {
            date: initialData?.date || "",
            project: initialData?.project || "",
            payment_kind: initialData?.payment_kind || "",
            reference: initialData?.reference || "",
            fee: initialData?.fee || null, // number
            description: initialData?.description || "",
            customers: [],
            money: initialData?.money || "", // number
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            const body = {
                ...values,
                date: jalaliToGregorian(values.date),
                fee: Number(values.fee),
                customers: values.customers.map((c: any) => ({
                    ...c,
                    price: Number(c.price),
                })),
            };

            onSubmit(body);
            resetForm();
        },
    });

    // Add row
    const addRow = () => {
        formik.setFieldValue("customers", [
            ...formik.values.customers,
            {
                customer: "",
                price: "",
            },
        ]);
    };

    // Remove row
    const removeRow = (index: number) => {
        const newItems = formik.values.customers.filter((_, i) => i !== index);
        formik.setFieldValue("customers", newItems);
    };

    return (
        <form
            onSubmit={formik.handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 w-full max-w-2xl mx-auto"
        >
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
            <SelectInput withId options={projectsList} formik={formik} name="project" label="پروژه" />

            <TxtInput className="!col-span-2" formik={formik} name="description" label="شرح" />

            <SelectInput options={receiveTypeList} formik={formik} name="payment_kind" label="نوع پرداخت" />
            <SelectInput options={currencyList} formik={formik} name="money" label="واحد پول" />

            <TxtInput formik={formik} name="reference" label="ارجاع" />
            <TxtInput placeholder="تومان" type="number" formik={formik} name="fee" label="کارمزد خدمات بانکی" />

            <section className="flex flex-col col-span-full gap-3">
                {formik.values.customers.map((item, idx) => (
                    <div key={idx} className="border relative pt-12 flex flex-col rounded-lg border-gray-300 p-5">
                        <span className="bg-green-600 absolute right-2 top-2 text-sm flex items-center justify-center text-white size-8 rounded-full">
                            {idx + 1}
                        </span>
                        <SelectUsers
                            item={item}
                            label=""
                            className="md:col-span-2"
                            data={peopleList}
                            formik={formik}
                            name={`customers.${idx}.customer`}
                        />
                        <TxtInput
                            placeholder="تومان"
                            type="number"
                            formik={formik}
                            className="mt-4"
                            name={`customers.${idx}.price`}
                            label="مبلغ"
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                removeRow(idx);
                            }}
                            className="btn bg-red-600 text-white text-xs px-2 py-2 h-fit mt-2 w-fit mr-auto"
                        >
                            حذف
                        </button>
                    </div>
                ))}

                <button
                    onClick={(e) => {
                        e.preventDefault();
                        addRow();
                    }}
                    type="button"
                    className="bg-green-600 text-white w-fit font-semibold text-sm px-4 py-2 rounded-md"
                >
                    اضافه کردن شخص
                </button>
            </section>

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

export default PaymentForm;
