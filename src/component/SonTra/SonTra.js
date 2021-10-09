import React, { PureComponent, useEffect, useState } from 'react';

import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";



const SonTra = props => {
    const {dataName} = props
    const [dataText, setData] = useState(dataName)
    useEffect(() => {
        setData(dataName)
    }, [dataName])
    // console.log(dataText)
    return (
        <ResponsiveContainer width="100%" height={400} key={dataText}>
        <AreaChart data={dataText}>
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2451B7" stopOpacity={0.4} />
              <stop offset="75%" stopColor="#2451B7" stopOpacity={0.05} />
            </linearGradient>
          </defs>

          <Area type="monotone" dataKey="temp" stroke="#ff4e4e" fill="url(#color)" />
          <Area type="monotone" dataKey="salinity" stroke="#df731b"  fill="url(#color)" />
          <Area type="monotone" dataKey="density" stroke="#5f64f9"  fill="url(#color)" />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            vertical={true}
            tickCount={8}
          />

          <Tooltip />
          <Legend/>
          <CartesianGrid opacity={0.2} vertical={true} />
        </AreaChart>
      </ResponsiveContainer>
    );
}

export default SonTra;