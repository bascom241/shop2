import React, { useContext } from 'react';
import './Dashboard.css';
import { FaShoppingCart, FaDollarSign, FaClipboardList, FaBoxes } from 'react-icons/fa';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { AdminContext } from '../context/adminContext';

// Register Chart.js components
Chart.register(...registerables);

const Dashboard = () => {
    const { users, list, totalOrder, totalRevenue } = useContext(AdminContext);

    // Calculate revenue per order
    const revenuePerOrder = totalOrder > 0 ? (totalRevenue / totalOrder).toFixed(2) : 0;

    // Prepare data for both the bar chart and the histogram
    const commonData = {
        labels: ['Total Orders', 'Total Users', 'Total Revenue', 'Revenue per Order', 'Inventory Count'],
        data: [totalOrder, users.length, totalRevenue, revenuePerOrder, list.length],
    };

    // Prepare data for the overall statistics bar chart
    const barChartData = {
        labels: commonData.labels,
        datasets: [
            {
                label: 'Counts',
                data: commonData.data,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const barChartOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    // Prepare data for the histogram (using the same data points)
    const histogramData = {
        labels: ['Total Orders', 'Total Users', 'Total Revenue', 'Revenue per Order', 'Inventory Count'],
        datasets: [
            {
                label: 'Frequency',
                data: commonData.data.map(value => Math.floor(value / 10)), // Example: Adjusting data for frequency
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const histogramOptions = {
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div className='container con'>
            <h2>Dashboard</h2>
            <div className='dashboard-container'>
                <div className='div'>
                    <div className='icon1'>
                        <FaShoppingCart />
                    </div>
                    <div>
                        <p>Orders</p>
                        <h2>{totalOrder}</h2>
                    </div>
                </div>
                <div className='div'>
                    <div className='icon2'>
                        <FaBoxes />
                    </div>
                    <div>
                        <p>Inventory</p>
                        <h2>{list.length}</h2>
                    </div>
                </div>
                <div className='div'>
                    <div className='icon3'>
                        <FaClipboardList />
                    </div>
                    <div>
                        <p>Customers</p>
                        <h2>{users.length}</h2>
                    </div>
                </div>
                <div className='div'>
                    <div className='icon4'>
                        <FaDollarSign />
                    </div>
                    <div>
                        <p>Revenue</p>
                        <h2>{totalRevenue}</h2>
                    </div>
                </div>
            </div>

            <div className='charts-container'>
                <div className='bar-chart-container'>
                    <h3>Overall Statistics</h3>
                    <Bar data={barChartData} options={barChartOptions} />
                </div>
                <div className='histogram-container'>
                    <h3>Orders Histogram</h3>
                    <Bar data={histogramData} options={histogramOptions} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
