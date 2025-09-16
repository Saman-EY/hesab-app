import { useQueryClient } from "@tanstack/react-query";
import { useCreateVault } from "../../hooks/mutation";
import VaultForm from "./VaultForm";

function CreateVault() {
  const { mutate, isPending } = useCreateVault();
  const queryClient = useQueryClient();

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <VaultForm
        isPending={isPending}
        onSubmit={(body) => {
          mutate(body, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["vault-list"] });
            },
          });
        }}
      />
    </section>
  );
}

export default CreateVault;
