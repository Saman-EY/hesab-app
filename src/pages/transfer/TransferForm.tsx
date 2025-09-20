import { useFormik } from "formik";
import type { ITransaction } from "../../allTypes";
import { convertToJalali, jalaliToGregorian, removeEmptyStrings } from "../../tools";
import { useGetAllBanksQry, useGetAllFundsQry, useGetAllProjectsQry, useGetAllVaultsQry } from "../../hooks/queries";
import { useState } from "react";
import * as Yup from "yup";
import TxtInput from "../../components/TxtInput";
import CustomDatePicker from "../../components/CustomDatePicker";
import { SelectArray } from "./CreateTransfer";
import SelectInput from "../../components/SelectInput";

interface TransferFormProps {
  initialData?: ITransaction; // your type from earlier
  onSubmit: (values: any) => void; // callback for create or update
  isPending?: boolean;
}

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

const TransferForm = ({ initialData, onSubmit, isPending }: TransferFormProps) => {
  const [activeFromKind, setActiveFromKind] = useState(initialData?.from_kind || "bank");
  const [activeToKind, setActiveToKind] = useState(initialData?.to_kind || "bank");
  const { data: projectsList } = useGetAllProjectsQry();

  const { data: { banks: allBanks } = {} } = useGetAllBanksQry();
  const { data: { funds: allFunds } = {} } = useGetAllFundsQry();
  const { data: { vaults: allVaults } = {} } = useGetAllVaultsQry();

  const formik = useFormik({
    initialValues: {
      date: initialData ? convertToJalali(initialData.date) : "",
      project: initialData?.project || "",
      description: initialData?.description || "",
      from_kind: initialData?.from_kind || "bank",
      to_kind: initialData?.to_kind || "bank",

      // from_bank: initialData?.from_bank || "",
      from_bank: "",
      // to_bank: initialData?.to_bank || "",
      to_bank: "",
      // from_vault: initialData?.from_vault || "",
      from_vault: "",
      // to_vault: initialData?.to_vault || "",
      to_vault: "",
      // from_fund: initialData?.from_fund || "",
      from_fund: "",
      // to_fund: initialData?.to_fund || "",
      to_fund: "",
      price: initialData?.price || "",
      fee: initialData?.fee || "",
      referral: initialData?.referral || "",
    },
    validationSchema,
    enableReinitialize: true, // 👈 important for editing
    onSubmit: (values, { resetForm }) => {
      const body = removeEmptyStrings({
        ...values,
        date: jalaliToGregorian(values.date),
      });
      onSubmit(body);
      resetForm();
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
    <section className="w-full max-w-6xl mx-auto grid grid-cols-2 gap-5">
      <SelectInput withId options={projectsList} formik={formik} name="project" label="پروژه" />

      {/* <TxtInput className="" formik={formik} name="project" label="پروژه" /> */}
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
  );
};

export default TransferForm;
