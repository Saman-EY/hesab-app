import { useQueryClient } from "@tanstack/react-query";
import { useCreateTransfer } from "../../hooks/mutation";
import type { IBank, IFund, IVault } from "../../allTypes";
import TransferForm from "./TransferForm";

function CreateTransfer() {
  const { mutate, isPending } = useCreateTransfer();
  const queryClient = useQueryClient();

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <TransferForm
        onSubmit={(body) =>
          mutate(body, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["transfers-list"] });
            },
          })
        }
        isPending={isPending}
      />
    </section>
  );
}

export default CreateTransfer;

export const SelectArray = ({
  formik,
  name,
  data,
  className,
  label,
}: {
  formik: any;
  name: string;
  label: string;
  data: any;
  className?: string;
}) => {
  return (
    <div className={`w-full mx-auto flex flex-col col-span-2 md:col-span-1 ${className}`}>
      <span className="text-sm mb-2 text-gray-700">{label}</span>
      <select
        value={formik.values[name]}
        onChange={formik.handleChange}
        name={name}
        className="select !outline-0 !border border-gray-300 w-full bg-gray-100 "
      >
        <option value={""} disabled={true}>
          یک مورد انتخاب کنید
        </option>
        {data?.map((item: IFund | IVault | IBank, idx: number) => (
          <option className="truncate" value={item._id} key={idx}>
            کد: {item?.account_code || "-"} - نام: {item?.title || "-"} - شعبه: {item?.branch || "-"}
          </option>
        ))}
        {data?.length === 0 && (
          <option className="text-xs" disabled>
            از منوی داشبورد اقدام به ثبت ایتم جدید کنید
          </option>
        )}
      </select>
      {formik.errors[name] && formik.touched[name] && (
        <span className="text-red-500 text-sm mt-2">{formik.errors[name]}</span>
      )}
    </div>
  );
};
