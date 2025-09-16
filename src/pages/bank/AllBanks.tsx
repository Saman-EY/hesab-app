import { useState } from "react";
import type { IBank } from "../../allTypes";
import LoadingList from "../../components/LoadingList";
import { useGetAllBanksQry } from "../../hooks/queries";
import { useDeleteBank, useUpdateBank } from "../../hooks/mutation";
import { useQueryClient } from "@tanstack/react-query";
import CustomModal from "../../components/CustomModal";
import BankForm from "./BankForm";
import CustomDeleteModal from "../../components/CustomDeleteModal";

function AllBanks() {
  const { data, isPending } = useGetAllBanksQry();

  const finalData: IBank[] = data?.banks;

  if (isPending) {
    return <LoadingList />;
  }

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full  border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <div className="overflow-x-auto min-w-[800px] border rounded-lg border-gray-300 p-4">
        <table className="table table-xs ">
          <thead>
            <tr>
              <th className="px-8 truncate"></th>
              <th className="px-8 truncate">کد</th>
              <th className="px-8 truncate">اسم بانک</th>
              <th className="px-8 truncate">شعبه</th>
              <th className="px-8 truncate">شماره حساب</th>
              <th className="px-8 truncate">شماره کارت</th>
              <th className="px-8 truncate">نام صاحب حساب</th>
              <th className="px-8 truncate">شماره POS</th>

              <th className="px-8 truncate">شماره سوییچ پرداخت</th>
              <th className="px-8 truncate">شماره ترمینال پرداخت</th>
              <th className="px-8 truncate">شماره پذیرنده فروشگاهی</th>
            </tr>
          </thead>
          <tbody>
            {finalData?.map((item, idx) => (
              <Row idx={idx} item={item} key={idx} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AllBanks;

const Row = ({ item, idx }: { item: IBank; idx: number }) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { mutate } = useUpdateBank();
  const { mutate: deleteBank } = useDeleteBank();
  const queryClient = useQueryClient();

  return (
    <>
      <tr className="odd:bg-gray-100" key={idx}>
        <th>{idx + 1}</th>
        <td className="px-8 truncate">{item?.account_code || "-"}</td>
        <td className="px-8 truncate">{item?.title || "-"}</td>
        <td className="px-8 truncate">{item?.branch || "-"}</td>
        <td className="px-8 truncate">{item?.account_number || "-"}</td>
        <td className="px-8 truncate">{item?.cart_number || "-"}</td>
        <td className="px-8 truncate">{item?.account_user_name || "-"}</td>
        <td className="px-8 truncate">{item?.pos_number || "-"}</td>

        <td className="px-8 truncate">{item?.switch_number_payment || "-"}</td>
        <td className="px-8 truncate">{item?.terrminal_number_payment || "-"}</td>
        <td className="px-8 truncate">{item?.shop_number || "-"}</td>
        <td className="flex flex-wrap gap-2 justify-center md:justify-start">
          <button
            onClick={() => setEditModal(true)}
            className="size-8 flex items-center justify-center rounded bg-blue-100 hover:bg-blue-200"
          >
            <img src="/edit-icon.png" alt="ویرایش" className="size-5" />
          </button>

          <button
            onClick={() => setDeleteModal(true)}
            className="size-8 flex items-center justify-center rounded bg-red-100 hover:bg-red-200"
          >
            <img src="/trash-icon.png" alt="حذف" className="size-5" />
          </button>
        </td>
      </tr>

      <CustomModal containerClass="!max-w-6xl" title="ویرایش" modal={editModal} setModal={setEditModal}>
        <BankForm
          initialData={item}
          onSubmit={(body) =>
            mutate(
              { id: item._id, body },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["banks-list"] });
                  setEditModal(false);
                },
              }
            )
          }
        />
      </CustomModal>
      <CustomDeleteModal
        onSubmit={() =>
          deleteBank(item._id, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["banks-list"] });
              setDeleteModal(false);
            },
          })
        }
        modal={deleteModal}
        setModal={setDeleteModal}
      />
    </>
  );
};
