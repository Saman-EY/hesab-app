import { useMemo, useState } from "react";
import CustomModal from "../../components/CustomModal";
import LoadingList from "../../components/LoadingList";
import { useGetDraftsQry } from "../../hooks/queries";
import { useDeleteDraft, useUpdateDraft } from "../../hooks/mutation";
import { useQueryClient } from "@tanstack/react-query";
import CustomDeleteModal from "../../components/CustomDeleteModal";
import type { IDraft } from "../../allTypes";
import { convertToJalali, translateStatus } from "../../tools";

function AllWarehouseReceipt() {
    const { data, isPending } = useGetDraftsQry();

    // local states
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 12; // how many per page

    const finalData: IDraft[] = data?.drafts;

    // derived: filter by search
    const filtered = useMemo(() => {
        if (!searchValue) return finalData;
        return finalData?.filter((c) =>
            [c.factore.title, c.storage.title].join(" ").toLowerCase().includes(searchValue.toLowerCase())
        );
    }, [finalData, searchValue]);

    // derived: paginate
    const totalPages = Math.ceil(filtered?.length / pageSize);
    const paginated = useMemo(() => {
        const start = (page - 1) * pageSize;
        return filtered?.slice(start, start + pageSize);
    }, [filtered, page, pageSize]);

    if (isPending) {
        return <LoadingList />;
    }

    return (
        <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
            <div>
                <input
                    value={searchValue}
                    onChange={(e) => {
                        setSearchValue(e.target.value);
                        setPage(1); // reset to first page when searching
                    }}
                    type="text"
                    placeholder="جستجو..."
                    className="border outline-0 text-sm border-gray-300 shadow mb-3 rounded px-2 py-1"
                />
            </div>
            <div className="overflow-x-auto min-w-[800px] border rounded-lg border-gray-300 p-4">
                <table className="table table-xs ">
                    <thead>
                        <tr>
                            <th></th>
                            <th>نوع حواله</th>
                            <th>انبار</th>
                            <th>کد فاکتور</th>
                            <th>تاریخ فاکتور</th>
                            <th>تاریخ سررسید فاکتور</th>
                            <th>وضعیت</th>

                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginated?.map((item, idx) => (
                            <Row idx={idx} item={item} key={idx} />
                        ))}
                    </tbody>
                </table>
            </div>
            {/* paginate */}
            <section className="flex items-center justify-center mt-5 gap-2 text-xs">
                <button
                    className="btn text-xs !py-2 h-fit text-white bg-blue-600 hover:bg-blue-400 "
                    disabled={page === 1}
                    onClick={() => setPage((p) => p - 1)}
                >
                    قبلی
                </button>
                <span className="text-sm">
                    {page} از {totalPages}
                </span>
                <button
                    className="btn text-white bg-blue-600 hover:bg-blue-400 px-3 text-xs !py-2 h-fit "
                    disabled={page >= totalPages}
                    // disabled={page === totalPages}
                    onClick={() => setPage((p) => p + 1)}
                >
                    بعدی
                </button>
            </section>
        </section>
    );
}

export default AllWarehouseReceipt;

const Row = ({ item, idx }: { item: IDraft; idx: number }) => {
    const [detailModal, setDetailModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const { mutate } = useUpdateDraft();
    const { mutate: deleteDraft } = useDeleteDraft();
    const queryClient = useQueryClient();
    const [currentStatus, setCurrentStatus] = useState(item?.status);

    const handleFactorStatus = () => {
        const body = {
            status: currentStatus,
        };

        mutate(
            { id: item?._id, body },
            {
                onSuccess: () => {
                    queryClient.invalidateQueries({ queryKey: ["draft-list"] });
                },
            }
        );
    };

    return (
        <>
            <tr className="odd:bg-gray-100" key={idx}>
                <th>{idx + 1}</th>
                <td>{item?.factore_type}</td>
                <td>{item?.storage.title}</td>
                <td>{item?.factore?.code}</td>
                <td>{item?.factore?.date ? convertToJalali(item?.factore.date) : "-"}</td>
                <td>{item?.factore?.receipt_date ? convertToJalali(item?.factore.receipt_date) : "-"}</td>
                <td
                    className={
                        item?.status === "pending"
                            ? "text-yellow-600"
                            : item?.status === "accepted"
                            ? "text-green-600"
                            : item?.status === "rejected"
                            ? "text-red-600"
                            : ""
                    }
                >
                    {translateStatus(item?.status ?? "")}
                </td>

                <td className="flex items-center gap-2 md:justify-end">
                    <button
                        onClick={() => setDetailModal(true)}
                        className="btn text-xs bg-blue-400 text-white px-2 h-fit py-1"
                    >
                        جزییات بیشتر
                    </button>

                    <button
                        onClick={() => setDeleteModal(true)}
                        className="size-8 flex items-center justify-center rounded bg-red-100 hover:bg-red-200"
                    >
                        <img src="/trash-icon.png" alt="حذف" className="size-5" />
                    </button>
                </td>
            </tr>

            {/* details modal */}
            <CustomModal containerClass="!max-w-6xl" title="جزییات" modal={detailModal} setModal={setDetailModal}>
                <div className="w-full flex items-end gap-4">
                    <label className="flex flex-col gap-3 w-full max-w-sm">
                        <span>تعیین وضعیت :</span>

                        <select
                            value={currentStatus}
                            onChange={(e) => {
                                setCurrentStatus(e.target.value);
                            }}
                            className="select !outline-0 !border border-gray-300 w-full bg-gray-100"
                        >
                            <option value="pending">در انتظار</option>
                            <option value="accepted">تایید شده</option>
                            <option value="rejected">رد شده</option>
                        </select>
                    </label>
                    <button onClick={handleFactorStatus} className="btn mt-2 bg-blue-600 text-white">
                        ثبت
                    </button>
                </div>
            </CustomModal>
            <CustomDeleteModal
                onSubmit={() =>
                    deleteDraft(item._id, {
                        onSuccess: () => {
                            queryClient.invalidateQueries({ queryKey: ["draft-list"] });
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
