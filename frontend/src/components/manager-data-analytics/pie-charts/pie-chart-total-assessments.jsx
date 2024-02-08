import React from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";
import './pie-chart-assessment.css';

const COLORS = ["#8884d8", "#82ca9d"];

export default function PieChartForTotalAssessmentsComponent({ payload }) {
    const data = React.useMemo(() => {
        const percentAttemptedAssessment = Number((Number(payload.numAttemptedAssessment) * 100 / Number(payload.numTotal)).toFixed(0));
        return [{
            name: "Assessments",
            value: Math.abs(percentAttemptedAssessment)
        }, {
            name: "Not attempted assessment yet",
            value: Math.abs(100 - percentAttemptedAssessment)
        }]
    }, [payload])
    const CustomToolTip = ({ active, payload, label }) => {
        if (active) {
            return (
                <div
                    className="custom-tooltip"
                    style={{
                        backgroundColor: "#ffff",
                        padding: "5px",
                        border: "1px solid #cccc"
                    }}
                >
                    <label>{`${payload[0].name} : ${payload[0].value}%`}</label>
                </div>
            );
        }
        return null;
    };
    return (
        <>
            <PieChart width={250} height={300} >
                <Pie
                    data={data}
                    color="#000000"
                    dataKey="value"
                    nameKey="name"
                    cx={120}
                    cy={120}
                    outerRadius={80}
                    innerRadius={60}
                    paddingAngle={5}

                >
                    {data.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip content={<CustomToolTip />} />
                <Legend />
            </PieChart>
        </>
    );
}



