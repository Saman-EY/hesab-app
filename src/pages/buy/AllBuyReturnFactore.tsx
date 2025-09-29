import React, { useMemo, useState } from "react";
import { useGetAllBuyReturnQry } from "../../hooks/queries";
import LoadingList from "../../components/LoadingList";
import type { IBuyFactor } from "../../allTypes";
import { FactoreDataTable } from "./AllBuyFactore";

function AllBuyReturnFactore() {
    const { data, isPending } = useGetAllBuyReturnQry();

    // local states
    const [searchValue, setSearchValue] = useState("");
    const [page, setPage] = useState(1);
    const pageSize = 12; // how many per page

    const finalData: IBuyFactor[] = data?.factores;

    // derived: filter by search
    const filtered = useMemo(() => {
        if (!searchValue) return finalData;
        return finalData?.filter((c) =>
            [c.vault.title, c.project.title, c.title].join(" ").toLowerCase().includes(searchValue.toLowerCase())
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

export default AllBuyReturnFactore;
