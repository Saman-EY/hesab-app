import { useCreateSeller } from "../../hooks/mutation";

import { useQueryClient } from "@tanstack/react-query";
import SellerForm from "./SellerForm";

function CreateSeller() {
  const { mutate, isPending } = useCreateSeller();

  const queryClient = useQueryClient();

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <SellerForm
        isPending={isPending}
        onSubmit={(body) => {
          mutate(body, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["sellers-list"] });
            },
          });
        }}
      />
    </section>
  );
}

export default CreateSeller;
