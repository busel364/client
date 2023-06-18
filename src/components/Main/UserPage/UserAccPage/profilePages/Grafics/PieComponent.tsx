import React from 'react'
import { Chart as ChartJS, Tooltip, Legend, ArcElement, Title } from 'chart.js';
import { Pie } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend, Title);

// ChartJS.register(ArcElement, Tooltip, Legend);


interface Props{
    data:any
}

const PieComponent = ({data}:Props) => {

    ChartJS.defaults.color = "whitesmoke";
    ChartJS.defaults.font.size = 22;

    return (
        <div className='pt-3 pb-5 col' style={{ margin: '0 auto', position: "relative", width: "70%" }}>
            <Pie
                style={{ display: 'inline-block' }}
                data={data}
                options={{
                    plugins: {
                        legend: {
                            position: 'right',
                            rtl: true,
                            labels: {
                                usePointStyle: true,
                                pointStyle: 'circle',
                                padding: 20,
                                
                            }
                        },
                    },
                }
                } />
        </div>);
}

export default PieComponent
