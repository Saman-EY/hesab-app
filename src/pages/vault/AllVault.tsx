import { useState } from "react";
import type { IVault } from "../../allTypes";
import LoadingList from "../../components/LoadingList";
import { useGetAllVaultsQry } from "../../hooks/queries";
import { useDeleteVault, useUpdateVault } from "../../hooks/mutation";
import { useQueryClient } from "@tanstack/react-query";
import CustomModal from "../../components/CustomModal";
import VaultForm from "./VaultForm";
import CustomDeleteModal from "../../components/CustomDeleteModal";

function AllVault() {
  const { data, isPending } = useGetAllVaultsQry();

  const finalData: IVault[] = data?.vaults;

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
              <th className="px-8 truncate">اسم صندوق</th>
              <th className="px-8 truncate">توضیحات</th>
              {/* <th className="px-8 truncate">شماره سوییچ پرداخت</th> */}
              {/* <th className="px-8 truncate">شماره ترمینال پرداخت</th> */}
              {/* <th className="px-8 truncate">شماره پذیرنده فروشگاهی</th> */}
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

export default AllVault;

const Row = ({ item, idx }: { item: IVault; idx: number }) => {
  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const { mutate } = useUpdateVault();
  const { mutate: deleteVault } = useDeleteVault();
  const queryClient = useQueryClient();

  return (
    <>
      <tr className="odd:bg-gray-100" key={idx}>
        <th>{idx + 1}</th>
        <td className="px-8 truncate">{item?.account_code || "-"}</td>
        <td className="px-8 truncate">{item?.title || "-"}</td>
        <td className="px-8 truncate">{item?.description || "-"}</td>

        {/* <td className="px-8 truncate">{item?.switch_number_payment || "-"}</td> */}
        {/* <td className="px-8 truncate">{item?.terrminal_number_payment || "-"}</td> */}
        {/* <td className="px-8 truncate">{item?.shop_number || "-"}</td> */}
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
        <VaultForm
          initialData={item}
          onSubmit={(body) =>
            mutate(
              { id: item._id, body },
              {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["vault-list"] });
                  setEditModal(false);
                },
              }
            )
          }
        />
      </CustomModal>
      <CustomDeleteModal
        onSubmit={() =>
          deleteVault(item._id, {
            onSuccess: () => {
              queryClient.invalidateQueries({ queryKey: ["vault-list"] });
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
