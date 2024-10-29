import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

const api = import.meta.env.VITE_API_URL;

export default function FiltrosFetch({ initialSensorId, setData, totalItems }) {
  const [items, setItems] = useState([]);
  const [sensorId, setSensorId] = useState(initialSensorId || "");
  const [startDate, setStartDate] = useState(
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 7)
      .toISOString()
      .substring(0, 10)
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [applyFilters, setApplyFilters] = useState(false);

  const handleApplyFilters = () => {
    setApplyFilters(true);
  };

  useEffect(() => {
    if (!applyFilters) return;

    const fetchData = async () => {
      try {
        let url = `${api}/paquetes?sensor_id=${sensorId}`;

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
        setData(data);
        totalItems = data.length;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setApplyFilters(false); // Restablece el estado después de aplicar los filtros
      }
    };

    fetchData();
  }, [applyFilters, sensorId, startDate, endDate, api, setData]);

  return (
    <div className="container mt-1">
      <div className="mb-3 d-flex align-items-center">
        {!initialSensorId && (
          <>
            <label className="form-label me-2 mb-0">
              <strong>ID Sensor</strong>
            </label>
            <select
              value={sensorId}
              onChange={(e) => setSensorId(e.target.value)}
              className="form-control form-control-sm d-inline-block me-3"
              style={{ width: "80px" }}
            >
              <option value="">Seleccionar</option>
              {/* {items.map((node) => (
                <option key={node.id} value={node.id}>
                  {node.id} 
                </option>
              ))} */}
            </select>
          </>
        )}

        <label className="form-label me-2 mb-0">
          <strong>Desde</strong>
        </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="form-control form-control-sm d-inline-block me-3"
          style={{ width: "130px" }}
        />

        <label className="form-label me-2 mb-0">
          <strong>Hasta</strong>
        </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="form-control form-control-sm d-inline-block"
          style={{ width: "130px" }}
        />

        <button
          className="btn btn-primary btn-sm ms-3"
          onClick={handleApplyFilters}
        >
          Aplicar Filtro{" "}
        </button>
      </div>
    </div>
  );
}