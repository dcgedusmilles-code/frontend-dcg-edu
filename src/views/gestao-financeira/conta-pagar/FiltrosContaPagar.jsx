import React, { useState } from 'react'
import { CButton, CFormInput } from '@coreui/react'

export default function FiltrosContaPagar({ onFilter }) {
  const [filters, setFilters] = useState({
    fornecedor: '',
    status: '',
  })

  const handleFilter = () => {
    if (onFilter) onFilter(filters)
  }

  return (
    <div className="d-flex gap-2 mb-3">
      <CFormInput
        placeholder="Fornecedor"
        value={filters.fornecedor}
        onChange={(e) => setFilters({ ...filters, fornecedor: e.target.value })}
      />

      <CFormInput
        placeholder="Status"
        value={filters.status}
        onChange={(e) => setFilters({ ...filters, status: e.target.value })}
      />

      <CButton color="primary" onClick={handleFilter}>
        Filtrar
      </CButton>
    </div>
  )
}
