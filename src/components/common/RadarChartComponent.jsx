import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
  Tooltip
} from "recharts";
export const RadarChartComponent = ({ competencies, height = 340 }) => {
  const representativeKeys = [
    "Sampling",
    "Survey Design",
    "Data Quality Frameworks",
    "Python",
    "SQL",
    "AI & Machine Learning",
    "Cloud Computing",
    "GIS & Spatial Analytics",
    "Data Privacy & DPDP Act",
    "Ethics & Integrity",
    "Leadership",
    "Communication"
  ];
  const chartData = representativeKeys.map((name) => {
    const comp = competencies.find((c) => c.name.toLowerCase().includes(name.toLowerCase().split(" ")[0]));
    return {
      subject: name.replace(" & Machine Learning", "/ML").replace(" & Spatial Analytics", "").replace(" & DPDP Act", "").replace(" Frameworks", "").replace(" & Integrity", ""),
      current: comp?.currentScore ?? 50,
      required: comp?.requiredScore ?? 75,
      fullMark: 100
    };
  });
  return <div className="w-full flex flex-col items-center justify-center">
      <ResponsiveContainer width="100%" height={height}>
        <RadarChart data={chartData} margin={{ top: 10, right: 30, bottom: 10, left: 30 }}>
          <PolarGrid stroke="#cbd5e1" strokeDasharray="3 3" />
          <PolarAngleAxis
    dataKey="subject"
    tick={{ fill: "#334155", fontSize: 11, fontWeight: 500 }}
  />
          <PolarRadiusAxis
    angle={30}
    domain={[0, 100]}
    tick={{ fill: "#64748b", fontSize: 10 }}
  />
          <Radar
    name="Current Score (%)"
    dataKey="current"
    stroke="#2563eb"
    fill="#3b82f6"
    fillOpacity={0.45}
    strokeWidth={2}
  />
          <Radar
    name="Required Benchmark (%)"
    dataKey="required"
    stroke="#ea580c"
    fill="#f97316"
    fillOpacity={0.15}
    strokeWidth={2}
    strokeDasharray="4 4"
  />
          <Tooltip
    contentStyle={{
      backgroundColor: "#0f172a",
      color: "#fff",
      borderRadius: "8px",
      fontSize: "12px",
      border: "1px solid #334155"
    }}
  />
          <Legend
    wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }}
  />
        </RadarChart>
      </ResponsiveContainer>
    </div>;
};
