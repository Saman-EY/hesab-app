import { useFormik } from "formik";
import * as Yup from "yup";
import TxtInput from "../../components/TxtInput";
import { useRef, useState } from "react";

function CreateService() {
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file select
  const handleSelectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }

    console.log(file);
  };

  // Handle remove
  const handleRemoveImage = () => {
    setImage(null);
  };

  const validationSchema = Yup.object({
    // first_name: Yup.string().required("الزامی است"),
    // last_name: Yup.string().required("الزامی است"),
    // accountant_code: Yup.number().required("الزامی است"),
    // title: Yup.string().required("الزامی است"),
    // company: Yup.string().required("الزامی است"),
    // kindofbusiness: Yup.string().required("الزامی است"),
    // address: Yup.string().required("الزامی است"),
  });

  const formik = useFormik({
    initialValues: {},
    validationSchema,
    onSubmit: (values) => {},
  });

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <section className=" w-full max-w-4xl mx-auto">
        <section className="flex flex-wrap justify-center gap-10">
          <div className="flex flex-col gap-5 mt-12">
            {image ? (
              <img className="size-40 rounded-xl object-cover border border-gray-200" src={image} alt="" />
            ) : (
              <img className="size-40 rounded-xl object-cover" src="/service-form.png" alt="" />
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
            <TxtInput formik={formik} type="number" name="" label="کد حسابداری" />
            {/* <TxtInput formik={formik} name="" label="موجودی کالا" /> */}
            <TxtInput className="!col-span-2" formik={formik} name="" label="عنوان خدمات" />
            <TxtInput formik={formik} name="" label="کد خدمات" />
            <TxtInput formik={formik} placeholder="بارکدهای مختلف را با ; از هم جدا کنید." name="" label="بارکد" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 w-full  mx-auto ">
            <TxtInput formik={formik} name="" placeholder="تومان" label="قیمت فروش" />
            <TxtInput className="!col-span-2" formik={formik} name="" label="توضیحات فروش" />
            <TxtInput formik={formik} name="" placeholder="تومان" label="قیمت خرید" />
            <TxtInput className="!col-span-2" formik={formik} name="" label="توضیحات خرید" />
          </div>

          <button
            // disabled={isPending}
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

export default CreateService;
