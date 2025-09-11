import type { IVault } from "../../allTypes";
import LoadingList from "../../components/LoadingList";
import { useGetAllVaultsQry } from "../../hooks/queries";

function AllVault() {
  const { data, isPending } = useGetAllVaultsQry();

  const finalData: IVault[] = data?.vaults;

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
              <th className="px-8 truncate">اسم صندوق</th>
              <th className="px-8 truncate">توضیحات</th>
              <th className="px-8 truncate">شماره سوییچ پرداخت</th>
              <th className="px-8 truncate">شماره ترمینال پرداخت</th>
              <th className="px-8 truncate">شماره پذیرنده فروشگاهی</th>
            </tr>
          </thead>
          <tbody>
            {finalData?.map((item, idx) => (
              <tr className="odd:bg-gray-100" key={idx}>
                <th>{idx + 1}</th>
                <td className="px-8 truncate">{item?.account_code || "-"}</td>
                <td className="px-8 truncate">{item?.title || "-"}</td>
                <td className="px-8 truncate">{item?.description || "-"}</td>

                <td className="px-8 truncate">{item?.switch_number_payment || "-"}</td>
                <td className="px-8 truncate">{item?.terrminal_number_payment || "-"}</td>
                <td className="px-8 truncate">{item?.shop_number || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AllVault;
