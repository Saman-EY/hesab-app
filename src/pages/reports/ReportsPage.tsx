"use client";
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
    return (
        <section className="flex flex-wrap gap-10">
            <div className="border border-gray-200 p-5 bg-white rounded-lg w-fit">
                <h6>بیشترین فروش</h6>
                <PieChart1 />
            </div>
            <div className="border border-gray-200 p-5 bg-white rounded-lg w-full max-w-lg">
                <h6>فاکتور ها</h6>
                <BarChart1 />
            </div>
            <div className="border border-gray-200 p-5 bg-white rounded-lg w-full max-w-lg">
                <h6>کاربران</h6>
                <BarChart2 />
            </div>
        </section>
    );
};

export default ReportsPage;
