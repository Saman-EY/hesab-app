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
import {
    useGetAllBanksQry,
    useGetAllCustomersQry,
    useGetAllFundsQry,
    useGetAllProjectsQry,
    useGetAllVaultsQry,
} from "../../hooks/queries";
import { useEffect } from "react";

interface FormProps {
    initialData?: IReceive; // your type from earlier
    onSubmit: (values: any) => void; // callback for create or update
    isPending?: boolean;
}

const validationSchema = Yup.object({
    date: Yup.string().required("الزامی است"),
    project: Yup.string().required("الزامی است"),
    receipt_kind: Yup.string().required("الزامی است"),
    reference: Yup.string().required("الزامی است"),
    fee: Yup.number().required("الزامی است"),
    description: Yup.string().required("الزامی است"),
    money: Yup.string().required("الزامی است"),
});

function ReceiveForm({ initialData, onSubmit, isPending }: FormProps) {
    const { data } = useGetAllCustomersQry();
    const { data: projectsList } = useGetAllProjectsQry();
    const { data: banksList } = useGetAllBanksQry();
    const { data: fundsList } = useGetAllFundsQry();
    const { data: vaultsList } = useGetAllVaultsQry();

    const peopleList = data?.customers;

    const initialCustomers = initialData?.customers.map((item) => ({ customer: item.customer, price: item.price }));
    const initialVaults = initialData?.vaults.map((item) => ({ vault: item.vault, price: item.price }));
    const initialBanks = initialData?.banks.map((item) => ({ bank: item.bank, price: item.price }));
    const initialFunds = initialData?.funds.map((item) => ({ fund: item.fund, price: item.price }));

    const formik = useFormik({
        initialValues: {
            date: initialData?.date || "",
            project: initialData?.project || "",
            receipt_kind: initialData?.receipt_kind || "",
            reference: initialData?.reference || "",
            customers: initialCustomers || [],

            vaults: initialVaults || [],
            banks: initialBanks || [],
            funds: initialFunds || [],
            accountType: "",

            description: initialData?.description || "",
            fee: initialData?.fee || "", // number
            money: initialData?.money || "", // number
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            const { ...restValues } = values; // removes "type"
            const body = {
                ...restValues,
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

    const currentAccountType = formik.values.accountType;
    console.log("**", initialCustomers, formik.values);

    useEffect(() => {
        if (!currentAccountType) return;

        // Example: clear specific arrays when account type changes
        formik.setFieldValue("banks", []);
        formik.setFieldValue("funds", []);
        formik.setFieldValue("vaults", []);
    }, [currentAccountType]);

    // Generic Add Row
    const addRow = <T extends object>(field: keyof typeof formik.values, defaultItem: T) => {
        formik.setFieldValue(field, [...(formik.values[field] as T[]), defaultItem]);
    };

    // Generic Remove Row
    const removeRow = (field: keyof typeof formik.values, index: number) => {
        const newItems = (formik.values[field] as unknown[]).filter((_, i) => i !== index);
        formik.setFieldValue(field, newItems);
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

            <SelectInput options={receiveTypeList} formik={formik} name="receipt_kind" label="نوع دریافت" />
            <SelectInput options={currencyList} formik={formik} name="money" label="واحد پول" />
            {/* <TxtInput placeholder="تومان" type="number" formik={formik} name="price" label="مبلغ" /> */}
            <TxtInput formik={formik} name="reference" label="ارجاع" />
            <TxtInput placeholder="تومان" type="number" formik={formik} name="fee" label="کارمزد خدمات بانکی" />

            {/* customer list */}
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
                            item={item.price}
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                removeRow("customers", idx);
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
                        addRow("customers", { customer: "", price: "" });
                    }}
                    type="button"
                    className="bg-green-600 text-white w-fit font-semibold text-sm px-4 py-2 rounded-md mr-auto"
                >
                    اضافه کردن شخص
                </button>
            </section>

            {/* accounts list */}
            <section className="flex flex-col col-span-full gap-3">
                <div className="flex items-end gap-4 ">
                    <SelectInput formik={formik} label="نوع حساب" name="accountType" options={accountsOption} />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            if (currentAccountType === "fund") {
                                addRow("funds", { fund: "", price: "" });
                            } else if (currentAccountType === "bank") {
                                addRow("banks", { bank: "", price: "" });
                            } else if (currentAccountType === "vault") {
                                addRow("vaults", { vault: "", price: "" });
                            }
                        }}
                        type="button"
                        className={` ${
                            !currentAccountType ? "opacity-50 pointer-events-none" : ""
                        }  bg-yellow-500 text-white w-fit whitespace-nowrap font-semibold text-sm px-4 py-2 rounded-md`}
                    >
                        اضافه کردن حساب
                    </button>
                </div>

                {/* FUNDS LIST */}
                {formik.values.funds.map((item, idx) => (
                    <div className="border relative pt-12 grid grid-cols-2 gap-4 rounded-lg border-gray-300 p-5">
                        <span className="bg-yellow-500 absolute right-2 top-2 text-sm flex items-center justify-center text-white size-8 rounded-full">
                            {idx + 1}
                        </span>
                        <SelectInput
                            item={item}
                            name={`funds.${idx}.fund`}
                            formik={formik}
                            label="تنخواه گردان"
                            className=""
                            options={[]}
                        />

                        <TxtInput
                            placeholder="تومان"
                            type="number"
                            formik={formik}
                            className=""
                            name={`funds.${idx}.price`}
                            item={item.price}
                            label="مبلغ"
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                removeRow("funds", idx);
                            }}
                            className="btn bg-red-600 text-white text-xs px-2 py-2 h-fit mt-2 w-fit col-span-full mr-auto"
                        >
                            حذف
                        </button>
                    </div>
                ))}
                {/* BANKS LIST */}
                {formik.values.banks.map((item, idx) => (
                    <div className="border relative pt-12 grid grid-cols-2 gap-4 rounded-lg border-gray-300 p-5">
                        <span className="bg-yellow-500 absolute right-2 top-2 text-sm flex items-center justify-center text-white size-8 rounded-full">
                            {idx + 1}
                        </span>
                        <SelectInput
                            item={item}
                            name={`banks.${idx}.bank`}
                            formik={formik}
                            label="بانک"
                            className=""
                            options={[]}
                        />

                        <TxtInput
                            placeholder="تومان"
                            type="number"
                            formik={formik}
                            className=""
                            name={`banks.${idx}.price`}
                            item={item.price}
                            label="مبلغ"
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                removeRow("banks", idx);
                            }}
                            className="btn bg-red-600 text-white text-xs px-2 py-2 h-fit mt-2 w-fit col-span-full mr-auto"
                        >
                            حذف
                        </button>
                    </div>
                ))}
                {/* VAULTS LIST */}
                {formik.values.vaults.map((item, idx) => (
                    <div className="border relative pt-12 grid grid-cols-2 gap-4 rounded-lg border-gray-300 p-5">
                        <span className="bg-yellow-500 absolute right-2 top-2 text-sm flex items-center justify-center text-white size-8 rounded-full">
                            {idx + 1}
                        </span>
                        <SelectInput
                            item={item?.vault}
                            name={`vaults.${idx}.vault`}
                            formik={formik}
                            label="صندوق"
                            className=""
                            options={vaultsList?.vaults}
                            withId
                        />

                        <TxtInput
                            placeholder="تومان"
                            type="number"
                            formik={formik}
                            className=""
                            name={`vaults.${idx}.price`}
                            item={item.price}
                            label="مبلغ"
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                removeRow("vaults", idx);
                            }}
                            className="btn bg-red-600 text-white text-xs px-2 py-2 h-fit mt-2 w-fit col-span-full mr-auto"
                        >
                            حذف
                        </button>
                    </div>
                ))}
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

export default ReceiveForm;

export const SelectUsers = ({
    formik,
    name,
    data,
    className,
    label,
    item,
}: {
    formik: any;
    item?: any;
    name: string;
    data: ICustomer[];
    className?: string;
    label?: string;
}) => {
    return (
        <div className={`w-full mx-auto flex flex-col col-span-2 md:col-span-1 ${className}`}>
            <span className="text-sm mb-2 text-gray-700"> {label ? label : "مشتری"} </span>
            <select
                value={item ? item?.customer : formik.values[name]}
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

const accountsOption = [
    {
        value: "fund",
        title: "تنخواه گردان",
    },
    {
        value: "bank",
        title: "بانک",
    },
    {
        value: "vault",
        title: "صندوق",
    },
];
