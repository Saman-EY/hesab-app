import { useMemo, useState } from "react";
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
    // local states
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 12; // how many per page

    const finalData: IVault[] = data?.vaults;

    // derived: filter by search
    const filtered = useMemo(() => {
        if (!searchValue) return finalData;
        return finalData?.filter((c) =>
            [c.branch, c.money, c.title].join(" ").toLowerCase().includes(searchValue.toLowerCase())
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
                            <th className="px-8 truncate"></th>
                            <th className="px-8 truncate">کد</th>
                            <th className="px-8 truncate">اسم صندوق</th>
                            <th className="px-8 truncate">توضیحات</th>
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
