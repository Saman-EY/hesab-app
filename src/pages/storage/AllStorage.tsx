import { useState } from "react";
import type { IStorage } from "../../allTypes";
import LoadingList from "../../components/LoadingList";
import { useGetAllStorageQry } from "../../hooks/queries";
import { useDeleteStorage, useUpdateStorage } from "../../hooks/mutation";
import { useQueryClient } from "@tanstack/react-query";
import CustomModal from "../../components/CustomModal";
import StorageForm from "./StorageForm";
import CustomDeleteModal from "../../components/CustomDeleteModal";

function AllStorage() {
  const { data, isPending } = useGetAllStorageQry();

  const finalData: IStorage[] = data?.storage;

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
              <th className="px-8 truncate">اسم</th>
              <th className="px-8 truncate">انباردار</th>
              <th className="px-8 truncate">شماره تلفن</th>
              <th className="px-8 truncate">آدرس</th>
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

export default AllStorage;

const Row = ({ item, idx }: { item: IStorage; idx: number }) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { mutate } = useUpdateStorage();
  const { mutate: deleteStorage } = useDeleteStorage();
  const queryClient = useQueryClient();

  return (
    <>
      <tr className="odd:bg-gray-100" key={idx}>
        <th>{idx + 1}</th>
        <td className="px-8 truncate">{item?.code || "-"}</td>
        <td className="px-8 truncate">{item?.title || "-"}</td>
        <td className="px-8 truncate">{item?.storage_keeper || "-"}</td>
        <td className="px-8 truncate">{item?.phone || "-"}</td>
        <td className="px-8 truncate">{item?.address || "-"}</td>
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
        <StorageForm
          initialData={item}
          onSubmit={(body) =>
            mutate(
              { id: item._id, body },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["storages-list"] });
                  setEditModal(false);
                },
              }
            )
          }
        />
      </CustomModal>
      <CustomDeleteModal
        onSubmit={() =>
          deleteStorage(item._id, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["storages-list"] });
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
