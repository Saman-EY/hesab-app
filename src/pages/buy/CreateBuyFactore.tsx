import { useFormik } from "formik";
import * as Yup from "yup";
import { useQueryClient } from "@tanstack/react-query";
import type { ISeller } from "../../allTypes";
import TxtInput from "../../components/TxtInput";
import SelectInput from "../../components/SelectInput";
import { currencyList } from "../../localDatas";

import {
    useGetAllCustomersQry,
    useGetAllProjectsQry,
    useGetAllSellersQry,
    useGetAllStorageQry,
} from "../../hooks/queries";
import CustomDatePicker from "../../components/CustomDatePicker";
import { SelectUsers } from "../receive/ReceiveForm";
import { useState } from "react";
import { useCreateBuy, useCreateCustomer } from "../../hooks/mutation";

import { jalaliToGregorian } from "../../tools";
import TableForm from "../sales/TableForm";

const validationSchema = Yup.object({
    date: Yup.string().required("الزامی است"),
    project: Yup.string().required("الزامی است"),
    receipt_date: Yup.string().required("الزامی است"),
    title: Yup.string().required("الزامی است"),
    sponser: Yup.string().required("الزامی است"),
    description: Yup.string(),
    money: Yup.string().required("الزامی است"),
    products: Yup.array().of(
        Yup.object({
            product: Yup.string().required("الزامی است"),
            description: Yup.string(),
            price: Yup.number().required("الزامی است"),
            tax: Yup.number(),
            // all_price: Yup.number().required("الزامی است"),
            count: Yup.number().required("الزامی است"),
            discount: Yup.number(),
        })
    ),
});

function CreateBuyFactore() {
    const { mutate, isPending } = useCreateCustomer();
    const { mutate: createSale, isPending: isSalePending } = useCreateBuy();
    const { data } = useGetAllCustomersQry();
    const { data: sellersData } = useGetAllSellersQry();
    const { data: projectsList } = useGetAllProjectsQry();
    const { data: storageData } = useGetAllStorageQry();

    const queryClient = useQueryClient();
    const peopleList = data?.customers;
    const sellersList = sellersData?.sellers;
    const storageList = storageData?.storage;

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            money: "",
            sponser: "",
            project: "",
            date: "",
            receipt_date: "",

            transportation_cost: "",
            transportation_guy: "",
            vault: "",
            final_price: "",
            products: [
                {
                    product: "",
                    description: "",
                    count: 1,
                    price: 0,
                    tax: 0,
                    discount: 0,
                    all_price: 0,
                },
            ],
        },

        validationSchema,
        onSubmit: (values, { resetForm }) => {
            const body = {
                ...values,
                date: jalaliToGregorian(values.date),
                receipt_date: jalaliToGregorian(values.receipt_date),
                transportation_cost: Number(values.transportation_cost),
            };

            createSale(body, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["buy-list"] });
                    queryClient.invalidateQueries({ queryKey: ["product-service-list"] });
                    queryClient.invalidateQueries({ queryKey: ["customers-list"] });
                },
            });

            resetForm();
        },
    });

    return (
        <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
            <section className="grid grid-cols-3 gap-5 mt-5 w-full max-w-[1500px] mx-auto">
                <TxtInput className="!col-span-3 md:!col-span-1" formik={formik} name="description" label="شرح" />
                <CustomDatePicker
                    containerClass="!col-span-3 md:!col-span-1"
                    name="date"
                    formik={formik}
                    label="تاریخ"
                />
                <CustomDatePicker
                    containerClass="!col-span-3 md:!col-span-1"
                    name="receipt_date"
                    formik={formik}
                    label="تاریخ سررسید"
                />
                <SelectInput
                    className="!col-span-3 md:!col-span-1"
                    withId
                    options={projectsList}
                    formik={formik}
                    name="project"
                    label="پروژه"
                />

                <TxtInput className="!col-span-3 md:!col-span-1" formik={formik} name="title" label="عنوان" />
                <SelectInput
                    className="!col-span-3 md:!col-span-1"
                    options={currencyList}
                    formik={formik}
                    name="money"
                    label="واحد پول"
                />
                <SelectSellers
                    label="تامین کننده"
                    className="!col-span-3 md:!col-span-1"
                    data={sellersList}
                    formik={formik}
                    name="sponser"
                />

                <SelectUsers data={peopleList} formik={formik} name="transportation_guy" label="مسئول حمل و نقل" />

                <TxtInput
                    className="!col-span-3 md:!col-span-1"
                    type="number"
                    formik={formik}
                    name="transportation_cost"
                    label="هزینه حمل و نقل"
                />
                <SelectInput
                    className="!col-span-3 md:!col-span-1"
                    options={storageList}
                    formik={formik}
                    name="vault"
                    withId
                    label="انتخاب انبار"
                />

                <section className="col-span-3">
                    <TableForm formik={formik} />
                    <button
                        onClick={() => formik.submitForm()}
                        disabled={isPending}
                        className="btn md:col-span-2 bg-sky-600 text-white w-full max-w-80 md:max-w-none mx-auto mt-5"
                    >
                        ثبت
                    </button>
                </section>
            </section>
        </section>
    );
}

export default CreateBuyFactore;

export const SelectSellers = ({
    data,
    formik,
    name,
    className,
    label,
}: {
    data: ISeller[];
    formik: any;
    name: string;
    label?: string;
    className?: string;
}) => {
    return (
        <div className={`w-full mx-auto flex flex-col col-span-2 md:col-span-1 ${className}`}>
            <span className="text-sm mb-2 text-gray-700">{label ? label : "فروشنده"}</span>
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
                        {item.accountant_code} - {item.name}
                    </option>
                ))}
            </select>
            {formik.errors[name] && formik.touched[name] && (
                <span className="text-red-500 text-sm mt-2">{formik.errors[name]}</span>
            )}
        </div>
    );
};
