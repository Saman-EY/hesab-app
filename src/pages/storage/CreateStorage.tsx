import { useQueryClient } from "@tanstack/react-query";
import { useCreateStorage } from "../../hooks/mutation";
import StorageForm from "./StorageForm";

function CreateStorage() {
  const { mutate, isPending } = useCreateStorage();

  const queryClient = useQueryClient();

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <StorageForm
        isPending={isPending}
        onSubmit={(body) => {
          mutate(body, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["storages-list"] });
            },
          });
        }}
      />
    </section>
  );
}

export default CreateStorage;
