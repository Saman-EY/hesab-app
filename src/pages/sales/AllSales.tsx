import React, { useState } from "react";
import { useGetAllSalesQry } from "../../hooks/queries";
import LoadingList from "../../components/LoadingList";
import type { ISaleFactor } from "../../allTypes";
import { useQueryClient } from "@tanstack/react-query";
import CustomModal from "../../components/CustomModal";
import { convertToJalali, translateCurrency } from "../../tools";

function AllSales() {
  const { data, isPending } = useGetAllSalesQry();

  const finalData: ISaleFactor[] = data?.factores;

  if (isPending) {
    return <LoadingList />;
  }

  return (
    <section>
      <FactoreDataTable data={finalData} />
    </section>
  );
}

export default AllSales;

export const FactoreDataTable = ({ data }) => {
  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
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
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data?.map((item, idx) => (
              <Row idx={idx} item={item} key={idx} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

const Row = ({ item, idx }: { item: ISaleFactor; idx: number }) => {
  const [detailModal, setDetailModal] = useState(false);
  // const { mutate } = useUpdateReceive();
  // const { mutate: deleteReceive } = useDeleteReceive();
  const queryClient = useQueryClient();

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
        <td>
          <button onClick={() => setDetailModal(true)} className="btn text-xs bg-blue-400 text-white px-2 h-fit py-1">
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
          <span>انبار : {item?.vault || "-"}</span>
          <span>مسئول انبار : {item?.transportation_guy || "-"}</span>
          <span>هزینه حمل و نقل : {item?.transportation_cost || "-"}</span>
          <p className=" w-full">توضیحات : {item?.description || "-"}</p>

          {/* products */}
          <h6 className="font-bold text-lg w-full mt-4">محصولات/خدمات</h6>
          <section className="flex flex-col gap-4">
            {item?.products?.map((product, idx) => (
              <div key={idx} className="border rounded-lg border-gray-300 p-5 flex items-center gap-5 justify-between">
                <span>نام : {product._id}</span>
                <span>تعداد : {product?.count}</span>
                <span>قیمت واحد : {product?.price}</span>
                <span>مالیات : {product?.tax}</span>
                <span>تخفیف : {product?.discount}</span>
                <span>قیمت کل : {product?.all_price}</span>
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
