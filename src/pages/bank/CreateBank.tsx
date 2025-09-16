import { useQueryClient } from "@tanstack/react-query";
import { useCreateBank } from "../../hooks/mutation";
import BankForm from "./BankForm";

function CreateBank() {
  const { mutate, isPending } = useCreateBank();
  const queryClient = useQueryClient();

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <BankForm
        isPending={isPending}
        onSubmit={(body) => {
          mutate(body, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["banks-list"] });
            },
          });
        }}
      />
    </section>
  );
}

export default CreateBank;
