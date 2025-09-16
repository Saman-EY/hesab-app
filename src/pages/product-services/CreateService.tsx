import { useCreateService } from "../../hooks/mutation";
import ServiceForm from "./ServiceForm";
import { useQueryClient } from "@tanstack/react-query";

function CreateService() {
  const { mutate, isPending } = useCreateService();

  const queryClient = useQueryClient();

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <ServiceForm
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

export default CreateService;
