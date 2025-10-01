// ✅ Register required Chart.js components
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const BarChart1 = ({ reports }) => {
    const buyFactoresCount = reports?.buy_factores?.length || 0;
    const buyBackFactoresCount = reports?.buyback_factores?.length || 0;
    const saleFactoresCount = reports?.sale_factores?.length || 0;
    const saleBackFactoresCount = reports?.saleback_factores?.length || 0;
    

    console.log("ma reps", buyFactoresCount, buyBackFactoresCount);

    // Example data for factors
    const data = {
        labels: ["فاکتور خرید", "فاکتور فروش"],
        datasets: [
            {
                label: "ارسال",
                data: [buyFactoresCount, saleFactoresCount],
                backgroundColor: "#36A2EB",
            },
            {
                label: "برگشت",
                data: [buyBackFactoresCount, saleBackFactoresCount],
                backgroundColor: "#FF6384",
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true, // 👈 set false if you don’t want legends
                position: "top" as const,
            },
            title: {
                display: true,
                text: "",
            },
        },
    };

    return <Bar data={data} options={options} />;
};
