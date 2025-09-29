import { useMemo, useState } from "react";
import type { ISeller } from "../../allTypes";
import CustomDeleteModal from "../../components/CustomDeleteModal";
import CustomModal from "../../components/CustomModal";
import LoadingList from "../../components/LoadingList";
import { useDeleteSeller, useUpdateSeller } from "../../hooks/mutation";
import { useGetAllSellersQry } from "../../hooks/queries";
import SellerForm from "./SellerForm";
import { useQueryClient } from "@tanstack/react-query";

function AllSellers() {
    const { data, isPending } = useGetAllSellersQry();
    // local states
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 12; // how many per page

    const finalData: ISeller[] = data?.sellers;

    // derived: filter by search
    const filtered = useMemo(() => {
        if (!searchValue) return finalData;
        return finalData?.filter((c) =>
            [c.name, c.accountant_code, c.sell_price].join(" ").toLowerCase().includes(searchValue.toLowerCase())
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
                            <th>کد</th>
                            <th>نام</th>
                            <th>مبلغ فروش</th>
                            <th>مبلغ برگشت از فروش</th>
                            <th>درصد برگشت از فروش</th>
                            <th>توضیحات</th>
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

export default AllSellers;

const Row = ({ item, idx }: { item: ISeller; idx: number }) => {
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const { mutate } = useUpdateSeller();
    const { mutate: deleteSeller } = useDeleteSeller();
    const queryClient = useQueryClient();

    return (
        <>
            <tr className="odd:bg-gray-100" key={idx}>
                <th>{idx + 1}</th>
                <th>{item.accountant_code}</th>
                <th>{item.name}</th>
                <th>{item.sell_price}</th>
                <th>{item.refund_price}</th>
                <th>{item.refund_percentage}</th>
                <th>{item.description}</th>
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
                <SellerForm
                    initialData={item}
                    onSubmit={(body) =>
                        mutate(
                            { id: item._id, body },
                            {
                                onSuccess: () => {
                                    queryClient.invalidateQueries({ queryKey: ["sellers-list"] });
                                    setEditModal(false);
                                },
                            }
                        )
                    }
                />
            </CustomModal>
            <CustomDeleteModal
                onSubmit={() =>
                    deleteSeller(item._id, {
                        onSuccess: () => {
                            queryClient.invalidateQueries({ queryKey: ["sellers-list"] });
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
