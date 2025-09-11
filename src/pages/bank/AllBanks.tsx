import type { IBank } from "../../allTypes";
import LoadingList from "../../components/LoadingList";
import { useGetAllBanksQry } from "../../hooks/queries";

function AllBanks() {
  const { data, isPending } = useGetAllBanksQry();

  const finalData: IBank[] = data?.banks;


  if (isPending) {
    return <LoadingList />;
  }

  return (
    <section className="h-[86dvh] my-auto md:my-0 w-full  border border-gray-300 rounded-lg shadow p-5 overflow-auto">
      <div className="overflow-x-auto min-w-[800px] border rounded-lg border-gray-300 p-4">
        <table className="table table-xs ">
          <thead>
            <tr>
              <th className="px-8 truncate"></th>
              <th className="px-8 truncate">کد</th>
              <th className="px-8 truncate">اسم بانک</th>
              <th className="px-8 truncate">شعبه</th>
              <th className="px-8 truncate">شماره حساب</th>
              <th className="px-8 truncate">شماره کارت</th>
              <th className="px-8 truncate">نام صاحب حساب</th>
              <th className="px-8 truncate">شماره POS</th>

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
                <td className="px-8 truncate">{item?.branch || "-"}</td>
                <td className="px-8 truncate">{item?.account_number || "-"}</td>
                <td className="px-8 truncate">{item?.cart_number || "-"}</td>
                <td className="px-8 truncate">{item?.account_user_name || "-"}</td>
                <td className="px-8 truncate">{item?.pos_number || "-"}</td>

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

export default AllBanks;
