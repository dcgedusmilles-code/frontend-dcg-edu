import React, { useEffect, useState } from "react";
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CButton,
  CSpinner,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from "@coreui/react";

import salarioFuncionarioService from "../../../services/salarioFuncionarioService";
import ModalSalarioFuncionarioFiltro from "./ModalSalarioFuncionarioFiltro";
import ModalSalarioFuncionarioCreate from "./ModalSalarioFuncionarioCreate";

const SalarioFuncionario = () => {
  const [salarios, setSalarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showFilter, setShowFilter] = useState(false);
  const [showCreate, setShowCreate] = useState(false);

  const [filters, setFilters] = useState({
    funcionario: "",
    mes: "",
    ano: "",
  });

  const loadSalarios = async () => {
    try {
      setLoading(true);
      const data = await salarioFuncionarioService.listar(filters);
      setSalarios(data);
    } catch (error) {
      console.error("Erro ao carregar salários:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSalarios();
  }, [filters]);

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="fw-bold">Gestão de Salários dos Funcionários</h5>
              <div className="d-flex gap-2">
                <CButton color="secondary" onClick={() => setShowFilter(true)}>
                  Filtrar
                </CButton>

                <CButton color="primary" onClick={() => setShowCreate(true)}>
                  Registrar Pagamento
                </CButton>
              </div>
            </div>
          </CCardHeader>

          <CCardBody>
            {loading ? (
              <div className="text-center p-3">
                <CSpinner />
              </div>
            ) : (
              <CTable bordered hover responsive>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Funcionário</CTableHeaderCell>
                    <CTableHeaderCell>Salário Base</CTableHeaderCell>
                    <CTableHeaderCell>Benefícios</CTableHeaderCell>
                    <CTableHeaderCell>Descontos</CTableHeaderCell>
                    <CTableHeaderCell>Valor Líquido</CTableHeaderCell>
                    <CTableHeaderCell>Data Pagamento</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {salarios.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell colSpan={7} className="text-center">
                        Nenhum registro encontrado
                      </CTableDataCell>
                    </CTableRow>
                  ) : (
                    salarios.map((s) => (
                      <CTableRow key={s.id}>
                        <CTableDataCell>{s.id}</CTableDataCell>
                        <CTableDataCell>{s.funcionario?.nome}</CTableDataCell>
                        <CTableDataCell>{s.salario_base} AOA</CTableDataCell>
                        <CTableDataCell>{s.beneficios} AOA</CTableDataCell>
                        <CTableDataCell>{s.descontos} AOA</CTableDataCell>
                        <CTableDataCell>{s.valor_liquido} AOA</CTableDataCell>
                        <CTableDataCell>
                          {new Date(s.data_pagamento).toLocaleDateString()}
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  )}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modals */}
      <ModalSalarioFuncionarioFiltro
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <ModalSalarioFuncionarioCreate
        visible={showCreate}
        onClose={() => setShowCreate(false)}
        refresh={loadSalarios}
      />
    </CRow>
  );
};

export default SalarioFuncionario;
