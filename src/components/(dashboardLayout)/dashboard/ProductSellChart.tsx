"use client";
import { Select } from "antd";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useState } from "react";

const data = [
    { name: 'Jan', sell: 1200,  },
    { name: 'Feb', sell: 1402,  },
    { name: 'Mar', sell: 1525,  },
    { name: 'Apr', sell: 1222,  },
    { name: 'May', sell: 1553,  },
    { name: 'Jun', sell: 1634,  },
    { name: 'Jul', sell: 1923,  },
    { name: 'Aug', sell: 1324,  },
    { name: 'Sep', sell: 1834,  },
    { name: 'Oct', sell: 1256,  },
    { name: 'Nov', sell: 1634,  },
    { name: 'Dec', sell: 2105,  }
]

const ProductSellChart = () => {
  const [selectedYear, setSelectedYear] = useState("2024");

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setSelectedYear(value);
  };

  return (
    <div className="bg-primaryBlack  rounded-lg p-8 w-full md:w-1/2">
      <div className="text-parimaryWhite flex justify-between items-center mb-10">
        <h1 className="text-xl">Product Selling Overview</h1>
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
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
              <stop offset="30%" stopColor="#F8FAFC" stopOpacity={1} />
              <stop offset="100%" stopColor="#151515" stopOpacity={0.4} />
            </linearGradient>
          </defs>
          <XAxis
            tickMargin={10}
            axisLine={false}
            tickLine={false}
            dataKey="name"
          />
          <YAxis tickMargin={20} axisLine={false} tickLine={false} />
          <Tooltip />
          <Area
            activeDot={false}
            type="monotone"
            dataKey="sell"
            strokeWidth={0}
            stroke="#080E0E"
            fill="url(#color)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ProductSellChart;
