import React, { useState } from 'react'
import { CModal, CModalBody, CModalHeader, CModalFooter, CButton, CFormSelect } from '@coreui/react'

const ModalFiltrosTurma = ({ cursos, coordenadores, onFiltrar }) => {
  const [visible, setVisible] = useState(false)
  const [filters, setFilters] = useState({})

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const aplicar = () => {
    onFiltrar(filters)
    setVisible(false)
  }

  return (
    <>
      <CButton color="info" className="mb-3" onClick={() => setVisible(true)}>Filtros</CButton>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader closeButton>Filtros de Turmas</CModalHeader>
        <CModalBody>
          <CFormSelect className="mb-3" name="curso_id" label="Curso" onChange={handleChange}>
            <option value="">Todos</option>
            {cursos.map((c) => (
              <option key={c.id} value={c.id}>{c.titulo}</option>
            ))}
          </CFormSelect>

          <CFormSelect className="mb-3" name="coordenador_id" label="Coordenador" onChange={handleChange}>
            <option value="">Todos</option>
            {coordenadores.map((c) => (
              <option key={c.id} value={c.id}>{c.nome}</option>
            ))}
          </CFormSelect>
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>Cancelar</CButton>
          <CButton color="primary" onClick={aplicar}>Aplicar</CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalFiltrosTurma
