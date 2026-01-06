import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const QualityOfLifeChart = ({ dataValues, names }) => {
  const labels = [
    "سرزندگی اجتماعی",
    "دسترسی به خدمات شهری",
    "فضای سبز و آرامش",
    "امنیت",
    "کیفیت کالبدی محله",
    "ترافیک",
  ];

  const colors = [
    "#f28e2b",
    "#59a14f",
    "#4e79a7",
    "#e15759",
    "#76b7b2",
    "#edc948",
    "#b07aa1",
    "#1BA493",
    "#287271",
    "#F4A261",
    "#42047E",
    "#132a13",
 
    
   
  ];

  const chartData = labels.map((label, i) => {
    const entry = { subject: label, fullMark: 100 };
    names.forEach((name, index) => {
      entry[name] = dataValues[index]?.[i] ?? 0;
    });
    return entry;
  });

  const renderCustomTick = ({ payload, x, y, textAnchor }) => {
    const radiusOffset = 8;
    const angle = payload.coordinate * (Math.PI / 180);
    const adjustedX = x - Math.cos(angle) * radiusOffset;
    const adjustedY = y - Math.sin(angle) * radiusOffset;

    return (
      <text
        x={adjustedX}
        y={adjustedY}
        textAnchor={textAnchor}
        fontSize={13}
        fill="#2c3e50"
        fontWeight="500"
      >
        {payload.value}
      </text>
    );
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;

    const sortedPayload = [...payload].sort((a, b) => b.value - a.value);

    return (
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #ccc",
          padding: "10px",
          borderRadius: "5px",
          fontSize: 13,
          color: "#333",
        }}
      >
        <p style={{ marginBottom: 6, fontWeight: "bold" }}>{label}</p>
        {sortedPayload.map((entry) => (
          <p key={entry.dataKey} style={{ color: entry.color, margin: 0 }}>
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full h-full   mx-auto bg-white/50 backdrop-blur-md rounded-2xl shadow-xl p-6 g flex flex-col items-center">
      <h2 className="text-xl  md:text-2xl font-extrabold text-[var(--text)] text-center">
        مقایسه کیفیت زندگی در محله‌ها
      </h2>
      <ResponsiveContainer width="100%" height={450} > 
        <RadarChart cx="50%" cy="45%"  outerRadius="90%" data={chartData}>
          <PolarGrid stroke="#ccc" />
          <PolarAngleAxis dataKey="subject" tick={renderCustomTick} />
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={{ fontSize: 9 ,fontWeight:9}}
            textAnchor="end"
            
          />
          {names.map((name, index) => (
            <Radar
              key={name}
              name={name}
              dataKey={name}
              stroke={colors[index % colors.length]}
              fill={colors[index % colors.length]}
              fillOpacity={0.1}
              strokeWidth={2}
            />
          ))}
          <Tooltip content={<CustomTooltip /> } />
        

          <Legend wrapperStyle={{ fontSize: 14, marginTop:10}} />
        
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default QualityOfLifeChart;
