import { useQueryClient } from "@tanstack/react-query";
import type { IUser } from "../../allTypes";
import LoadingList from "../../components/LoadingList";
import { useGetUsersQry } from "../../hooks/queries";
import { useState } from "react";
import { convertToJalali } from "../../tools";
import CustomDeleteModal from "../../components/CustomDeleteModal";
import { useDeleteUser, useUpdateUser } from "../../hooks/mutation";

function AllUsers() {
  const { data, isPending } = useGetUsersQry();

  const finalData: IUser[] = data?.users;

  if (isPending) {
    return <LoadingList />;
  }

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
        <div className="overflow-x-auto min-w-[800px] border rounded-lg border-gray-300 p-4">
          <table className="table table-xs ">
            <thead>
              <tr>
                <th></th>
                <th>نام کاربری</th>
                <th>تاریخ ساخت اکانت</th>
                <th>نقش</th>
                <th>وضعیت</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {finalData?.map((item, idx) => (
                <Row key={idx} idx={idx} item={item} />
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}

export default AllUsers;

const Row = ({ item, idx }: { item: IUser; idx: number }) => {
  const { mutate } = useUpdateUser();
  const { mutate: deleteUser } = useDeleteUser();
  const queryClient = useQueryClient();
  // const [currentStatus, setCurrentStatus] = useState(item?.status);
  const [deleteModal, setDeleteModal] = useState(false);

  return (
    <>
      <tr className="odd:bg-gray-100" key={idx}>
        <th>{idx + 1}</th>
        <td>{item?.username}</td>
        <td>{item?.createdAt ? convertToJalali(item?.createdAt) : "-"}</td>
        <td>{item?.role ? transaletRole(item?.role) : "-"}</td>
        <td className={item?.isOk ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
          {item?.isOk ? "تایید شده" : "تایید نشده"}
        </td>

        <td className="flex flex-wrap gap-2 justify-center md:justify-end">
          {!item?.isOk && (
            <button
              onClick={() => {
                const body = {
                  isOk: true,
                };

                mutate(
                  { id: item._id, body },
                  {
                    onSuccess: () => {
                      queryClient.invalidateQueries({ queryKey: ["users-list"] });
                    },
                  }
                );
              }}
              className="px-3 flex items-center justify-center rounded bg-blue-100 hover:bg-blue-200"
            >
              تایید کاربر
            </button>
          )}

          <button
            onClick={() => {
              deleteUser(item._id, {
                onSuccess: () => {
                  queryClient.invalidateQueries({ queryKey: ["users-list"] });
                  setDeleteModal(false);
                },
              });
            }}
            className="size-8 flex items-center justify-center rounded bg-red-100 hover:bg-red-200"
          >
            <img src="/trash-icon.png" alt="حذف" className="size-5" />
          </button>
        </td>
      </tr>

      <CustomDeleteModal
        onSubmit={() =>
          deleteUser(item._id, {
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

const transaletRole = (role: string) => {
  switch (role) {
    case "admin":
      return "مدیر";
    case "accountant":
      return "حسابدار";
    case "Seller":
      return "فروشنده";
    case "user":
      return "کاربر";
    default:
      return "کاربر";
  }
};
