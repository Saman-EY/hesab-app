import type { IReceive } from "../../allTypes";
import LoadingList from "../../components/LoadingList";
import { useGetAllPaymentsQry } from "../../hooks/queries";
import { convertToJalali } from "../../tools";

function AllPayments() {
  const { data, isPending } = useGetAllPaymentsQry();

  const finalData: IReceive[] = data?.payments;

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
              <th>تاریخ</th>
              <th>پروژه</th>
              <th>نوع دریافت</th>
              <th>قیمت</th>
              <th>کارمزد بانک</th>
              <th>ارجاع</th>
            </tr>
          </thead>
          <tbody>
            {finalData?.map((item, idx) => (
              <tr className="odd:bg-gray-100" key={idx}>
                <th>{idx + 1}</th>
                <td>{item?.code}</td>
                <td>{item.date ? convertToJalali(item.date) : ""}</td>
                <td>{item?.project}</td>
                <td>{item?.receipt_kind}</td>
                <td>{item?.price}</td>
                <td>{item?.fee}</td>
                <td>{item?.reference}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AllPayments;
