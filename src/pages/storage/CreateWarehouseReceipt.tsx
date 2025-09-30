import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import SelectInput from "../../components/SelectInput";
import {
    useGetAllBuyQry,
    useGetAllBuyReturnQry,
    useGetAllSalesQry,
    useGetAllSalesReturnQry,
    useGetAllStorageQry,
} from "../../hooks/queries";
import { addCama, convertToJalali } from "../../tools";
import { useCreateDraft } from "../../hooks/mutation";

function CreateWarehouseReceipt() {
    const [isEnable, setIsEnable] = useState({
        sales: false,
        salesReturn: false,
        buy: false,
        buyReturn: false,
    });
    const { data: storageData } = useGetAllStorageQry();
    const { data: salesData } = useGetAllSalesQry(isEnable.sales);
    const { data: salesReturnData } = useGetAllSalesReturnQry(isEnable.salesReturn);
    const { data: buyData } = useGetAllBuyQry(isEnable.buy);
    const { data: buyReturnData } = useGetAllBuyReturnQry(isEnable.buyReturn);

    const { mutate, isPending } = useCreateDraft();

    const [currentFactoreData, setCurrentFactoreData] = useState<any>({});

    const queryClient = useQueryClient();

    const formik = useFormik({
        initialValues: {
            storage: "",
            factore_type: "",

            factore: "",
            saleback: "",
            buyfactore: "",
            buyback: "",
        },
        validationSchema: Yup.object({
            //   USDtoRial: Yup.string().required("الزامی است"),
        }),
        enableReinitialize: true,
        onSubmit: (values, { resetForm }) => {
            const body = Object.fromEntries(
                Object.entries(values).filter(([_, v]) => v !== "" && v !== null && v !== undefined)
            );

            mutate(body, {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["storages-list"] });
                },
            });

            resetForm();
            setIsEnable({
                sales: false,
                salesReturn: false,
                buy: false,
                buyReturn: false,
            });
            setCurrentFactoreData("");
        },
    });

    useEffect(() => {
        formik.setFieldValue("factore", "");
        formik.setFieldValue("saleback", "");
        formik.setFieldValue("buyfactore", "");
        formik.setFieldValue("buyback", "");
        setCurrentFactoreData({});
        if (formik.values.factore_type == "factore") {
            setIsEnable({
                sales: true,
                salesReturn: false,
                buy: false,
                buyReturn: false,
            });
        } else if (formik.values.factore_type == "saleback") {
            setIsEnable({
                sales: false,
                salesReturn: true,
                buy: false,
                buyReturn: false,
            });
        } else if (formik.values.factore_type == "buyfactore") {
            setIsEnable({
                sales: false,
                salesReturn: false,
                buy: true,
                buyReturn: false,
            });
        } else if (formik.values.factore_type == "buyback") {
            setIsEnable({
                sales: false,
                salesReturn: false,
                buy: false,
                buyReturn: true,
            });
        }
    }, [formik.values.factore_type]);

    useEffect(() => {
        if (formik.values.factore) {
            const finalData = salesData?.factores.find((item: any) => item._id == formik.values.factore);
            setCurrentFactoreData(finalData);
        }
        if (formik.values.saleback) {
            const finalData = salesReturnData?.factores.find((item: any) => item._id == formik.values.saleback);
            setCurrentFactoreData(finalData);
        }
        if (formik.values.buyfactore) {
            const finalData = buyData?.factores.find((item: any) => item._id == formik.values.buyfactore);
            setCurrentFactoreData(finalData);
        }
        if (formik.values.buyback) {
            const finalData = buyReturnData?.factores.find((item: any) => item._id == formik.values.buyback);
            setCurrentFactoreData(finalData);
        }
    }, [formik.values.buyback, formik.values.buyfactore, formik.values.saleback, formik.values.factore]);

    return (
        <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 w-full max-w-2xl mx-auto">
                <SelectInput
                    className="!col-span-3 md:!col-span-1"
                    options={storageData?.storage}
                    formik={formik}
                    name="storage"
                    withId
                    label="انتخاب انبار"
                />
                <SelectInput
                    className="!col-span-3 md:!col-span-1"
                    options={factoreType}
                    formik={formik}
                    name="factore_type"
                    label="نوع حواله انبار"
                />

                {isEnable.sales && (
                    <SelectInput
                        className="!col-span-3 md:!col-span-1"
                        options={salesData?.factores}
                        formik={formik}
                        name="factore"
                        withId
                        label="انتخاب فاکتور فروش"
                    />
                )}
                {isEnable.salesReturn && (
                    <SelectInput
                        className="!col-span-3 md:!col-span-1"
                        options={salesReturnData?.factores}
                        formik={formik}
                        name="saleback"
                        withId
                        label="انتخاب فاکتور برگشت از فروش"
                    />
                )}
                {isEnable.buy && (
                    <SelectInput
                        className="!col-span-3 md:!col-span-1"
                        options={buyData?.factores}
                        formik={formik}
                        name="buyfactore"
                        withId
                        label="انتخاب فاکتور خرید"
                    />
                )}
                {isEnable.buyReturn && (
                    <SelectInput
                        className="!col-span-3 md:!col-span-1"
                        options={buyReturnData?.factores}
                        formik={formik}
                        name="buyback"
                        withId
                        label="انتخاب فاکتور برگشت از خرید"
                    />
                )}

                {/* <SelectInput
          className="!col-span-3 md:!col-span-1"
          options={[]}
          formik={formik}
          name="vault"
          withId
          label="انتخاب فاکتور"
        /> */}

                {currentFactoreData && (
                    <section className="col-span-2">
                        <div className="flex items-center flex-wrap gap-10 mb-10 text-sm">
                            {currentFactoreData?.date && (
                                <div className="flex items-center gap-2">
                                    <span>تاریخ</span>
                                    <span>{convertToJalali(currentFactoreData?.date)}</span>
                                </div>
                            )}
                            {currentFactoreData?.receipt_date && (
                                <div className="flex items-center gap-2">
                                    <span>تاریخ</span>
                                    <span>{convertToJalali(currentFactoreData?.receipt_date)}</span>
                                </div>
                            )}
                            {currentFactoreData?.transportation_guy && (
                                <div className="flex items-center gap-2">
                                    <span>مسئول حمل و نقل</span>
                                    <span>
                                        {currentFactoreData?.transportation_guy?.first_name}{" "}
                                        {currentFactoreData?.transportation_guy?.last_name}
                                    </span>
                                </div>
                            )}
                        </div>
                        {currentFactoreData?.products && (
                            <>
                                <h6 className="font-semibold">محصولات</h6>
                                <section className="flex flex-col gap-3 mt-3 overflow-auto max-h-55">
                                    {currentFactoreData?.products?.map((product, idx) => (
                                        <div
                                            key={idx}
                                            className="border rounded-lg border-gray-300 p-5 text-sm flex flex-wrap items-center gap-5 justify-between"
                                        >
                                            <span>نام : {product.product.title}</span>
                                            <span>تعداد : {product?.count}</span>
                                            <span>قیمت واحد : {addCama(product?.price)}</span>
                                            <span>مالیات : {addCama(product?.tax)}</span>
                                            <span>تخفیف : {addCama(product?.discount)}</span>
                                            <span>قیمت کل : {addCama(product?.all_price)}</span>
                                        </div>
                                    ))}
                                </section>
                            </>
                        )}
                    </section>
                )}

                <button
                    disabled={isPending}
                    onClick={() => formik.submitForm()}
                    className="btn md:col-span-2 bg-sky-600 text-white w-full max-w-80 md:max-w-none mx-auto"
                >
                    ثبت
                </button>
            </div>
        </section>
    );
}

