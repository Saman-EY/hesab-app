import { useCreateCustomer } from "../../hooks/mutation";
import { useQueryClient } from "@tanstack/react-query";
import CustomerForm from "./CustomerForm";

function CreateUserPage() {
  const { mutate, isPending } = useCreateCustomer();

  const queryClient = useQueryClient();

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <CustomerForm
        isPending={isPending}
        onSubmit={(body) => {
          mutate(body, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["customers-list"] });
            },
          });
        }}
      />
    </section>
  );
}

export default CreateUserPage;
