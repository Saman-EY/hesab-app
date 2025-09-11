import { useFormik } from "formik";
import * as Yup from "yup";
import TxtInput from "../../components/TxtInput";
import { useRef } from "react";
import { useCreateProduct } from "../../hooks/mutation";

function CreateProduct() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { mutate, isPending } = useCreateProduct();

  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      formik.setFieldValue("img", file); // <-- put file into formik
    }
  };

  const handleRemoveImage = () => {
    formik.setFieldValue("img", null);
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("الزامی است"),
    product_code: Yup.string().required("الزامی است"),
    barcode: Yup.string().required("الزامی است"),
    sell_price: Yup.string().required("الزامی است"),
    sell_description: Yup.string().required("الزامی است"),
    buy_price: Yup.string().required("الزامی است"),
    buy_description: Yup.string().required("الزامی است"),
    stock: Yup.string().required("الزامی است"),
    // img: Yup.mixed().required("تصویر الزامی است"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      product_code: "",
      barcode: "",
      sell_price: "", //number
      sell_description: "",
      buy_price: "", //number
      buy_description: "",
      stock: "", // number
      img: null,
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      Object.entries(values).forEach(([key, value]) => {
        if (value !== null) {
          formData.append(key, value as Blob | string);
        }
      });

      mutate(formData, {
        onSuccess: () => {
          // queryClient.invalidateQueries({ queryKey: ["payments-list"] });
          formik.resetForm();
        },
      });

      // Log all formData entries for debugging
      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }
    },
  });


  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <section className=" w-full max-w-4xl mx-auto">
        <section className="flex flex-wrap justify-center gap-10">
          <div className="flex flex-col gap-5 mt-12">
            {formik.values.img ? (
              <img
                className="size-40 rounded-xl object-cover border border-gray-200"
                // src={formik.values.img ? URL.createObjectURL(formik.values.img as Blob) : ""}
                src={URL.createObjectURL(formik.values.img as Blob)}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5 w-full max-w-2xl mx-auto">
            {/* <TxtInput formik={formik} type="number" name="" label="کد حسابداری" /> */}
            <TxtInput formik={formik} name="stock" numberFormat label="موجودی کالا" />
            <TxtInput className="!col-span-2" formik={formik} name="title" label="نام کالا" />
            <TxtInput formik={formik} name="product_code" label="کد کالا" />
            <TxtInput
              formik={formik}
              placeholder="بارکدهای مختلف را با ; از هم جدا کنید."
              name="barcode"
              label="بارکد"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 w-full  mx-auto ">
            <TxtInput formik={formik} numberFormat name="sell_price" placeholder="تومان" label="قیمت فروش" />
            <TxtInput className="!col-span-2" formik={formik} name="sell_description" label="توضیحات فروش" />
            <TxtInput formik={formik} name="buy_price" numberFormat placeholder="تومان" label="قیمت خرید" />
            <TxtInput className="!col-span-2" formik={formik} name="buy_description" label="توضیحات خرید" />
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
    </section>
  );
}

export default CreateProduct;
