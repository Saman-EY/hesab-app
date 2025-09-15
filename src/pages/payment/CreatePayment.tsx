import { useQueryClient } from "@tanstack/react-query";
import { useCreatePayment } from "../../hooks/mutation";

import PaymentForm from "./PaymentForm";

function CreatePayment() {
  const { mutate, isPending } = useCreatePayment();

  const queryClient = useQueryClient();

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <PaymentForm
        isPending={isPending}
        onSubmit={(body) => {
          mutate(body, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["payments-list"] });
            },
          });
        }}
      />
    </section>
  );
}

export default CreatePayment;
