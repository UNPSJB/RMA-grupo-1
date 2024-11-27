import React from "react";
import { LoadingSpinner } from "../atoms";
import { Paginacion } from "../molecules";
import TablaDatosArchivo from "../molecules/TablaDatosArchivo";

const TableViewArchivos = ({
  data,
  loading,
  tipoDato,
  currentPage,
  onPageChange,
}) => {
  const itemsPerPage = data.pagination.limit || 25;
  const totalItems = data.pagination.total_items || 0;

  const handlePageChange = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div>
      <Paginacion
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <TablaDatosArchivo items={data.items} tipo={tipoDato} />
      )}
      <Paginacion
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default TableViewArchivos;