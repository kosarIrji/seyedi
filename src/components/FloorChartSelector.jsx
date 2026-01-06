import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = [
  "#4e79a7",
  "#f28e2b",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#edc948",
  "#b07aa1",
];

export default function EnhancedFloorChart({ chartType }) {
  const [data, setData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadExcel = async () => {
      try {
        const response = await fetch("./data/tdad_tbqe.xlsx");
        if (!response.ok) throw new Error("خطا در دریافت فایل");

        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const chartData = jsonData
          .map((row) => ({
            name: String(row["طبقات"] ?? "نامشخص"),
            تعداد: Number(row["تعداد"] ?? 0),
          }))
          .filter((item) => !isNaN(item.تعداد));

        setData(chartData);
        setLoading(false);
      } catch (err) {
        console.error("خطا:", err);
        setLoading(false);
      }
    };

    loadExcel();
  }, []);

  const renderChart = () => {
    if (data.length === 0)
      return (
        <div className="no-data-message">داده‌ای برای نمایش وجود ندارد</div>
      );

    switch (chartType) {
      case "bar":
        return (
          <BarChart data={data} margin={{ top: 10, bottom: 10 ,left:30,right:30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="start"
              interval={0}
              height={60}
            />
            <YAxis  width={10}  tick={{ textAnchor: "satrt", fontSize: 13 }} />
            <Tooltip
              contentStyle={{
                fontFamily: "Modam",
                direction: "ltr",
                textAlign: "left",
              }}
              formatter={(value) => [`${value} واحد`, "تعداد"]}
            />
            <Legend layout="horizontal" verticalAlign="bottom"  />
            <Bar
              dataKey="تعداد"
              name="تعداد واحدها"
              barSize={25}
              radius={[4, 4, 0, 0]}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        );
      case "line":
        return (
          <LineChart data={data} margin={{ top: 10, bottom: 10, left: 20,right:20, }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="start"
              interval={0}
              height={80}
            />
            <YAxis width={10} tick={{ textAnchor: "satrt", fontSize: 13 }} />
            <Tooltip
              contentStyle={{
                fontFamily: "Modam",
                direction: "rtl",
                textAlign: "right",
              }}
              formatter={(value) => [`${value} واحد`, "تعداد"]}
            />
            <Legend wrapperStyle={{ direction: "rtl" ,paddingTop:"10px"}} />
            <Line
              type="monotone"
              dataKey="تعداد"
              name="تعداد واحدها"
              stroke="var(--text)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        );
      case "pie":
        return (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="تعداد"
              nameKey="name"
              label
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(value) => `${value} واحد`}
              contentStyle={{
                fontFamily: "Modam",
                direction: "rtl",
                textAlign: "right",
              }}
            />
            <Legend
              wrapperStyle={{ direction: "rtl" }}
              layout="horizontal"
              verticalAlign="bottom"
            />
          </PieChart>
        );
      default:
        return null;
    }
  };

  return (
    <div className="chart-container w-full">
      <div className="chart-header ">
        <h2 className="text-lg font-bold text-[var(--text)] mb-5 mt-5 text-center">نمودار اطلاعات طبقات</h2>
      </div>

      {loading ? (
        <div className="loading-message">در حال بارگذاری داده‌ها...</div>
      ) : (
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={350}>
            {renderChart()}
          </ResponsiveContainer>
        </div>
      )}

      
    </div>
  );
}
