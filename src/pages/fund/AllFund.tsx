import type { IFund } from "../../allTypes";
import LoadingList from "../../components/LoadingList";
import { useGetAllFundsQry } from "../../hooks/queries";

function AllFund() {
  const { data, isPending } = useGetAllFundsQry();

  const finalData: IFund[] = data?.funds;


  if (isPending) {
    return <LoadingList />;
  }

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <div className="overflow-x-auto min-w-[800px] border rounded-lg border-gray-300 p-4">
        <table className="table table-xs ">
          <thead>
            <tr>
              <th className="px-8 truncate"></th>
              <th className="px-8 truncate">کد</th>
              <th className="px-8 truncate">اسم</th>
              <th className="px-8 truncate">توضیحات</th>
            </tr>
          </thead>
          <tbody>
            {finalData?.map((item, idx) => (
              <tr className="odd:bg-gray-100" key={idx}>
                <th>{idx + 1}</th>
                <td className="px-8 truncate">{item?.account_code || "-"}</td>
                <td className="px-8 truncate">{item?.title || "-"}</td>
                <td className="px-8 truncate">{item?.description || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AllFund;
