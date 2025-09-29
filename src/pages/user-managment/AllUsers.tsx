import { useQueryClient } from "@tanstack/react-query";
import type { IUser } from "../../allTypes";
import LoadingList from "../../components/LoadingList";
import { useGetUsersQry } from "../../hooks/queries";
import { useMemo, useState } from "react";
import { convertToJalali } from "../../tools";
import CustomDeleteModal from "../../components/CustomDeleteModal";
import { useDeleteUser, useUpdateUser } from "../../hooks/mutation";

function AllUsers() {
    const { data, isPending } = useGetUsersQry();

    // local states
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 12; // how many per page

    const finalData: IUser[] = data?.users;

    const filtered = useMemo(() => {
        if (!searchValue) return finalData;
        return finalData?.filter((c) => [c.username].join(" ").toLowerCase().includes(searchValue.toLowerCase()));
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
                            {paginated?.map((item, idx) => (
                                <Row key={idx} idx={idx} item={item} />
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
