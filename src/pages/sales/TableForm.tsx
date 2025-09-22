import React, { useEffect } from "react";
import { FormikProvider } from "formik";

import { useGetAllProAndServiceQry } from "../../hooks/queries";
import type { IProductAndService } from "../../allTypes";
import { addCama } from "../../tools";

const TableForm = ({ formik }: { formik: any }) => {
  const { data: proAndServiceList } = useGetAllProAndServiceQry();
  const productsAndServiceData = proAndServiceList?.data;

  // Add row
  const addRow = () => {
    formik.setFieldValue("products", [
      ...formik.values.products,
      {
        product: "",
        description: "",
        count: 1,
        price: 0,
        tax: 0,
        discount: 0,
      },
    ]);
  };

  // Remove row
  const removeRow = (index: number) => {
    const newItems = formik.values.products.filter((_, i) => i !== index);
    formik.setFieldValue("products", newItems);
  };

  const updateProductTotal = (index: number, field: string, value: number) => {
    const product = formik.values.products[index];
    const newProduct = {
      ...product,
      [field]: value,
    };
    // calculate total
    newProduct.all_price = newProduct.count * newProduct.price + Number(newProduct.tax) - Number(newProduct.discount);

    // update the product in formik
    const newProducts = [...formik.values.products];
    newProducts[index] = newProduct;
    formik.setFieldValue("products", newProducts);
  };

  // Update product totals whenever products change
  useEffect(() => {
    const finalTotal = formik.values.products.reduce((acc: number, item: any) => {
      const total = item.count * item.price + Number(item.tax || 0) - Number(item.discount || 0);
      return acc + (isNaN(total) ? 0 : total);
    }, 0);

    formik.setFieldValue("final_price", finalTotal);
  }, [formik.values.products]); // <-- only when products change

  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit}>
        {/* Header row */}
        <section className="overflow-auto relative w-full mx-auto">
          <div className="flex sticky top-0 font-semibold">
            <span className="min-w-100 border-r border-y bg-gray-100 text-center py-2">کالا</span>
            <span className="min-w-120 border-r border-y bg-gray-100 text-center py-2">شرح</span>
            <span className="min-w-30 border-r border-y bg-gray-100 text-center py-2">تعداد</span>
            <span className="min-w-60 border-r border-y bg-gray-100 text-center py-2">قیمت</span>
            <span className="min-w-60 border-r border-y bg-gray-100 text-center py-2">مالیات</span>
            <span className="min-w-60 border-r border-y bg-gray-100 text-center py-2">تخفیف</span>
            <span className="min-w-60 border-r border-l border-y bg-gray-100 text-center py-2">مبلغ کل</span>
          </div>

          {/* Rows */}
          <div>
            {formik.values.products.map((item, index) => {
              const total = item.count * item.price + Number(item.tax) - Number(item.discount);
              // formik.setFieldValue(`products.${index}.total`, isNaN(total) ? 0 : total);

              return (
                <div key={index} className="flex items-center">
                  {/* <input
                    name={`products.${index}.product`}
                    value={item.product}
                    onChange={formik.handleChange}
                    className="border border-t-0 border-l-0 min-w-100 p-2 outline-0"
                    placeholder="نام کالا"
                  /> */}

                  <SelectProServices
                    item={item}
                    formik={formik}
                    name={`products.${index}.product`}
                    data={productsAndServiceData}
                  />

                  <input
                    name={`products.${index}.description`}
                    value={item.description}
                    onChange={formik.handleChange}
                    className="border border-t-0 border-l-0 min-w-120 p-2 outline-0"
                    placeholder="شرح"
                  />

                  <input
                    type="number"
                    className="border border-t-0 border-l-0 min-w-30 p-2 outline-0"
                    value={item.count}
                    onChange={(e) => updateProductTotal(index, "count", Math.max(1, +e.target.value || 1))}
                  />

                  <input
                    type="number"
                    className="border border-t-0 border-l-0 min-w-60 p-2 outline-0"
                    value={item.price}
                    onChange={(e) => updateProductTotal(index, "price", Math.max(0, +e.target.value || 0))}
                  />

                  <input
                    type="number"
                    className="border border-t-0 border-l-0 min-w-60 p-2 outline-0"
                    value={item.tax}
                    onChange={(e) => updateProductTotal(index, "tax", Math.max(0, +e.target.value || 0))}
                  />

                  <input
                    type="number"
                    className="border border-t-0 border-l-0 min-w-60 p-2 outline-0"
                    value={item.discount}
                    onChange={(e) => updateProductTotal(index, "discount", Math.max(0, +e.target.value || 0))}
                  />

                  <span className="border border-t-0 min-w-60 p-2 outline-0">{isNaN(total) ? 0 : total}</span>

                  <button
                    type="button"
                    onClick={() => removeRow(index)}
                    className="border bg-white mr-2 hover:bg-red-200 border-red-600 transition-all text-white sticky left-0 min-w-8 h-8 rounded flex items-center justify-center font-bold"
                  >
                    <img src="/trash-icon.png" alt="حذف" className="size-5" />
                  </button>
                </div>
              );
            })}
          </div>
        </section>
        {/* Add row button */}
        <div className="mt-3 flex justify-between items-start">
          <button type="button" className="bg-green-500 text-white px-3 py-1 rounded" onClick={addRow}>
            افزودن ردیف
          </button>

          <div className="flex flex-col gap-4">
            <div className="border px-5 py-1 rounded-lg border-gray-400 flex items-center justify-between gap-3">
              مجموع قیمت:
              <span className="font-bold">
                {addCama(formik.values.products.reduce((acc, item) => acc + (item.count || 1) * item.price, 0))}
              </span>
            </div>

            <div className="border px-5 py-1 rounded-lg border-gray-400 flex items-center justify-between gap-3">
              تخفیف کل:
              <span className="font-bold">
                {addCama(formik.values.products.reduce((acc, item) => acc + item.discount, 0))}
              </span>
            </div>

            <div className="border px-5 py-1 rounded-lg border-gray-400 flex items-center justify-between gap-3">
              مالیات کل:
              <span className="font-bold">
                {addCama(formik.values.products.reduce((acc, item) => acc + item.tax, 0))}
              </span>
            </div>
            <div className="border px-5 py-1 rounded-lg border-gray-400 flex items-center justify-between gap-3">
              قیمت فاکتور: <span className="font-bold">{addCama(calculateAllTotal(formik.values.products))}</span>
            </div>
          </div>
        </div>

        {/* <div className="mt-6">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            ذخیره فاکتور
          </button>
        </div> */}
      </form>
    </FormikProvider>
  );
};

