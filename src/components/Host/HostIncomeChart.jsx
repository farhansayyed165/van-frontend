import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';
import { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

function HostIncomeChart() {
    // const datal = [1200, 3000, 1600, 800, 3800, 4000]
    const labels = ["May", "June", "July", "August", "September", "October"]
    const data = {
        labels,
        datasets: [{
            label: "Income",
            data: [1200, 3000, 1600, 800, 3800, 4000],
            backgroundColor: "#FF8C38",
            borderRadius: 8,
        }]
    }
    const options = {
        scales: {
            y: {
                grid: {
                    display: true,
                    displayChartArea:true,
                    drawTick:true,
                    color:"#CBC9C6"
                },
                border:{
                    dash:[10,10],
                }
            },
            x: {
                grid: {
                    display: false,
                    // borderDash: [8, 4],

                }
            }
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom',
            },
            title: {
                display: true,
                text: 'Income in Last 6 months',
            },
            customCanvasBackgroundColor: {
                color: "#FFF7ED",
            }
        },
        maintainAspectRatio: false,
    }
    return (
        <div className='lg:w-[50vw] w-full sm:inline-block hidden '>
            <Bar data={data} options={options} className='sm:min-h-[400px] min-h-[0] sm:object-cover object-fit  sm:min-w-0   min-w-[190vw]' />
        </div>
    )
}

export default HostIncomeChart