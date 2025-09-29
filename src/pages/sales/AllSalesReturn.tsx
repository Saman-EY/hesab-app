import React, { useMemo, useState } from "react";
import { useGetAllSalesReturnQry } from "../../hooks/queries";
import LoadingList from "../../components/LoadingList";
import type { ISaleFactor } from "../../allTypes";
import { FactoreDataTable } from "./AllSales";

function AllSalesReturn() {
    const { data, isPending } = useGetAllSalesReturnQry();

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
                data={paginated}
                searchValue={searchValue}
                type={"return"}
            />
        </section>
    );
}

export default AllSalesReturn;
