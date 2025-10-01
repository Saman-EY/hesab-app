import { useMemo, useState } from "react";
import type { IProductAndService } from "../../allTypes";
import CustomModal from "../../components/CustomModal";
import LoadingList from "../../components/LoadingList";
import { useGetAllProAndServiceQry } from "../../hooks/queries";
import ProductForm from "./ProductForm";
import ServiceForm from "./ServiceForm";
import CustomDeleteModal from "../../components/CustomDeleteModal";
import { useDeleteProduct, useDeleteService, useUpdateProduct, useUpdateService } from "../../hooks/mutation";
import { useQueryClient } from "@tanstack/react-query";

function AllProAndService() {
    const { data, isPending } = useGetAllProAndServiceQry();

    // local states
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 12; // how many per page

    const finalData: IProductAndService[] = data?.data;

    // derived: filter by search
    const filtered = useMemo(() => {
        if (!searchValue) return finalData;
        return finalData?.filter((c) =>
            [c.barcode, c.buy_price, c.buy_tax, c.title].join(" ").toLowerCase().includes(searchValue.toLowerCase())
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
                            <th>شماره</th>
                            <th>عکس</th>
                            <th>نام</th>
                            <th>دسته بندی</th>
                            <th>بارکد</th>
                            <th>قیمت فروش</th>
                            <th>توضیحات فروش</th>
                            <th>قیمت خرید</th>
                            <th>توضیحات خرید</th>
                            <th>موجودی</th>
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

export default AllProAndService;

const Row = ({ item, idx }: { item: IProductAndService; idx: number }) => {
    const [editModal, setEditModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const { mutate: updateProduct } = useUpdateProduct();
    const { mutate: updateService } = useUpdateService();
    const { mutate: deleteProduct } = useDeleteProduct();
    const { mutate: deleteService } = useDeleteService();
    const queryClient = useQueryClient();

    return (
        <>
            <tr className="odd:bg-gray-100" key={idx}>
                <th>{idx + 1}</th>
                <td>{item?.accountant_code}</td>
                <td>
                    {item?.img ? (
                        <img
                            className="size-20 object-cover min-w-20"
                            src={import.meta.env.VITE_BASE_URL + "/" + item.img}
                            alt=""
                        />
                    ) : (
                        "-"
                    )}
                </td>
                <td>{item?.title || "-"}</td>
                <td className="font-bold">
                    {typeof item.category === "string" ? translate(item.category) : item.category?.title}
                </td>
                <td>{item?.barcode || "-"}</td>
                <td>{item?.sell_price || "-"}</td>
                <td>{item?.sell_description || "-"}</td>
                <td>{item?.buy_price || "-"}</td>
                <td>{item?.buy_description || "-"}</td>
                <td>{item?.stock || "-"}</td>
                <td className="flex flex-wrap  h-20 gap-2 items-center justify-center md:justify-start ">
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
                {item?.category === "service" ? (
                    <ServiceForm
                        initialData={item}
                        onSubmit={(body) =>
                            updateService(
                                { id: item._id, body },
                                {
                                    onSuccess: () => {
                                        queryClient.invalidateQueries({ queryKey: ["product-service-list"] });
                                        setEditModal(false);
                                    },
                                }
                            )
                        }
                    />
                ) : (
                    <ProductForm
                        initialData={item}
                        onSubmit={(body) =>
                            updateProduct(
                                { id: item._id, body },
                                {
                                    onSuccess: () => {
                                        queryClient.invalidateQueries({ queryKey: ["product-service-list"] });
                                        setEditModal(false);
                                    },
                                }
                            )
                        }
                    />
                )}
            </CustomModal>
            <CustomDeleteModal
                onSubmit={() => {
                    if (item?.category === "service") {
                        deleteService(item._id, {
                            onSuccess: () => {
                                queryClient.invalidateQueries({ queryKey: ["product-service-list"] });
                                setDeleteModal(false);
                            },
                        });
                    } else {
                        deleteProduct(item._id, {
                            onSuccess: () => {
                                queryClient.invalidateQueries({ queryKey: ["product-service-list"] });
                                setDeleteModal(false);
                            },
                        });
                    }
                }}
                modal={deleteModal}
                setModal={setDeleteModal}
            />
        </>
    );
};

const translate = (item: string) => {
    if (item === "product") {
        return "محصول";
    }
    if (item === "service") {
        return "خدمات";
    }
    return item;
};
