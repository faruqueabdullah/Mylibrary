import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { UseThemeContext } from "../Context/ThemeProvider";

export default function Charts() {
  const data = [
    {
      name: "Sun",
      retuned: 40,
      borrowed: 24,
    },
    {
      name: "Mon",
      retuned: 30,
      borrowed: 13,
    },
    {
      name: "Tue",
      retuned: 20,
      borrowed: 98,
    },
    {
      name: "Wed",
      retuned: 27,
      borrowed: 39,
    },
    {
      name: "Thu",
      retuned: 18,
      borrowed: 48,
    },
    {
      name: "Fri",
      retuned: 23,
      borrowed: 38,
    },
    {
      name: "Sat",
      retuned: 34,
      borrowed: 43,
    },
  ];

  const { theme } = UseThemeContext();

  return (
    <div
      className={`${theme ? "bg-softdark text-softwhite" : "bg-softwhite text-softdark"} p-5 rounded-sm`}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Check-out Statistics</h3>
        <div className="flex gap-5">
          <div className="flex gap-1 items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-green-400"></span>
            Borrowed
          </div>
          <div className="flex gap-1 items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-red-400"></span>
            Returned
          </div>
        </div>
      </div>
      <LineChart
        style={{
          width: "100%",
          maxWidth: "700px",
          maxHeight: "60vh",
          aspectRatio: 1.618,
        }}
        responsive
        data={data}
        margin={{
          top: 30,
          right: 10,
          left: 10,
        }}
      >
        <XAxis
          dataKey="name"
          axisLine={{
            stroke: theme ? "#9CA3AF" : "#374151",
          }}
          tickLine={{
            stroke: theme ? "#9CA3AF" : "#374151",
          }}
          tick={{
            fill: theme ? "#F9FAFB" : "#111827",
          }}
        />
        <YAxis
          width="auto"
          axisLine={{
            stroke: theme ? "#9CA3AF" : "#374151",
          }}
          tickLine={{
            stroke: theme ? "#9CA3AF" : "#374151",
          }}
          tick={{
            fill: theme ? "#F9FAFB" : "#111827",
          }}
        />
        <Tooltip
          contentStyle={{
            padding: "2px",
            backgroundColor: theme ? "#1F2937" : "#FFFFFF",
            border: "none",
            color: theme ? "white" : "black",
            boxShadow: "0px 4px 12px rgba(0,0,0,0.15)"
          }}
          labelStyle={{ display: "none" }}
        />

        <Line type="monotone" dataKey="borrowed" stroke="#4ADE80" />
        <Line type="monotone" dataKey="retuned" stroke="#F87171" />
      </LineChart>
    </div>
  );
}
