// SalaryFilters.jsx
import React from 'react'
import { CRow, CCol, CFormSelect, CFormInput } from '@coreui/react'

const SalaryFilters = ({ filters, setFilters, employees = [] }) => {
  const months = Array.from({ length: 12 }, (_, i) => i + 1)

  return (
    <CRow className="g-3 align-items-end">
      <CCol md={3}>
        <CFormSelect
          value={filters.month}
          onChange={(e) => setFilters({ ...filters, month: Number(e.target.value) })}
        >
          {months.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </CFormSelect>
      </CCol>
      <CCol md={3}>
        <CFormInput
          type="number"
          value={filters.year}
          onChange={(e) => setFilters({ ...filters, year: Number(e.target.value) })}
        />
      </CCol>
      <CCol md={3}>
        <CFormSelect
          value={filters.funcionario_id}
          onChange={(e) => setFilters({ ...filters, funcionario_id: e.target.value })}
        >
          <option value="">Todos Funcionários</option>
          {employees.map((emp) => (
            <option key={emp.id} value={emp.id}>
              {emp.nome}
            </option>
          ))}
        </CFormSelect>
      </CCol>
      <CCol md={3}>
        <CFormSelect
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
        >
          <option value="">Todos Status</option>
          <option value="paid">Pago</option>
          <option value="pending">Pendente</option>
        </CFormSelect>
      </CCol>
    </CRow>
  )
}

export default SalaryFilters
