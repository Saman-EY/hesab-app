import type { IProductAndService } from "../../allTypes";
import LoadingList from "../../components/LoadingList";
import { useGetAllProAndServiceQry } from "../../hooks/queries";

function AllProAndService() {
  const { data, isPending } = useGetAllProAndServiceQry();

  const finalData: IProductAndService[] = data?.data;

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
            {finalData?.map((item, idx) => (
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
                <td className="font-bold">{item?.category ? translate(item?.category) : "-"}</td>
                <td>{item?.barcode || "-"}</td>
                <td>{item?.sell_price || "-"}</td>
                <td>{item?.sell_description || "-"}</td>
                <td>{item?.buy_price || "-"}</td>
                <td>{item?.buy_description || "-"}</td>
                <td>{item?.stock || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AllProAndService;

const translate = (item: string) => {
  if (item === "product") {
    return "محصول";
  }
  if (item === "service") {
    return "خدمات";
  }
  return item;
};
