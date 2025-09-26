import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

// ✅ Register required components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const BarChart2 = () => {
    // Example data: users per month
    const data = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"], // months
        datasets: [
            {
                label: "کاربران جدید",
                data: [50, 75, 150, 200, 300, 400, 600], // example numbers
                borderColor: "#36A2EB",
                backgroundColor: "rgba(54, 162, 235, 0.3)",
                tension: 0.3, // smooth curves
                fill: true,
            },
            {
                label: "کاربران فعال",
                data: [30, 50, 100, 150, 220, 320, 500],
                borderColor: "#FF6384",
                backgroundColor: "rgba(255, 99, 132, 0.3)",
                tension: 0.3,
                fill: true,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: "top" as const,
            },
            title: {
                display: true,
                text: "Users Growth in Site",
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default BarChart2;
