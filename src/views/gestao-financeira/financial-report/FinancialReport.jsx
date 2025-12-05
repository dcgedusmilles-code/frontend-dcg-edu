import React, { useState } from "react";
import {
  CCard,
  CCardHeader,
  CCardBody,
  CRow,
  CCol,
  CButton,
  CSpinner,
  CAlert,
} from "@coreui/react";

import RelatorioFiltro from "./RelatorioFiltro";
import KPIsFinanceiro from "./KPIsFinanceiro";
import TabelaFinanceiro from "./TabelaFinanceiro";
import Inadimplencia from "./Inadimplencia";

import relatorioService from "../../../services/relatorioService";

const FinancialReport = () => {
  const [filtros, setFiltros] = useState({
    periodo_inicio: "",
    periodo_fim: "",
    unidade_id: "",
    curso_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [relatorio, setRelatorio] = useState(null);
  const [erro, setErro] = useState("");

  const gerarRelatorio = async () => {
    setErro("");
    setLoading(true);
    try {
      const data = await relatorioService.gerar(filtros);
      setRelatorio(data);
    } catch (err) {
      setErro(err.message || "Erro ao gerar relatório");
    }
    setLoading(false);
  };

  return (
    <div className="p-4">
      <CCard className="mb-4">
        <CCardHeader>
          <h5>Relatório Financeiro</h5>
        </CCardHeader>
        <CCardBody>
          <RelatorioFiltro filtros={filtros} setFiltros={setFiltros} gerar={gerarRelatorio} />
          {loading && <CSpinner />}
          {erro && <CAlert color="danger">{erro}</CAlert>}
        </CCardBody>
      </CCard>

      {relatorio && (
        <>
          <KPIsFinanceiro kpis={relatorio.kpis} />
          <CCard className="mb-4">
            <CCardHeader>Receitas</CCardHeader>
            <CCardBody>
              <TabelaFinanceiro data={relatorio.detalhes.receitas} />
            </CCardBody>
          </CCard>

          <CCard className="mb-4">
            <CCardHeader>Despesas</CCardHeader>
            <CCardBody>
              <TabelaFinanceiro data={relatorio.detalhes.despesas} />
            </CCardBody>
          </CCard>

          <CCard className="mb-4">
            <CCardHeader>Contas a Receber</CCardHeader>
            <CCardBody>
              <TabelaFinanceiro data={relatorio.detalhes.contas_receber} />
            </CCardBody>
          </CCard>

          <CCard className="mb-4">
            <CCardHeader>Contas a Pagar</CCardHeader>
            <CCardBody>
              <TabelaFinanceiro data={relatorio.detalhes.contas_pagar} />
            </CCardBody>
          </CCard>

          <Inadimplencia dados={relatorio.inadimplencia} />
        </>
      )}
    </div>
  );
};

export default FinancialReport;
