import React from 'react'
import {
    ComposedChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from 'recharts';
import { getDayName, toUTCDateInDate, toUTCDateTime } from '../../../lib/time-util';

export default function ChartByWeekComponent({ payload }) {
    const data = React.useMemo(() => {
        let data = {};
        for (let i = 0; i < 7; i++) {
            data[i] = {
                days: getDayName(i),
                users: 0
            }
        }
        payload.patients.forEach((patient) => {
            const day = (toUTCDateInDate(toUTCDateTime(patient.createdAt))).getDay();
            data[day].users++;
        })
        return Object.values(data);
    }, [payload]);
    return (
        <ComposedChart width={800}
            height={400}
            data={data}
            margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
            }}>
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis dataKey="days" scale="value" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="users" stroke="#413ea0" />
        </ComposedChart>
    )
}
