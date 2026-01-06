import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
  Legend,
} from "recharts";

const colors = [
  "#FB8500",
  "#E63946",
  "#EC9A9A",
  "#A8DADC",
  "#8E44AD",
  "#F1FAEE",
  "#1D3557",
  "#457B9D",
  "#3498DB",
  "#FFB703",
  "#2ECC71",
];

const AccsessesKyfiatMabar = () => {
  const [chartData, setChartData] = useState([]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const arz = label;
      const tedad = payload[0].value;

      return (
        <div className="bg-white/80 backdrop-blur-md p-2 rounded shadow text-base font-[Modam]">
          <p>امتیاز معبر: {arz}</p>
          <p>تعداد: {tedad}</p>
        </div>
      );
    }

    return null;
  };

  useEffect(() => {
    fetch("./data/keymabar.xlsx")
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => {
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        const rawData = jsonData.filter(
          (row) =>
            row["condition"] &&
            row["FREQUENCY"] &&
            !isNaN(parseFloat(row["condition"])) &&
            !isNaN(parseFloat(row["FREQUENCY"]))
        );

        const maxCondition = Math.max(
          ...rawData.map((row) => parseFloat(row["condition"]))
        );

        const binnedData = rawData.map((row) => {
          const normalized =
            (parseFloat(row["condition"]) / maxCondition) * 10;
          const bin = Math.min(10, Math.floor(normalized));
          return {
            bin: bin,
            frequency: parseFloat(row["FREQUENCY"]),
          };
        });

        const frequencyByBin = Array.from({ length: 11 }, (_, i) => ({
          bin: i.toString(),
          frequency: 0,
        }));

        binnedData.forEach(({ bin, frequency }) => {
          frequencyByBin[parseInt(bin)].frequency += frequency;
        });

        const finalData = frequencyByBin.map((item, i) => ({
          ...item,
          color: colors[i % colors.length],
        }));

        setChartData(finalData);
      });
  }, []);

  return (
    <div
      className="h-full w-full font-modam text-lg"
      style={{ width: "90%", fontFamily: "Modam" }}
    >
      <h2
        className="text-base mb-5"
        style={{
          textAlign: "center",
          color: "var(--text)",
          fontWeight: "bold",
        }}
      >
        نمودار کیفیت معابر محله
      </h2>

      <ResponsiveContainer width="110%" height={230} >
        <BarChart data={chartData}>
          <XAxis
            type="number"
            domain={[0, 10]}
            ticks={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            dataKey="bin"
            tick={{ fontSize: 14, fontFamily: "Modam" }}
          />
          <YAxis
            label={{
              value: "تعداد",
              angle: -90,
              position: "insideLeft",
              style: { textAnchor: "start", fontFamily: "Modam", fontSize: 14 },
            }}
            type="number"
            tick={{ fontSize: 14, fontFamily: "Modam", textAnchor: "start" }}
          />
          <Tooltip
            wrapperStyle={{ fontFamily: "Modam" }}
            content={<CustomTooltip />}
          />
          <Legend
            content={() => (
              <div className="w-full text-center h-full  ">
                <span className="text-base">امتیاز معبر</span>
              </div>
            )}
          />
          <Bar dataKey="frequency" name="تعداد">
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AccsessesKyfiatMabar;
