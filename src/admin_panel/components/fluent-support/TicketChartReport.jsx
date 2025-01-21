import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale,
  PointElement,
  LinearScale,
  Tooltip,
  Legend
);

const TicketChartReport = () => {
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [12, 30, 45, 40, 67, 60, 55, 78, 63, 93, 44, 29],
        fill: false,
        borderColor: "blue",
        tension: 0.3,
        borderWidth: 1,
        pointRadius: 0,
      },
      // {
      //   label: "My First Dataset",
      //   data: [15, 59, 50, 81, 26, 55, 46],
      //   fill: false,
      //   borderColor: "rgb(75, 192, 192)",
      //   tension: 0.4,
      //   borderWidth: 1,
      //   pointRadius: 0,
      //   borderDash: [3, 5],
      // },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        enabled: false,
      },
      legend: {
        display: false,
      },
    },
  };
  return <Line options={options} data={data}></Line>;
};

export default TicketChartReport;
