import { useCreateProduct } from "../../hooks/mutation";
import ProductForm from "./ProductForm";
import { useQueryClient } from "@tanstack/react-query";

function CreateProduct() {
  const { mutate, isPending } = useCreateProduct();
  const queryClient = useQueryClient();

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
