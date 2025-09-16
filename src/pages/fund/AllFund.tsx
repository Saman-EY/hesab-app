import { useState } from "react";
import type { IFund } from "../../allTypes";
import LoadingList from "../../components/LoadingList";
import { useGetAllFundsQry } from "../../hooks/queries";
import { useDeleteFund, useUpdateFund } from "../../hooks/mutation";
import { useQueryClient } from "@tanstack/react-query";
import CustomDeleteModal from "../../components/CustomDeleteModal";
import FundForm from "./FundForm";
import CustomModal from "../../components/CustomModal";

function AllFund() {
  const { data, isPending } = useGetAllFundsQry();

  const finalData: IFund[] = data?.funds;

  if (isPending) {
    return <LoadingList />;
  }

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <div className="overflow-x-auto min-w-[800px] border rounded-lg border-gray-300 p-4">
        <table className="table table-xs ">
          <thead>
            <tr>
              <th className="px-8 truncate"></th>
              <th className="px-8 truncate">کد</th>
              <th className="px-8 truncate">اسم</th>
              <th className="px-8 truncate">توضیحات</th>
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

export default AllFund;

const Row = ({ item, idx }: { item: IFund; idx: number }) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { mutate } = useUpdateFund();
  const { mutate: deleteFund } = useDeleteFund();
  const queryClient = useQueryClient();

  return (
    <>
      <tr className="odd:bg-gray-100" key={idx}>
        <th>{idx + 1}</th>
        <td className="px-8 truncate">{item?.account_code || "-"}</td>
        <td className="px-8 truncate">{item?.title || "-"}</td>
        <td className="px-8 truncate">{item?.description || "-"}</td>
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
        <FundForm
          initialData={item}
          onSubmit={(body) =>
            mutate(
              { id: item._id, body },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["funds-list"] });
                  setEditModal(false);
                },
              }
            )
          }
        />
      </CustomModal>
      <CustomDeleteModal
        onSubmit={() =>
          deleteFund(item._id, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["funds-list"] });
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
