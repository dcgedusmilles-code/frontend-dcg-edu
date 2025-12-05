import React from "react";
import { CTable, CTableHead, CTableBody, CTableRow, CTableHeaderCell, CTableDataCell } from "@coreui/react";

const TabelaFinanceiro = ({ data }) => {
  if (!data || data.length === 0) return <p className="text-muted">Sem dados para exibir.</p>;

  const columns = Object.keys(data[0]);

  return (
    <CTable striped hover responsive>
      <CTableHead>
        <CTableRow>
          {columns.map((col, i) => (
            <CTableHeaderCell key={i}>{col}</CTableHeaderCell>
          ))}
        </CTableRow>
      </CTableHead>

      <CTableBody>
        {data.map((row, i) => (
          <CTableRow key={i}>
            {columns.map((col, j) => (
              <CTableDataCell key={j}>{String(row[col])}</CTableDataCell>
            ))}
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  );
};

export default TabelaFinanceiro;
