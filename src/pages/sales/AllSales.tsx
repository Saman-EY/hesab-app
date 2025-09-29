import React, { useMemo, useState } from "react";
import { useGetAllSalesQry } from "../../hooks/queries";
import LoadingList from "../../components/LoadingList";
import type { ISaleFactor } from "../../allTypes";
import { useQueryClient } from "@tanstack/react-query";
import CustomModal from "../../components/CustomModal";
import { addCama, convertToJalali, translateCurrency, translateStatus } from "../../tools";
import { useUpdateSale, useUpdateSaleReturn } from "../../hooks/mutation";

function AllSales() {
    const { data, isPending } = useGetAllSalesQry();
    // local states
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 12; // how many per page

    const finalData: ISaleFactor[] = data?.factores;

    // derived: filter by search
    const filtered = useMemo(() => {
        if (!searchValue) return finalData;
        return finalData?.filter((c) =>
            [c.customer.first_name, c.project.title, c.title]
                .join(" ")
                .toLowerCase()
                .includes(searchValue.toLowerCase())
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
        <section>
            <FactoreDataTable
                totalPages={totalPages}
                page={page}
                setPage={setPage}
                setSearchValue={setSearchValue}
                type={"sale"}
                data={paginated}
                searchValue={searchValue}
            />
        </section>
    );
}

export default AllSales;

export const FactoreDataTable = ({ data, type, searchValue, totalPages, page, setPage, setSearchValue }) => {
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
                            <th>عنوان</th>
                            <th>تاریخ</th>
                            <th>تاریخ سررسید</th>
                            <th>پروژه</th>
                            <th>فروشنده</th>
                            <th>واحد پول</th>
                            <th>قیمت فاکتور</th>
                            <th>وضعیت</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {type === "sale"
                            ? data?.map((item, idx) => <Row idx={idx} item={item} key={idx} />)
                            : type === "return"
                            ? data?.map((item, idx) => <RowReturn idx={idx} item={item} key={idx} />)
                            : null}
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
};

const Row = ({ item, idx }: { item: ISaleFactor; idx: number }) => {
    const [detailModal, setDetailModal] = useState(false);
    const { mutate } = useUpdateSale();
    // const { mutate: deleteReceive } = useDeleteReceive();
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
                    queryClient.invalidateQueries({ queryKey: ["sales-list"] });
                },
            }
        );
    };

    return (
        <>
            <tr className="odd:bg-gray-100" key={idx}>
                <th>{idx + 1}</th>
                <td>{item?.code}</td>
                <td>{item?.title}</td>
                <td>{item?.date ? convertToJalali(item?.date) : "-"}</td>
                <td>{item?.receipt_date ? convertToJalali(item?.receipt_date) : "-"}</td>
                <td>{item?.project.title}</td>
                <td>{item?.seller.name}</td>
                <td>{item?.money + " - " + translateCurrency(item?.money)}</td>
                <td>{item?.final_price ? addCama(item?.final_price) : "-"}</td>
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
                <td>
                    <button
                        onClick={() => setDetailModal(true)}
                        className="btn text-xs bg-blue-400 text-white px-2 h-fit py-1"
                    >
                        جزییات بیشتر
                    </button>
                </td>
            </tr>

            {/* details modal */}
            <CustomModal containerClass="!max-w-6xl" title="جزییات" modal={detailModal} setModal={setDetailModal}>
                <section className=" flex gap-5 items-center flex-wrap">
                    <span>شماره : {item?.code || "-"}</span>
                    <span>تاریخ : {item?.date ? convertToJalali(item?.date) : "-"}</span>
                    <span>تاریخ سررسید : {item?.receipt_date ? convertToJalali(item?.receipt_date) : "-"}</span>
                    <span>عنوان : {item?.title || "-"}</span>
                    <span>پروژه : {item?.project?.title || "-"}</span>
                    <span>فروشنده : {item?.seller?.name || "-"}</span>
                    <span>واحد پول : {item?.money ? translateCurrency(item?.money) : "-"}</span>
                    <span>انبار : {item?.vault.title || "-"}</span>
                    <span>
                        مسئول حمل و نقل : {item?.transportation_guy.first_name || "-"}{" "}
                        {item?.transportation_guy.last_name || "-"}
                    </span>
                    <span>هزینه حمل و نقل : {item?.transportation_cost || "-"}</span>
                    <span className="font-semibold">
                        قیمت نهایی : {item?.final_price ? addCama(item?.final_price) : "-"}
                    </span>
                    <p className=" w-full">توضیحات : {item?.description || "-"}</p>
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

                    {/* products */}
                    <h6 className="font-bold text-lg w-full mt-4">محصولات/خدمات</h6>
                    <section className="flex flex-col gap-4">
                        {item?.products?.map((product, idx) => (
                            <div
                                key={idx}
                                className="border rounded-lg border-gray-300 p-5 flex items-center gap-5 justify-between"
                            >
                                <span>نام : {product.product.title}</span>
                                <span>تعداد : {product?.count}</span>
                                <span>قیمت واحد : {addCama(product?.price)}</span>
                                <span>مالیات : {addCama(product?.tax)}</span>
                                <span>تخفیف : {addCama(product?.discount)}</span>
                                <span>قیمت کل : {addCama(product?.all_price)}</span>
                            </div>
                        ))}
                    </section>
                </section>
            </CustomModal>
            {/* <CustomDeleteModal
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
      /> */}
        </>
    );
};

