import React, { useState } from 'react'
import { CRow, CCol, CFormInput, CButton } from '@coreui/react'

export default function CriterioFilters({ onFilter }) {
  const [descricao, setDescricao] = useState('')

  return (
    <CRow className="mb-3">
      <CCol md={4}>
        <CFormInput
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </CCol>

      <CCol md={2} className="d-flex align-items-end">
        <CButton color="secondary" onClick={() => onFilter({ descricao })}>
          Filtrar
        </CButton>
      </CCol>
    </CRow>
  )
}
