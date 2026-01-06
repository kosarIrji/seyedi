import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

// جایگزین موقتی Card و CardContent
const Card = ({ children, className }) => (
  <div
    className={`  h-full w-full  ${className}`}
  >
    {children}
  </div>
);


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const arz = label;
    const tedad = payload[0].value;

    return (
      <div className="bg-white/80 backdrop-blur-md p-2 rounded shadow text-base font-[Modam]">
        <p>عرض معبر: {arz}</p>
        <p>تعداد: {tedad}</p>
      </div>
    );
  }

  return null;
};

const CardContent = ({ children }) => (
  <div className="space-y-3">{children}</div>
);

// آرایه رنگ‌ها
const COLORS = [
  "#90E0EF",
  "#48CAE4",
  "#00B4D8",
  "#0096C7",
  "#0077B6",
  "#023E8A",
];

const AccsessesArzeMabar = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("./data/arz_mabar.xlsx")
      .then((res) => res.arrayBuffer())
      .then((buffer) => {
        const workbook = XLSX.read(buffer, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(sheet, { defval: null });

        const formatted = json
          .map((row) => {
            const arzRaw = row["عرض معبر"] || row["Width"] || row["عرض"];
            const tedadRaw =
              row["تعداد"] || row["FREQUENCY"] || row["تعداد عرض"];

            const arz = parseFloat(arzRaw);
            const tedad = parseInt(tedadRaw);

            return { arz, tedad };
          })
          .filter((row) => !isNaN(row.arz) && !isNaN(row.tedad));

        setData(formatted);
      });
  }, []);

  return (
    <div className="text-lg h-full ">
      <Card>
        <CardContent>
          <h2 className="text-base font-bold  text-[var(--text)] mb-5 mt-5 text-center">
            نمودار تعداد بر اساس عرض معبر
          </h2>
          <ResponsiveContainer width="100%" height={230}>
            <BarChart data={data}>
              <XAxis
                dataKey="arz"
                textAnchor="start"
                interval={0}
                height={10}
                
                label={{
                  position: "insideBottom",
                  offset: -1,
                  style: {
                    textAnchor: "start",
                    fontFamily: "Modam",
                    fontSize: 15,
                    
                  },
                }}
                tick={{ fontSize: 13, fontFamily: "Modam" }}
              />
              <YAxis
                label={{
                  value: "تعداد",
                  angle: -90,
                  position: "insideLeft",
                  style: {
                    textAnchor: "start",
                    fontFamily: "Modam",
                    fontSize: 15,
                  },
                }}
                tick={{
                  textAnchor: "satrt",
                  fontSize: 14,
                  fontFamily: "Modam",
                }}
              />
              <Tooltip wrapperStyle={{ fontFamily: "Modam" }} content={<CustomTooltip />}/>
              <Legend
                content={() => (
                  <div className="w-full text-center h-full">
                    <span className="text-base ">عرض معبر</span>
                  </div>
                )}
              />
              <Bar dataKey="tedad" name="تعداد">
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index} `}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccsessesArzeMabar;
