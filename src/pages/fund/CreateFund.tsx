import { useQueryClient } from "@tanstack/react-query";
import { useCreateFund } from "../../hooks/mutation";
import FundForm from "./FundForm";

function CreateFund() {
  const { mutate, isPending } = useCreateFund();
  const queryClient = useQueryClient();

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <FundForm
        isPending={isPending}
        onSubmit={(body) => {
          mutate(body, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["funds-list"] });
            },
          });
        }}
      />
    </section>
  );
}

export default CreateFund;
