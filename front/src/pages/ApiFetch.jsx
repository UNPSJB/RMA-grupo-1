import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import TablaDatos from "../components/TablaDatos";

const api = import.meta.env.VITE_API_URL;

export default function ApiFetch({ initialSensorId }) {
  const [items, setItems] = useState([]);
  const [sensorId, setSensorId] = useState(initialSensorId || ""); // Si ya hay un sensor, lo usa
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const limit = 10;

  useEffect(() => {
    const fetchData = async () => {
      const offset = limit;
      try {
        let url = `${api}/paquetes?limit=${limit}`;

        if (sensorId) {
          url += `&sensor_id=${sensorId}`;
        }
        if (startDate) {
          url += `&start_date=${encodeURIComponent(startDate)}`;
        }
        if (endDate) {
          url += `&end_date=${encodeURIComponent(endDate)}`;
        }

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Error en la solicitud a API");
        }
        const data = await response.json();
        setItems(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [sensorId, startDate, endDate]);

  return (
    <div className="container mt-2">
      <div className="mb-3">
        {/* Solo muestra el filtro por sensor si no viene un sensorId predefinido */}
        {!initialSensorId && (
          <>
            <label className="form-label">
              <strong>Filtrar por ID Sensor</strong>
            </label>
            <input
              type="int"
              value={sensorId}
              onChange={(e) => setSensorId(e.target.value)}
              className="form-control mt-2"
            />
          </>
        )}

        <label className="form-label mt-3">
          <strong>Desde</strong>
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="form-control mt-2"
        />

        <label className="form-label mt-3">
          <strong>Hasta</strong>
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="form-control mt-2"
        />
      </div>

      <TablaDatos items={items} />
    </div>
  );
}
