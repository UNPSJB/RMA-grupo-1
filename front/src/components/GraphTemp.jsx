import React from "react";

import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getMidnightTicks, tickFormatter } from "../utils-graphs";

/*
    El prop "data" debe tener la forma:
    {
        date (en ticks, obteniendose mediante el metodo getTime() de los objetos Date),
        nivel_hidrométrico (m),
        temperatura (ºC)
    }
*/

export default function GraphTemp({ data, syncId = 0 }) {
  const midnightTicks = getMidnightTicks(
    data[0].date,
    data[data.length - 1].date
  );

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart
        width={500}
        height={200}
        data={data}
        syncId={syncId}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          type="number"
          domain={["dataMin", "dataMax"]}
          tick={false}
          tickFormatter={tickFormatter}
        />
        <YAxis
          unit={"ºC"}
          data={data}
          ticks={[-10, 0, 10, 20, 30, 40]}
          domain={["dataMin", "dataMax"]}
        />
        <Line
          type="monotone"
          dataKey="temperatura"
          stroke="#ff5733"
          strokeWidth={3}
          dot={false}
        />
        {midnightTicks.map((tick) => {
          const fecha = new Date(tick);
          const fechaStr = fecha.getDate() + "/" + fecha.getMonth();
          return (
            <ReferenceLine key={tick} x={tick} stroke="gray">
              <Label value={fechaStr} position="insideBottomLeft" />
            </ReferenceLine>
          );
        })}
        <ReferenceLine
          key={0}
          y={0}
          stroke="gray"
          strokeDasharray={8}
        ></ReferenceLine>
        <Tooltip
          labelFormatter={() => ""}
          formatter={(value) => value + "°C"}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
