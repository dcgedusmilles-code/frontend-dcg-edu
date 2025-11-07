import React, { useState } from 'react'
import { CRow, CCol, CFormSelect, CFormInput, CButton } from '@coreui/react'

const ModalFiltrosCalendario = ({ onFiltrar }) => {
  const [filters, setFilters] = useState({
    ano_letivo: '',
    semestre: '',
    startDate: '',
    endDate: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onFiltrar?.(filters)
  }

  const handleClear = () => {
    setFilters({
      ano_letivo: '',
      semestre: '',
      startDate: '',
      endDate: '',
    })
    onFiltrar?.({})
  }

  return (
    <CRow className="mb-3 g-2 align-items-end">

      {/* Ano Letivo */}
      <CCol md={2}>
        <CFormInput
          type="number"
          name="ano_letivo"
          value={filters.ano_letivo}
          onChange={handleChange}
          placeholder="Ano Letivo"
        />
      </CCol>

      {/* Semestre */}
      <CCol md={2}>
        <CFormSelect name="semestre" value={filters.semestre} onChange={handleChange}>
          <option value="">Semestre</option>
          <option value="1">1º Semestre</option>
          <option value="2">2º Semestre</option>
        </CFormSelect>
      </CCol>

      {/* Data Início */}
      <CCol md={2}>
        <CFormInput
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
        />
      </CCol>

      {/* Data Fim */}
      <CCol md={2}>
        <CFormInput
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
        />
      </CCol>

      {/* Botão Filtrar */}
      <CCol md={2}>
        <CButton color="primary" className="w-100" onClick={handleSubmit}>
          <i className="fa fa-search me-1" />
          Filtrar
        </CButton>
      </CCol>

      {/* Botão Limpar */}
      <CCol md={2}>
        <CButton color="secondary" className="w-100" onClick={handleClear}>
          Limpar
        </CButton>
      </CCol>

    </CRow>
  )
}

export default ModalFiltrosCalendario
