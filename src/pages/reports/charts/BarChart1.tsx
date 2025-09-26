// ✅ Register required Chart.js components
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);




export const BarChart1 = () => {
    // Example data for factors
    const data = {
        labels: ["فاکتور 1", "فاکتور 2", "فاکتور 3", "فاکتور 4"],
        datasets: [
            {
                label: "فروش",
                data: [120, 190, 30, 50],
                backgroundColor: "#36A2EB",
            },
            {
                label: "برگشت فروش",
                data: [20, 50, 10, 15],
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
                text: "Factors Overview",
            },
        },
    };

    return <Bar data={data} options={options} />;
};
