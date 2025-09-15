import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import TxtInput from "../../components/TxtInput";
import CustomDatePicker from "../../components/CustomDatePicker";
import { jalaliToGregorian, removeEmptyStrings } from "../../tools";
import { useEffect, useState } from "react";
import { useCreateTransfer } from "../../hooks/mutation";
import { useGetAllBanksQry, useGetAllFundsQry, useGetAllVaultsQry } from "../../hooks/queries";
import type { IBank, IFund, IVault } from "../../allTypes";
import TransferForm from "./TransferForm";

const validationSchema = Yup.object({
  date: Yup.string().required("الزامی است"),
  project: Yup.string().required("الزامی است"),
  description: Yup.string().required("الزامی است"),

  from_kind: Yup.string(),
  to_kind: Yup.string(),

  from_bank: Yup.string(),
  from_vault: Yup.string(),
  from_fund: Yup.string(),
  to_bank: Yup.string(),
  to_vault: Yup.string(),
  to_fund: Yup.string(),

  price: Yup.number().required("الزامی است"),
  fee: Yup.number().required("الزامی است"),
  referral: Yup.string().required("الزامی است"),
});

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
