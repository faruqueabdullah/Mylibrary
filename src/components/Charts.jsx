import { Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";

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
  return (
    <div>
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
        <XAxis dataKey="name" />
        <YAxis width="auto" />
        <Tooltip
          contentStyle={{padding:"2px" }}
          labelStyle={{ display: "none" }}
        />

        <Line type="monotone" dataKey="borrowed" stroke="#4ADE80" />
        <Line type="monotone" dataKey="retuned" stroke="#F87171"  />
      </LineChart>
    </div>
  );
}
