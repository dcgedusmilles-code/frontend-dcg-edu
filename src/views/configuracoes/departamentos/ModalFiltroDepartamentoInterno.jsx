import React, { useState } from 'react'
import { CRow, CCol, CButton, CFormInput, CFormSelect } from '@coreui/react'

const ModalFiltroDepartamentoInterno = ({ onFiltrar }) => {
  const [filters, setFilters] = useState({
    perPage: 10,
    nome: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onFiltrar?.(filters)
  }

  return (
    <CRow className="align-items-end g-3 mb-3">
      <CCol md={3}>
        <CFormInput
          name="nome"
          label="Nome"
          value={filters.nome}
          onChange={handleChange}
          placeholder="Pesquisar por nome..."
        />
      </CCol>

      <CCol md={2}>
        <CFormSelect
          name="perPage"
          label="Itens por página"
          value={filters.perPage}
          onChange={handleChange}
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
        </CFormSelect>
      </CCol>

      <CCol md={2}>
        <CButton color="primary" onClick={handleSubmit}>
          Filtrar
        </CButton>
      </CCol>
    </CRow>
  )
}

export default ModalFiltroDepartamentoInterno
