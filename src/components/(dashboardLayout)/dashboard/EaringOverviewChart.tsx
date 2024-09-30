"use client";
import {  Select} from "antd";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
    { name: 'Jan', revenue: 1200 },
    { name: 'Feb', revenue: 1402 },
    { name: 'Mar', revenue: 1525 },
    { name: 'Apr', revenue: 1222 },
    { name: 'May', revenue: 1553 },
    { name: 'Jun', revenue: 1634 },
    { name: 'Jul', revenue: 1923 },
    { name: 'Aug', revenue: 1324 },
    { name: 'Sep', revenue: 1834 },
    { name: 'Oct', revenue: 1256 },
    { name: 'Nov', revenue: 1634 },
    { name: 'Dec', revenue: 2105 }
]

const EaringOverviewChart = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setSelectedYear(value);
  };

  return (
    <div className="bg-primaryBlack  rounded-lg p-8 w-1/2">
      <div className="text-parimaryWhite flex justify-between items-center mb-10">
        <h1 className="text-xl">Earning Overview</h1>
        <h1 className="">
          Monthly Growth: <span className="ml-4 font-medium">35.80%</span>
        </h1>

        <Select
          value={selectedYear}
          style={{ width: 120 }}
          onChange={handleChange}
          options={[
            { value: "2024", label: "2024" },
            { value: "2025", label: "2025" },
            { value: "2026", label: "2026" },
            { value: "2027", label: "2027" },
          ]}
        />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
          barSize={20}
        >
          <XAxis
            dataKey="name"
            scale="point"
            padding={{ left: 10, right: 10 }}
            tickMargin={10}
            tickLine={false}
            axisLine={false}
          />
          <YAxis axisLine={false} tickLine={false} tickMargin={20} />
          <Tooltip
            itemStyle={{ color: "#000" }}
          />
          <CartesianGrid
            opacity={0.2}
            horizontal={true}
            vertical={false}
            stroke="080E0E"
            strokeDasharray="0"
          />
          <Bar
            barSize={12}
            radius={10}
            background={false}
            dataKey="revenue"
            fill="#F8FAFC"
            stroke="#080E0E"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EaringOverviewChart;
