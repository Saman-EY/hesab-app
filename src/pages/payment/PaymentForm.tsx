import { useFormik } from "formik";
import * as Yup from "yup";
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
import { jalaliToGregorian } from "../../tools";
import { SelectUsers } from "../receive/ReceiveForm";
import type { IPayment } from "../../allTypes";
import moment from "moment-jalaali";

interface FormProps {
    initialData?: IPayment; // your type from earlier
    onSubmit: (values: any) => void; // callback for create or update
    isPending?: boolean;
}

const validationSchema = Yup.object({
    date: Yup.string().required("الزامی است"),
    project: Yup.string().required("الزامی است"),
    reference: Yup.string().required("الزامی است"),
    fee: Yup.number().required("الزامی است"),
    description: Yup.string().required("الزامی است"),
    money: Yup.string().required("الزامی است"),
});

const customLocale = {
    ...persian_fa,
    digits: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"], // force EN digits
};

function PaymentForm({ initialData, onSubmit, isPending }: FormProps) {
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
            date: moment(initialData?.date).format("jYYYY/jMM/jDD") || "",
            project: initialData?.project._id || "",
            reference: initialData?.reference || "",
            fee: initialData?.fee || null, // number
            description: initialData?.description || "",
            customers: initialCustomers || [],
            money: initialData?.money || "", // number

            vaults: initialVaults || [],
            banks: initialBanks || [],
            funds: initialFunds || [],
            accountType: "",
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
                banks: values.banks.map((c: any) => ({
                    ...c,
                    price: Number(c.price),
                })),
                vaults: values.vaults.map((c: any) => ({
                    ...c,
                    price: Number(c.price),
                })),
                funds: values.funds.map((c: any) => ({
                    ...c,
                    price: Number(c.price),
                })),
            };

            //@ts-expect-error any
            delete body.accountType;

            if (body.customers.length === 0) {
                delete body.customers;
            }
            if (body.banks.length === 0) {
                delete body.banks;
            }
            if (body.vaults.length === 0) {
                delete body.vaults;
            }

            onSubmit(body);
            resetForm();
        },
    });

    const currentAccountType = formik.values.accountType;

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
                    locale={customLocale}
                    calendarPosition="bottom-right"
                />
                {formik.errors.date && formik.touched.date && (
                    <span className="text-red-500 text-sm mt-2">{formik.errors.date}</span>
                )}
            </div>
            <SelectInput withId options={projectsList} formik={formik} name="project" label="پروژه" />

            <TxtInput className="!col-span-2" formik={formik} name="description" label="شرح" />

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
                    className="bg-green-600 text-white w-fit font-semibold text-sm px-4 py-2 rounded-md"
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
                    <div className="border relative  grid grid-cols-2 gap-4 rounded-lg border-gray-300 p-5">
                        <SelectInput
                            withId
                            name={`funds.${idx}.fund`}
                            formik={formik}
                            label="تنخواه گردان"
                            className=""
                            options={fundsList?.funds}
                        />

                        <TxtInput
                            placeholder="تومان"
                            type="number"
                            formik={formik}
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
                    <div className="border relative grid grid-cols-2 gap-4 rounded-lg border-gray-300 p-5">
                        <SelectInput
                            name={`banks.${idx}.bank`}
                            formik={formik}
                            label="بانک"
                            className=""
                            options={banksList?.banks}
                            withId
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
                    <div className="border relative  grid grid-cols-2 gap-4 rounded-lg border-gray-300 p-5">
                        <SelectInput
                            name={`vaults.${idx}.vault`}
                            formik={formik}
                            label="صندوق"
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

export default PaymentForm;

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
