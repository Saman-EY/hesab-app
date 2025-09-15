import { useState } from "react";
import type { IReceive } from "../../allTypes";
import LoadingList from "../../components/LoadingList";
import { useGetAllReceivesQry } from "../../hooks/queries";
import { convertToJalali } from "../../tools";
import { useDeleteReceive, useUpdateReceive } from "../../hooks/mutation";
import { useQueryClient } from "@tanstack/react-query";
import CustomModal from "../../components/CustomModal";
import CustomDeleteModal from "../../components/CustomDeleteModal";
import ReceiveForm from "./ReceiveForm";

function AllReceives() {
  const { data, isPending } = useGetAllReceivesQry();

  const finalData: IReceive[] = data?.receipts;

  if (isPending) {
    return <LoadingList />;
  }

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <div className="overflow-x-auto min-w-[800px] border rounded-lg border-gray-300 p-4">
        <table className="table table-xs ">
          <thead>
            <tr>
              <th></th>
              <th>شماره</th>
              <th>تاریخ</th>
              <th>پروژه</th>
              <th>نوع دریافت</th>
              <th>قیمت</th>
              <th>کارمزد بانک</th>
              <th>ارجاع</th>
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

export default AllReceives;

const Row = ({ item, idx }: { item: IReceive; idx: number }) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { mutate } = useUpdateReceive();
  const { mutate: deleteReceive } = useDeleteReceive();
  const queryClient = useQueryClient();

  return (
    <>
      <tr className="odd:bg-gray-100" key={idx}>
        <th>{idx + 1}</th>
        <td>{item?.code}</td>
        <td>{item.date ? convertToJalali(item.date) : ""}</td>
        <td>{item?.project}</td>
        <td>{item?.receipt_kind}</td>
        <td>{item?.price}</td>
        <td>{item?.fee}</td>
        <td>{item?.reference}</td>
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
        <ReceiveForm
          initialData={item}
          onSubmit={(body) =>
            mutate(
              { id: item._id, body },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["receives-list"] });
                  setEditModal(false);
                },
              }
            )
          }
        />
      </CustomModal>
      <CustomDeleteModal
        onSubmit={() =>
          deleteReceive(item._id, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["receives-list"] });
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
