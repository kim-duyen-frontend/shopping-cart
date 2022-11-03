import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
)

const ChartProduct = () => {
    const productCart = useSelector((state) => state.cart.cartItems);
    const [dataSale, setDataSale] = useState([]);

    useEffect(() => {
        setDataSale(productCart.map((item) => ({
            name: item.product.title,
            qty: item.quantity
        })))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    var data = {
        labels: dataSale.map(item => item.name),
        datasets: [{
            label: "# of Votes",
            data: dataSale.map(item => item.qty),
            backgroundColor: [
                'rgba(255,99,132,0.2)',
                'rgba(54,162,235,0.2)',
                'rgba(255,206,86,0.2)',
                'rgba(75,192,192,0.2)',
                'rgba(153,102,255,0.2)',
                'rgba(255,159,64,0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
    var options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        legend: {
            labels: {
                fontSize: 26
            }
        }
    }
    return (
        <div>
            <h3>Biểu đồ doanh thu bán hàng</h3>
            <div style={{ minHeight: "300px", width: "50%" }}>
                <Bar data={data} height={1} options={options} />
            </div>
        </div>
    );
};

export default ChartProduct;