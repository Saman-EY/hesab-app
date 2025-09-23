import React from "react";
import { useGetAllBuyReturnQry, useGetAllSalesReturnQry } from "../../hooks/queries";
import LoadingList from "../../components/LoadingList";
import type { IBuyFactor, ISaleFactor } from "../../allTypes";
import { FactoreDataTable } from "./AllBuyFactore";

function AllBuyReturnFactore() {
  const { data, isPending } = useGetAllBuyReturnQry();
  const finalData: IBuyFactor[] = data?.factores;

  if (isPending) {
    return <LoadingList />;
  }

  return (
    <section>
      <FactoreDataTable type={"return"} data={finalData} />
    </section>
  );
}

export default AllBuyReturnFactore;
