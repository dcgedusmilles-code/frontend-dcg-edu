// SalaryTable.jsx
import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
} from '@coreui/react'

const SalaryTable = ({ salaries = [], onAdjust, onPay, onHistory }) => {
  return (
    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Funcionário</CTableHeaderCell>
          <CTableHeaderCell>Salário Base</CTableHeaderCell>
          <CTableHeaderCell>Benefícios</CTableHeaderCell>
          <CTableHeaderCell>Descontos</CTableHeaderCell>
          <CTableHeaderCell>Valor Líquido</CTableHeaderCell>
          <CTableHeaderCell>Data Pagamento</CTableHeaderCell>
          <CTableHeaderCell>Status</CTableHeaderCell>
          <CTableHeaderCell>Ações</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        {salaries.map((s) => (
          <CTableRow key={s.id}>
            <CTableDataCell>{s.funcionario_nome || s.funcionario?.nome || '-'}</CTableDataCell>
            <CTableDataCell>{Number(s.salario_base || 0).toFixed(2)}</CTableDataCell>
            <CTableDataCell>{Number(s.beneficios || 0).toFixed(2)}</CTableDataCell>
            <CTableDataCell>{Number(s.descontos || 0).toFixed(2)}</CTableDataCell>
            <CTableDataCell>{Number(s.valor_liquido || 0).toFixed(2)}</CTableDataCell>
            <CTableDataCell>
              {s.data_pagamento ? new Date(s.data_pagamento).toLocaleDateString() : '-'}
            </CTableDataCell>
            <CTableDataCell>{s.data_pagamento ? 'Pago' : 'Pendente'}</CTableDataCell>
            <CTableDataCell>
              <CButton color="warning" size="sm" onClick={() => onAdjust(s)}>
                Descontos
              </CButton>{' '}
              <CButton color="info" size="sm" onClick={() => onHistory(s.funcionario)}>
                Histórico
              </CButton>{' '}
              {!s.data_pagamento && (
                <CButton color="success" size="sm" onClick={() => onPay(s)}>
                  Pagar
                </CButton>
              )}
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}

export default SalaryTable
