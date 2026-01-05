// ModalSalaryHistory.jsx
import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'
import { getSalaryHistory } from '../../services/salaryService'

const ModalSalaryHistory = ({ isOpen, onClose, employee }) => {
  const [history, setHistory] = useState([])

  useEffect(() => {
    if (!isOpen || !employee) return
    ;(async () => {
      const data = await getSalaryHistory(employee.id)
      setHistory(data)
    })()
  }, [isOpen, employee])

  if (!isOpen || !employee) return null

  return (
    <CModal visible={isOpen} onClose={onClose} size="lg">
      <CModalHeader>
        <CModalTitle>Histórico de Salários — {employee.nome}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Data Pagamento</CTableHeaderCell>
              <CTableHeaderCell>Salário Base</CTableHeaderCell>
              <CTableHeaderCell>Descontos</CTableHeaderCell>
              <CTableHeaderCell>Valor Líquido</CTableHeaderCell>
              <CTableHeaderCell>Observação</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {history.map((h) => (
              <CTableRow key={h.id}>
                <CTableDataCell>
                  {h.data_pagamento ? new Date(h.data_pagamento).toLocaleDateString() : '-'}
                </CTableDataCell>
                <CTableDataCell>{Number(h.salario_base || 0).toFixed(2)}</CTableDataCell>
                <CTableDataCell>{Number(h.descontos || 0).toFixed(2)}</CTableDataCell>
                <CTableDataCell>{Number(h.valor_liquido || 0).toFixed(2)}</CTableDataCell>
                <CTableDataCell>{h.observacao || '-'}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Fechar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalSalaryHistory
