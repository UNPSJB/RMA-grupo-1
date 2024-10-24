import React from "react";
import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  Label,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  dateFormatter,
  getMidnightTicks,
  tickFormatter,
} from "../utils-graphs";

/*
    El prop "data" debe tener la forma:
    {
        date (en ticks, obteniendose mediante el metodo getTime() de los objetos Date),
        nivel_hidrometrico (m),
        temp (ºC)
    }
*/

export default function GraphNivel({ data, syncId, noBrush }) {
  if (!data || data.length === 0) return <div>No hay datos disponibles</div>;

  const midnightTicks = getMidnightTicks(
    data[0].date,
    data[data.length - 1].date
  );

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
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
          tickCount={7}
          type="number"
          domain={["dataMin", "dataMax"]}
          tick={false}
          tickFormatter={tickFormatter}
        />
        <YAxis unit={"m"} />
        {midnightTicks.map((tick) => {
          const fecha = new Date(tick);
          const fechaStr = fecha.getDate() + "/" + fecha.getMonth();
          return (
            <ReferenceLine key={tick} x={tick} stroke="gray">
              <Label value={fechaStr} position="insideBottomLeft" />
            </ReferenceLine>
          );
        })}
        <Tooltip
          labelFormatter={dateFormatter}
          formatter={(value) => value + "m"}
        />
        <Area
          type="linear"
          dataKey="nivel_hidrometrico"
          stroke="#8884d8"
          fill="#8884d8"
        />
        {!noBrush ? (
          <Brush
            height={30}
            stroke="#8884d8"
            travellerWidth={10}
            tickFormatter={(val) => dateFormatter(data[val].date)}
          />
        ) : null}
      </AreaChart>
    </ResponsiveContainer>
  );
}
