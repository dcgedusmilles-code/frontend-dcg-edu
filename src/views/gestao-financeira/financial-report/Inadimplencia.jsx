import React from "react";
import { CCard, CCardHeader, CCardBody } from "@coreui/react";
import TabelaFinanceiro from "./TabelaFinanceiro";

const Inadimplencia = ({ dados }) => {
  return (
    <>
      <CCard className="mb-4">
        <CCardHeader>Contas a Receber Vencidas</CCardHeader>
        <CCardBody>
          <TabelaFinanceiro data={dados.contas_receber_vencidas} />
        </CCardBody>
      </CCard>

      <CCard className="mb-4">
        <CCardHeader>Contas a Pagar Vencidas</CCardHeader>
        <CCardBody>
          <TabelaFinanceiro data={dados.contas_pagar_vencidas} />
        </CCardBody>
      </CCard>
    </>
  );
};

export default Inadimplencia;
