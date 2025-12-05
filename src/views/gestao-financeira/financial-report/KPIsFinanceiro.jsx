import React from "react";
import { CCard, CCardBody, CRow, CCol } from "@coreui/react";

const KPIsFinanceiro = ({ kpis }) => {
  return (
    <CCard className="mb-4">
      <CCardBody>
        <CRow className="text-center">
          <CCol md={4}>
            <strong>Receita Total:</strong> {kpis.receita_total} Kz
          </CCol>
          <CCol md={4}>
            <strong>Despesas Totais:</strong> {kpis.despesas_totais} Kz
          </CCol>
          <CCol md={4}>
            <strong>Lucro:</strong> {kpis.lucro} Kz
          </CCol>
          <CCol md={4} className="mt-2">
            <strong>Margem de Lucro:</strong> {kpis.margem_lucro_percentual}%
          </CCol>
          <CCol md={4} className="mt-2">
            <strong>Contas a Receber Pendentes:</strong> {kpis.contas_receber_pendentes} Kz
          </CCol>
          <CCol md={4} className="mt-2">
            <strong>Contas a Pagar Pendentes:</strong> {kpis.contas_pagar_pendentes} Kz
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  );
};

export default KPIsFinanceiro;
