import { useCreateReceive } from "../../hooks/mutation";

import { useQueryClient } from "@tanstack/react-query";
import ReceiveForm from "./ReceiveForm";

function CreateReceive() {
  const { mutate, isPending } = useCreateReceive();

  const queryClient = useQueryClient();

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <ReceiveForm
        isPending={isPending}
        onSubmit={(body) => {
          mutate(body, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["receives-list"] });
            },
          });
        }}
      />
    </section>
  );
}

export default CreateReceive;
