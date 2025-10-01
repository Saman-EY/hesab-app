"use client";
import { useGetReportsCategory, useGetReportsFactore, useGetReportsProducts } from "../../hooks/queries";
import { BarChart1 } from "./charts/BarChart1";
import BarChart2 from "./charts/BarChart2";
import { PieChart1 } from "./charts/PieChart1";
import { Chart as ChartJS } from "chart.js";
ChartJS.register();

// 👇 Set global font family here
ChartJS.defaults.font.family = "iransans,Vazir, IRANSans, sans-serif";
ChartJS.defaults.font.size = 12; // optional
ChartJS.defaults.color = "#595959"; // optional default text color
// Register needed chart.js components

const ReportsPage = () => {
    const { data: factoreData } = useGetReportsFactore();
    const { data: productData } = useGetReportsProducts();
    const { data: categoryData } = useGetReportsCategory();

    return (
        <section className="flex flex-wrap gap-10">
            <div className="border border-gray-200 p-5 bg-white shadow-sm rounded-lg w-full max-w-2xl">
                <h6>محصولات</h6>
                <div className="text-gray-700">
                    <span>تعداد کل محصولات : </span>
                    <span>{productData?.AllProducts?.length}</span>
                </div>
                <ProductsTable data={productData} />
            </div>
            <div className="border border-gray-200 p-5 bg-white shadow-sm rounded-lg w-full max-w-2xl">
                <h6>فاکتور ها</h6>
                <div className="text-gray-700">
                    <span>تعداد کل فاکتور ها : </span>
                    <span>{factoreData?.Allfactores}</span>
                </div>
                <BarChart1 reports={factoreData} />
            </div>
            <div className="border border-gray-200 p-5 bg-white shadow-sm rounded-lg w-full max-w-2xl">
                <h6>دسته بندی ها</h6>

                <CategoryTable data={categoryData} />
            </div>
        </section>
    );
};

export default ReportsPage;

const ProductsTable = ({ data }) => {
    return (
        <section className="bg-white border border-gray-300  mt-4 rounded-lg p-5">
            <h6 className="text-xs text-center">بیشترین فروش محصول به ترتیب</h6>

            {data?.MostUsed.map((item, idx) => (
                <div
                    className="text-sm border-b border-gray-400 py-3 flex items-center justify-between gap-5"
                    key={idx}
                >
                    <div className="flex items-center gap-5">
                        <span>نام : {item?.product.title}</span>
                        <span>بارکد : {item?.product.title}</span>
                    </div>

                    <span>تعداد فروش : {item?.count}</span>
                </div>
            ))}
        </section>
    );
};

const CategoryTable = ({ data }) => {

    return (
        <section className="bg-white border border-gray-300  mt-4 rounded-lg p-5">
            <h6 className="text-xs text-center">بیشترین دسته بندی استفاده شده</h6>

            {data?.categories.map((item, idx) => (
                <div
                    className="text-sm border-b border-gray-400 py-3 flex items-center justify-between gap-5"
                    key={idx}
                >
                    <div className="flex items-center gap-5">
                        <span>نام : {item?.category.title}</span>
                        {/* <span>بارکد : {item.product.title}</span> */}
                    </div>

                    <span>تعداد استفاده : {item?.count}</span>
                </div>
            ))}
        </section>
    );
};