const RowReturn = ({ item, idx }: { item: ISaleFactor; idx: number }) => {
    const [detailModal, setDetailModal] = useState(false);
    const { mutate } = useUpdateSaleReturn();
    // const { mutate: deleteReceive } = useDeleteReceive();
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
                    queryClient.invalidateQueries({ queryKey: ["sales-return-list"] });
                },
            }
        );
    };

    return (
        <>
            <tr className="odd:bg-gray-100" key={idx}>
                <th>{idx + 1}</th>
                <td>{item?.code}</td>
                <td>{item?.title}</td>
                <td>{item?.date ? convertToJalali(item?.date) : "-"}</td>
                <td>{item?.receipt_date ? convertToJalali(item?.receipt_date) : "-"}</td>
                <td>{item?.project.title}</td>
                <td>{item?.seller.name}</td>
                <td>{item?.money + " - " + translateCurrency(item?.money)}</td>
                <td>{item?.final_price ? addCama(item?.final_price) : "-"}</td>
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
                <td>
                    <button
                        onClick={() => setDetailModal(true)}
                        className="btn text-xs bg-blue-400 text-white px-2 h-fit py-1"
                    >
                        جزییات بیشتر
                    </button>
                </td>
            </tr>

            {/* details modal */}
            <CustomModal containerClass="!max-w-6xl" title="جزییات" modal={detailModal} setModal={setDetailModal}>
                <section className=" flex gap-5 items-center flex-wrap">
                    <span>شماره : {item?.code || "-"}</span>
                    <span>تاریخ : {item?.date ? convertToJalali(item?.date) : "-"}</span>
                    <span>تاریخ سررسید : {item?.receipt_date ? convertToJalali(item?.receipt_date) : "-"}</span>
                    <span>عنوان : {item?.title || "-"}</span>
                    <span>پروژه : {item?.project?.title || "-"}</span>
                    <span>فروشنده : {item?.seller?.name || "-"}</span>
                    <span>واحد پول : {item?.money ? translateCurrency(item?.money) : "-"}</span>
                    <span>انبار : {item?.vault.title || "-"}</span>

                    <span>
                        مسئول حمل و نقل : {item?.transportation_guy.first_name || "-"}{" "}
                        {item?.transportation_guy.last_name || "-"}
                    </span>

                    <span>هزینه حمل و نقل : {item?.transportation_cost || "-"}</span>
                    <span className="font-semibold">
                        قیمت نهایی : {item?.final_price ? addCama(item?.final_price) : "-"}
                    </span>
                    <p className=" w-full">توضیحات : {item?.description || "-"}</p>
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

                    {/* products */}
                    <h6 className="font-bold text-lg w-full mt-4">محصولات/خدمات</h6>
                    <section className="flex flex-col gap-4">
                        {item?.products?.map((product, idx) => (
                            <div
                                key={idx}
                                className="border rounded-lg border-gray-300 p-5 flex items-center gap-5 justify-between"
                            >
                                <span>نام : {product.product.title}</span>
                                <span>تعداد : {product?.count}</span>
                                <span>قیمت واحد : {addCama(product?.price)}</span>
                                <span>مالیات : {addCama(product?.tax)}</span>
                                <span>تخفیف : {addCama(product?.discount)}</span>
                                <span>قیمت کل : {addCama(product?.all_price)}</span>
                            </div>
                        ))}
                    </section>
                </section>
            </CustomModal>
            {/* <CustomDeleteModal
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
      /> */}
        </>
    );
};