export default TableForm;

const calculateAllTotal = (items: any[]) => {
  return items.reduce((acc, item) => {
    const itemTotal = item.count * item.price + Number(item.tax || 0) - Number(item.discount || 0);
    if (acc + itemTotal < 0) {
      return 0;
    }
    // formik.setFieldValue("final_price", acc + itemTotal);

    return acc + itemTotal;
  }, 0);
};

const SelectProServices = ({
  data,
  formik,
  name,
  className,
  item,
}: {
  data: IProductAndService[];
  formik: any;
  item: any;
  name: string;
  className?: string;
}) => {
  return (
    <div className={`border border-t-0 border-l-0 min-w-100  outline-0 ${className}`}>
      <select
        value={item.product}
        onChange={formik.handleChange}
        name={name}
        className="select !outline-0 !border border-gray-300 w-full bg-white "
      >
        <option value={""} disabled={true}>
          یک مورد انتخاب کنید
        </option>
        {data?.map((item, idx) => (
          <option className="truncate" value={item._id} key={idx}>
            {item.img ? (
              <img
                className="size-10 rounded object-cover"
                src={`${import.meta.env.VITE_BASE_URL}/${item.img}`}
                alt=""
              />
            ) : (
              <img className="size-10 rounded object-cover" src={`/product-form.png`} alt="" />
            )}
            {item.category === "product" ? "محصول" : "خدمت"}: {item.title}
          </option>
        ))}
      </select>
      {formik.errors[name] && formik.touched[name] && (
        <span className="text-red-500 text-sm mt-2">{formik.errors[name]}</span>
      )}
    </div>
  );
};
