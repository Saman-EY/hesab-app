import React from "react";
import { useGetAllSalesReturnQry } from "../../hooks/queries";
import LoadingList from "../../components/LoadingList";
import type { ISaleFactor } from "../../allTypes";
import { FactoreDataTable } from "./AllSales";

function AllSalesReturn() {
  const { data, isPending } = useGetAllSalesReturnQry();
  const finalData: ISaleFactor[] = data?.factores;

  if (isPending) {
    return <LoadingList />;
  }

  return (
    <section>
      <FactoreDataTable type={"return"} data={finalData} />
    </section>
  );
}

export default AllSalesReturn;
