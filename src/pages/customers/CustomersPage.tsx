import type { ICustomer } from "../../allTypes";
import LoadingList from "../../components/LoadingList";
import { useGetAllCustomersQry } from "../../hooks/queries";
import { convertToJalali } from "../../tools";

function CustomersPage() {
  const { data, isPending } = useGetAllCustomersQry();

  const finalData: ICustomer[] = data?.customers;

  console.log("*", finalData);

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
              <th>نام</th>
              <th>نام خانوادگی</th>
              <th>موبایل</th>
              <th>شرکت</th>
              <th>کد ملی</th>
              <th>تاریخ ساخت</th>
            </tr>
          </thead>
          <tbody>
            {finalData?.map((item, idx) => (
              <tr className="odd:bg-gray-100" key={idx}>
                <th>{idx + 1}</th>
                <td>{item?.first_name}</td>
                <td>{item?.last_name}</td>
                <td>{item?.phone}</td>
                <td>{item?.company}</td>
                <td>{item?.national_code}</td>
                <td>{item.createdAt ? convertToJalali(item.createdAt) : "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default CustomersPage;
