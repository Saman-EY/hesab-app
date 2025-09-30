import { useFormik } from "formik";
import * as Yup from "yup";
import TxtInput from "../../components/TxtInput";
import { useEffect, useRef, useState } from "react";
import type { IProductAndService } from "../../allTypes";
import SelectInput from "../../components/SelectInput";
import { taxTypeList } from "../../localDatas";
import { urlToFile } from "../../tools";
import { useGetCategoriesQry } from "../../hooks/queries";

interface FormProps {
    initialData?: IProductAndService; // your type from earlier
    onSubmit: (values: any) => void; // callback for create or update
    isPending?: boolean;
}

const validationSchema = Yup.object({
    title: Yup.string().required("الزامی است"),
    product_code: Yup.string().required("الزامی است"),
    stock: Yup.string().required("الزامی است"),
    category: Yup.string().required("الزامی است"),
});

function ProductForm({ initialData, onSubmit, isPending }: FormProps) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const { data: catsData } = useGetCategoriesQry();

    const [subCatList, setSubCatList] = useState([]);

    const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        console.log(e.target.files);
        if (file) {
            formik.setFieldValue("img", file); // <-- put file into formik
        }
    };

    const handleRemoveImage = () => {
        formik.setFieldValue("img", null);
    };

    const formik = useFormik({
        initialValues: {
            title: initialData?.title || "",
            product_code: initialData?.product_code || "",
            category: "",
            subcategory: "",
            stock: initialData?.stock || "", // number
            sell_tax: initialData?.sell_tax || "", // number
            buy_tax: initialData?.buy_tax || "", // number
            tax_type: initialData?.tax_type || "", // number
            tax_code: initialData?.tax_code || "", // number
            tax_unit: initialData?.tax_unit || "", // number
            img: null,
            //   img: initialData?.img || null,
        },
        validationSchema,
        onSubmit: (values, { resetForm }) => {
            const formData = new FormData();

            Object.entries(values).forEach(([key, value]) => {
                if (value !== null) {
                    formData.append(key, value as Blob | string);
                }
            });

            onSubmit(formData);
            resetForm();
        },
    });

    useEffect(() => {
        if (initialData?.img && typeof initialData.img === "string") {
            const imageUrl = `${import.meta.env.VITE_BASE_URL}/${initialData.img}`;
            urlToFile(imageUrl, "current-image.jpg", "image/jpeg").then((file) => {
                formik.setFieldValue("img", file); // now it's a File, same as user upload
                console.log("**", imageUrl, file);
            });
        }
    }, [initialData]);

    useEffect(() => {
        if (formik.values.category) {
            // find selected main category
            const selectedCat = catsData?.categories.find((cat) => cat._id === formik.values.category);

            if (selectedCat) {
                setSubCatList(selectedCat.subcategories || []);
                // reset previous subcategory when main changes
                formik.setFieldValue("subcategory", "");
            } else {
                setSubCatList([]);
                formik.setFieldValue("subcategory", "");
            }
        }
    }, [formik.values.category, catsData]);

    return (
        <section className=" w-full max-w-4xl mx-auto">
            <section className="flex flex-wrap justify-center gap-10">
                <div className="flex flex-col gap-5 mt-9">
                    {!formik.values.img && initialData?.img ? (
                        <img
                            className="size-20 object-cover min-w-20"
                            src={import.meta.env.VITE_BASE_URL + "/" + initialData?.img}
                            alt=""
                        />
                    ) : formik.values.img ? (
                        <img
                            className="size-40 rounded-xl object-cover border border-gray-200"
                            // src={formik.values.img ? URL.createObjectURL(formik.values.img as Blob) : ""}
                            src={
                                formik.values.img && typeof formik.values.img !== "string"
                                    ? URL.createObjectURL(formik.values.img as Blob)
                                    : ""
                            }
                            alt=""
                        />
                    ) : (
                        <img className="size-40 rounded-xl object-cover" src="/product-form.png" alt="" />
                    )}

                    <div className="flex items-center gap-5 justify-center">
                        <button onClick={() => fileInputRef.current?.click()} className="text-xs text-sky-600">
                            انتخاب
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleSelectImage}
                                className="hidden"
                            />
                        </button>
                        <button onClick={handleRemoveImage} className="text-xs text-red-600">
                            حذف
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 w-full max-w-2xl mx-auto h-fit my-auto">
                    {/* <TxtInput formik={formik} type="number" name="" label="کد حسابداری" /> */}
                    <TxtInput formik={formik} name="stock" numberFormat label="موجودی کالا" />
                    <TxtInput formik={formik} name="product_code" label="کد کالا" />
                    <SelectInput
                        withId
                        options={catsData?.categories}
                        formik={formik}
                        name="category"
                        label="دسته بندی"
                    />

                    <SelectInput
                        className={subCatList.length ? "" : `pointer-events-none opacity-50`}
                        options={subCatList}
                        formik={formik}
                        name="subcategory"
                        label="زیر دسته"
                        withId
                    />

                    <TxtInput className="!col-span-2" formik={formik} name="title" label="نام کالا" />
                </div>

              

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 w-full  mx-auto ">
                    <TxtInput formik={formik} numberFormat name="sell_tax" label="مالیات فروش" />
                    <TxtInput formik={formik} numberFormat name="buy_tax" label="مالیات خرید" />
                    <SelectInput options={taxTypeList} formik={formik} name="tax_type" label="نوع مالیات" />

                    <TxtInput formik={formik} numberFormat name="tax_code" label="کد مالیاتی" />
                    <TxtInput formik={formik} name="tax_unit" label="واحد مالیاتی" />
                </div>

                <button
                    disabled={isPending}
                    onClick={() => formik.handleSubmit()}
                    type="submit"
                    className="btn md:col-span-2 bg-sky-600 text-white w-full max-w-80 md:max-w-none mx-auto"
                >
                    ثبت
                </button>
            </section>
        </section>
    );
}

export default ProductForm;
