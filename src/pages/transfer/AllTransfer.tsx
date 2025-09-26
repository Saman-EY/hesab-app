import React, { useState, type SetStateAction } from "react";
import LoadingList from "../../components/LoadingList";
import { useGetAllTransfersQry } from "../../hooks/queries";
import type { ITransaction } from "../../allTypes";
import { convertToJalali } from "../../tools";
import CustomModal from "../../components/CustomModal";
import CustomDeleteModal from "../../components/CustomDeleteModal";
import TransferForm from "./TransferForm";
import { useQueryClient } from "@tanstack/react-query";
import { useCreateTransfer, useDeleteTransfer, useUpdateTransfer } from "../../hooks/mutation";

function AllTransfer() {
    const { data, isPending } = useGetAllTransfersQry();

    const finalData: ITransaction[] = data?.transfers;

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
                            <th>پروژه</th>
                            <th>تاریخ</th>
                            <th>کارمزد</th>
                            <th>از بانک/تنخواه گردان/صندوق</th>
                            <th>به بانک/تنخواه گردان/صندوق</th>
                            <th>شرح</th>
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
    );
}

export default AllTransfer;

const Row = ({ item, idx }: { item: ITransaction; idx: number }) => {
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const { mutate } = useDeleteTransfer();
    const queryClient = useQueryClient();

    return (
        <>
            <tr className="odd:bg-gray-100" key={idx}>
                <th>{idx + 1}</th>
                <td>{item?.number || "-"}</td>
                <td>{item?.project?.title || "-"}</td>
                <td>{item.date ? convertToJalali(item.date) : "-"}</td>

                <td>{item?.fee || "-"}</td>

                <td>
                    {item?.from_bank?.title + "-" + item?.from_bank?.account_code ||
                        item?.from_fund?.title + "-" + item?.from_fund?.account_code ||
                        item?.from_vault?.title + "-" + item?.from_vault?.account_code ||
                        "-"}
                </td>
                <td>
                    {item?.to_bank?.title + "-" + item?.to_bank?.account_code ||
                        item?.to_fund?.title + "-" + item?.to_fund?.account_code ||
                        item?.to_vault?.title + "-" + item?.to_vault?.account_code ||
                        "-"}
                </td>

                <td>{item?.description || "-"}</td>
                <td className="flex flex-wrap gap-2 justify-center md:justify-start">
                    <button
                        onClick={() => setEditModal(true)}
                        className="size-8 flex items-center justify-center rounded bg-blue-100 hover:bg-blue-200"
                    >d
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
                <EditForm setModal={setEditModal} item={item} />
            </CustomModal>
            <CustomDeleteModal
                onSubmit={() =>
                    mutate(item._id, {
                        onSuccess: () => {
                            queryClient.invalidateQueries({ queryKey: ["transfers-list"] });
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

const EditForm = ({ item, setModal }: { item: ITransaction; setModal: React.Dispatch<SetStateAction<boolean>> }) => {
    const { mutate, isPending } = useUpdateTransfer();
    const queryClient = useQueryClient();
    return (
        <TransferForm
            initialData={item}
            onSubmit={(body) =>
                mutate(
                    { id: item._id, body },
                    {
                        onSuccess: () => {
                            queryClient.invalidateQueries({ queryKey: ["transfers-list"] });
                            setModal(false);
                        },
                    }
                )
            }
            isPending={isPending}
        />
    );
};