export default CreateWarehouseReceipt;

const factoreType = [
    {
        title: "فاکتور فروش",
        value: "factore",
    },
    {
        title: "فاکتور برگشت از فروش",
        value: "saleback",
    },
    {
        title: "فاکتور خرید",
        value: "buyfactore",
    },
    {
        title: "فاکتور برگشت از خرید",
        value: "buyback",
    },
];

const tempFac = {
    _id: "68d287bd7168efc61bd1c2ee",
    code: "309932",
    customer: {
        _id: "68d0f98af864611c07f86b14",
        accountant_code: "102547",
        company: "dqwdsad",
        title: "sdqwd",
        first_name: "tom",
        last_name: "hardy",
        kindofbusiness: "تامین کننده",
        address: "asdwqad",
        telphone: "",
        phone: "",
        fax: "",
        email: "",
        site: "",
        bank: "",
        bank_number: "",
        cart_number: "",
        ir_code: "",
        money_ineventory: "",
        price_list: "",
        tax_type: "",
        national_code: "",
        economic_code: "",
        branch_code: "",
        register_number: "",
        description: "",
        user: "68d0590cf864611c07f86a97",
        nickname: "tommy",
        createdAt: "2025-09-22T07:23:54.238Z",
        updatedAt: "2025-09-22T07:23:54.238Z",
        __v: 0,
    },
    date: "2025-09-22T20:30:00.000Z",
    receipt_date: "2025-09-22T20:30:00.000Z",
    project: {
        _id: "68d0f692f864611c07f86ab4",
        title: "project22",
        __v: 0,
    },
    seller: {
        _id: "68d0f9e0f864611c07f86b2c",
        accountant_code: "928873",
        name: "seller1",
        refund_price: 123,
        refund_percentage: 21321,
        sell_price: 23123,
        description: "",
        __v: 0,
    },
    title: "asdad",
    money: "EUR",
    description: "asdasd",
    vault: {
        _id: "68d0f99df864611c07f86b18",
        code: "101342",
        title: "storage1",
        storage_keeper: "شخص انبار دار",
        phone: 123123123,
        address: "ضصیضصی",
        __v: 0,
    },
    products: [
        {
            product: {
                _id: "68d0f673f864611c07f86aa8",
                accountant_code: "872185",
                title: "pro77",
                product_code: "qwed",
                barcode: "qwd",
                stock: 213,
                category: "product",
                sell_tax: "123",
                buy_tax: "123",
                tax_type: "tobacco",
                tax_code: 3123,
                tax_unit: "12312",
                __v: 0,
            },
            price: 123123,
            tax: 0,
            all_price: 123123,
            count: 1,
            description: "",
            discount: 0,
            _id: "68d287bd7168efc61bd1c2ef",
        },
    ],
    transportation_cost: 12313,
    transportation_guy: {
        _id: "68d0f98af864611c07f86b14",
        accountant_code: "102547",
        company: "dqwdsad",
        title: "sdqwd",
        first_name: "tom",
        last_name: "hardy",
        kindofbusiness: "تامین کننده",
        address: "asdwqad",
        telphone: "",
        phone: "",
        fax: "",
        email: "",
        site: "",
        bank: "",
        bank_number: "",
        cart_number: "",
        ir_code: "",
        money_ineventory: "",
        price_list: "",
        tax_type: "",
        national_code: "",
        economic_code: "",
        branch_code: "",
        register_number: "",
        description: "",
        user: "68d0590cf864611c07f86a97",
        nickname: "tommy",
        createdAt: "2025-09-22T07:23:54.238Z",
        updatedAt: "2025-09-22T07:23:54.238Z",
        __v: 0,
    },
    status: "pending",
    final_price: 123123,
    __v: 0,
};
