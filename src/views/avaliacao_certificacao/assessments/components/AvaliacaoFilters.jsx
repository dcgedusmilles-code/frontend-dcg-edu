import React, { useState } from 'react'
import { CRow, CCol, CFormInput, CButton } from '@coreui/react'

export default function AvaliacaoFilters({ onFilter }) {
  const [titulo, setTitulo] = useState('')

  const aplicar = () => {
    onFilter({ titulo })
  }

  return (
    <CRow className="mb-3">
      <CCol md={4}>
        <CFormInput
          label="Título"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </CCol>
      <CCol md={2} className="d-flex align-items-end">
        <CButton color="secondary" onClick={aplicar}>
          Filtrar
        </CButton>
      </CCol>
    </CRow>
  )
}
