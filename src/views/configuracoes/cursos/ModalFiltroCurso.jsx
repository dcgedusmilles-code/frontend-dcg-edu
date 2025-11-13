import React, { useState } from 'react'
import { CRow, CCol, CButton, CFormInput, CFormSelect } from '@coreui/react'

const ModalFiltroCurso = ({ onFiltrar, coordenadores = [] }) => {
  const [filters, setFilters] = useState({
    perPage: 10,
    titulo: '',
    coordenador_id: '',
    modalidade: '',
    nivel: '',
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
          label="Título"
          name="titulo"
          value={filters.titulo}
          onChange={handleChange}
          placeholder="Pesquisar por título..."
        />
      </CCol>

      <CCol md={3}>
        <CFormSelect
          label="Coordenador"
          name="coordenador_id"
          value={filters.coordenador_id}
          onChange={handleChange}
        >
          <option value="">Todos</option>
          {coordenadores.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </CFormSelect>
      </CCol>

      <CCol md={2}>
        <CFormSelect
          label="Modalidade"
          name="modalidade"
          value={filters.modalidade}
          onChange={handleChange}
        >
          <option value="">Todas</option>
          <option value="Presencial">Presencial</option>
          <option value="Online">Online</option>
          <option value="Híbrido">Híbrido</option>
        </CFormSelect>
      </CCol>

      <CCol md={2}>
        <CFormSelect label="Nível" name="nivel" value={filters.nivel} onChange={handleChange}>
          <option value="">Todos</option>
          <option value="Básico">Básico</option>
          <option value="Intermediário">Intermediário</option>
          <option value="Avançado">Avançado</option>
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

export default ModalFiltroCurso
