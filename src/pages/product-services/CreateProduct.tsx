import { useFormik } from "formik";
import * as Yup from "yup";
import TxtInput from "../../components/TxtInput";
import { useRef } from "react";
import { useCreateProduct } from "../../hooks/mutation";
import ProductForm from "./ProductForm";
import { useQueryClient } from "@tanstack/react-query";

function CreateProduct() {
  const { mutate, isPending } = useCreateProduct();
  const queryClient = useQueryClient();

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
      <ProductForm
        isPending={isPending}
        onSubmit={(body) => {
          mutate(body, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["product-service-list"] });
            },
          });
        }}
      />
    </section>
  );
}

export default CreateProduct;
