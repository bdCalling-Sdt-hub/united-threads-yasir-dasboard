"use client";
import { useGetEarningGrowthQuery, useGetSellCountQuery } from "@/redux/api/metaApi";
import { TResponse } from "@/types/global";
import { Select } from "antd";
import { useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const ProductSellChart = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const { data } = useGetSellCountQuery([{ label: "year", value: selectedYear }], {});
  const result = data as TResponse<{ name: string; totalQuantity: number }[]>;

  const { data: growth, isLoading } = useGetEarningGrowthQuery(
    [{ label: "year", value: selectedYear }],
    {},
  );

  const handleChange = (value: string) => {
    setSelectedYear(value);
  };

  return (
    <div className='bg-primaryBlack  rounded-lg p-8 w-full md:w-1/2'>
      <div className='text-primaryWhite flex justify-between items-center mb-10'>
        <h1 className='text-xl'>Product Selling Overview</h1>
        <h1 className=''>
          Yearly Growth:{" "}
          <span className='ml-4 font-medium'>
            {isLoading ? "0.00%" : `${growth?.data?.growthPercentage}%`}
          </span>
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
      <ResponsiveContainer width='100%' height={300}>
        <AreaChart data={result?.data || []} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id='color' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='30%' stopColor='#F8FAFC' stopOpacity={1} />
              <stop offset='100%' stopColor='#151515' stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <XAxis tickMargin={10} axisLine={false} tickLine={false} dataKey='name' />
          <YAxis tickMargin={20} axisLine={false} tickLine={false} />
          <Tooltip />
          <Area
            activeDot={false}
            type='monotone'
            dataKey='totalQuantity'
            strokeWidth={0}
            stroke='#080E0E'
            fill='url(#color)'
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductSellChart;
