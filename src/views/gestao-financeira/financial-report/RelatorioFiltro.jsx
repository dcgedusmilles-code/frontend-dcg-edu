import React from "react";
import { CRow, CCol, CFormInput, CFormSelect, CButton } from "@coreui/react";

const RelatorioFiltro = ({ filtros, setFiltros, gerar }) => {
  const handleChange = (e) => {
    setFiltros({ ...filtros, [e.target.name]: e.target.value });
  };

  return (
    <CRow className="mb-3 g-3 align-items-end">
      <CCol md={3}>
        <CFormInput
          type="date"
          label="Período Início"
          name="periodo_inicio"
          value={filtros.periodo_inicio}
          onChange={handleChange}
        />
      </CCol>
      <CCol md={3}>
        <CFormInput
          type="date"
          label="Período Fim"
          name="periodo_fim"
          value={filtros.periodo_fim}
          onChange={handleChange}
        />
      </CCol>
      <CCol md={3}>
        <CFormInput
          label="Unidade ID"
          name="unidade_id"
          value={filtros.unidade_id}
          onChange={handleChange}
        />
      </CCol>
      <CCol md={3}>
        <CFormInput
          label="Curso ID"
          name="curso_id"
          value={filtros.curso_id}
          onChange={handleChange}
        />
      </CCol>
      <CCol xs={12}>
        <CButton color="primary" onClick={gerar}>
          Gerar Relatório
        </CButton>
      </CCol>
    </CRow>
  );
};

export default RelatorioFiltro;
