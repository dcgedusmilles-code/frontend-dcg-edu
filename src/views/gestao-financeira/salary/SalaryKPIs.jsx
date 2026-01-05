// SalaryKPIs.jsx
import React from 'react'
import { CCard, CCardBody, CRow, CCol } from '@coreui/react'

const SalaryKPIs = ({ kpis }) => {
  if (!kpis) return null
  return (
    <CCard className="mb-4">
      <CCardBody>
        <CRow>
          <CCol md={3}>
            <strong>Total Bruto:</strong>
            <div>{kpis.totalBruto.toFixed(2)}</div>
          </CCol>
          <CCol md={3}>
            <strong>Benefícios:</strong>
            <div>{kpis.totalBeneficios.toFixed(2)}</div>
          </CCol>
          <CCol md={3}>
            <strong>Descontos:</strong>
            <div>{kpis.totalDescontos.toFixed(2)}</div>
          </CCol>
          <CCol md={3}>
            <strong>Valor Líquido:</strong>
            <div>{kpis.totalLiquido.toFixed(2)}</div>
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CCol>
            <strong>Salários pendentes:</strong> <span>{kpis.pendentes}</span>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default SalaryKPIs
