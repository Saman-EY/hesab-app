import { useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import TxtInput from "../../components/TxtInput";
import CustomDatePicker from "../../components/CustomDatePicker";
import { jalaliToGregorian } from "../../tools";
import { useEffect, useState } from "react";
import { useCreateTransfer } from "../../hooks/mutation";
import { useGetAllBanksQry, useGetAllFundsQry, useGetAllVaultsQry } from "../../hooks/queries";
import type { IBank, IFund, IVault } from "../../allTypes";

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
  const [activeFromKind, setActiveFromKind] = useState("bank");
  const [activeToKind, setActiveToKind] = useState("bank");

  const { mutate, isPending } = useCreateTransfer();

  const { data: { banks: allBanks } = {} } = useGetAllBanksQry();
  const { data: { funds: allFunds } = {} } = useGetAllFundsQry();
  const { data: { vaults: allVaults } = {} } = useGetAllVaultsQry();

  const queryClient = useQueryClient();

  console.log("**", allBanks, allFunds, allVaults);

  useEffect(() => {
    formik.setFieldValue("from_bank", "");
    formik.setFieldValue("from_vault", "");
    formik.setFieldValue("from_fund", "");
  }, [activeFromKind])
  useEffect(() => {
    formik.setFieldValue("to_bank", "");
    formik.setFieldValue("to_vault", "");
    formik.setFieldValue("to_fund", "");
  }, [activeToKind])

  const formik = useFormik({
    initialValues: {
      date: "",
      project: "",
      description: "",
      from_kind: "bank",
      to_kind: "bank",

      from_bank: "",
      to_bank: "",
      from_vault: "",
      to_vault: "",
      from_fund: "",
      to_fund: "",

      price: "", //number only
      fee: "", //number only
      referral: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const body = {
        ...values,
        date: jalaliToGregorian(values.date),
      };
      mutate(body, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["transfers-list"] });
          formik.resetForm(); // clears all fields
        },
      });
    },
  });

  const handleFromKindChange = (type: string) => {
    setActiveFromKind(type);
    formik.setFieldValue("from_kind", type);
  };

  const handleToKindChange = (type: string) => {
    setActiveToKind(type);
    formik.setFieldValue("to_kind", type);
  };

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <section className="w-full max-w-6xl mx-auto grid grid-cols-2 gap-5">
        <TxtInput className="" formik={formik} name="project" label="پروژه" />
        <CustomDatePicker name="date" formik={formik} label="تاریخ" />
        <TxtInput className="!col-span-2" formik={formik} name="description" label="شرح" />
        <section className="border-t border-gray-300 pt-5 col-span-2 grid grid-cols-1 md:grid-cols-2 gap-5">
          <section>
            {/* tabs */}
            <h6 className="text-green-600 font-black text-sm mb-1 mr-1">از</h6>
            <div className="flex mb-4 rounded-lg overflow-hidden border border-gray-300">
              <button
                onClick={() => handleFromKindChange("bank")}
                className={`flex-1 btn btn-sm border-none ${
                  activeFromKind === "bank" ? "text-white bg-green-600" : "text-black"
                }  rounded-none`}
              >
                بانک
              </button>
              <button
                onClick={() => handleFromKindChange("vault")}
                className={`flex-1 btn btn-sm  border-t-0 border-b-0 ${
                  activeFromKind === "vault" ? "text-white bg-green-600" : "text-black"
                }  rounded-none`}
              >
                صندوق
              </button>
              <button
                onClick={() => handleFromKindChange("fund")}
                className={`flex-1 btn btn-sm border-none ${
                  activeFromKind === "fund" ? "text-white bg-green-600" : "text-black"
                } rounded-none`}
              >
                تنخواه گردان
              </button>
            </div>
            {activeFromKind === "bank" && <SelectArray data={allBanks} formik={formik} name="from_bank" label="بانک" />}
            {activeFromKind === "vault" && (
              <SelectArray data={allVaults} formik={formik} name="from_vault" label="صندوق" />
            )}
            {activeFromKind === "fund" && (
              <SelectArray data={allFunds} formik={formik} name="from_fund" label="تنخواه گردان" />
            )}
          </section>

          <section className="">
            {/* tabs */}
            <h6 className="text-green-600 font-black text-sm mb-1 mr-1">به</h6>
            <div className="flex mb-4 rounded-lg overflow-hidden border border-gray-300">
              <button
                onClick={() => handleToKindChange("bank")}
                className={`flex-1 btn btn-sm border-none ${
                  activeToKind === "bank" ? "text-white bg-green-600" : "text-black"
                }  rounded-none`}
              >
                بانک
              </button>
              <button
                onClick={() => handleToKindChange("vault")}
                className={`flex-1 btn btn-sm  border-t-0 border-b-0 ${
                  activeToKind === "vault" ? "text-white bg-green-600" : "text-black"
                }  rounded-none`}
              >
                صندوق
              </button>
              <button
                onClick={() => handleToKindChange("fund")}
                className={`flex-1 btn btn-sm border-none ${
                  activeToKind === "fund" ? "text-white bg-green-600" : "text-black"
                } rounded-none`}
              >
                تنخواه گردان
              </button>
            </div>

            {activeToKind === "bank" && <SelectArray data={allBanks} formik={formik} name="to_bank" label="بانک" />}
            {activeToKind === "vault" && <SelectArray data={allVaults} formik={formik} name="to_vault" label="صندوق" />}
            {activeToKind === "fund" && (
              <SelectArray data={allFunds} formik={formik} name="to_fund" label="تنخواه گردان" />
            )}
          </section>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5  w-full col-span-2">
          <TxtInput numberFormat formik={formik} name="price" placeholder="تومان" label="مبلغ" />
          <TxtInput numberFormat formik={formik} name="fee" placeholder="تومان" label="کارمزد خدمات بانکی" />
          <TxtInput className="!col-span-2" formik={formik} name="referral" label="ارجاع" />
          <button
            disabled={isPending}
            onClick={() => formik.handleSubmit()}
            className="btn md:col-span-2 bg-sky-600 text-white w-full max-w-80 md:max-w-none mx-auto"
          >
            ثبت
          </button>
        </div>
      </section>
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
