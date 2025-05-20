import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<any>;
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow-md">
        <p className="label text-gray-800">{label}</p>
        {payload.map((item: any) => (
          <p
            key={item.dataKey}
            className={`text-sm ${
              item.dataKey === "totalRevenue"
                ? "text-green-500"
                : "text-purple-500"
            }`}
          >
            {item.name}: {item.value}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const RechartsBarChart = (salesReport: any) => {
  const data = salesReport?.salesReport?.result?.totalRevenue;
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Sales Report</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-sm text-gray-600">Total Revenue</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-sm text-gray-600">Total Bookings</span>
          </div>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend iconSize={0} wrapperStyle={{ bottom: -10 }} />
          <Bar
            dataKey="totalRevenue"
            name="Total Revenue"
            fill="#82ca9d"
            barSize={30}
          />
          <Bar
            dataKey="totalBooking"
            name="Total Bookings"
            fill="#8884d8"
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </>
  );
};

export default RechartsBarChart;
