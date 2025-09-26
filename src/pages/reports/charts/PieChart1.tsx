import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChart1 = () => {
    const data = {
        labels: ["محصول 1", "محصول 2", "محصول 3"],
        datasets: [
            {
                label: "Votes",
                data: [12, 19, 3], // values for each slice
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                borderColor: ["#fff", "#fff", "#fff"],
                borderWidth: 2,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            // legend: {
            //     position: "bottom" as const,
            // },
        },
    };

    return (
        <div className="max-w-xs">
            <Pie data={data} options={options} />
        </div>
    );
};
