import React, { useState } from 'react'
import {
  CButton,
  CCol,
  CForm,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
} from '@coreui/react'

const ModalFiltrosDisciplina = ({ cursos, onFiltrar }) => {
  const [visible, setVisible] = useState(false)
  const [filters, setFilters] = useState({
    nome: '',
    curso_id: '',
  })

  const handleChange = (e) =>
    setFilters({ ...filters, [e.target.name]: e.target.value })

  return (
    <>
      <CButton color="dark" onClick={() => setVisible(true)} className="mb-3">
        Filtros
      </CButton>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader closeButton>
          <CModalTitle>Filtrar Disciplinas</CModalTitle>
        </CModalHeader>

        <CModalBody>
          <CForm>
            <CRow>
              <CCol md={12}>
                <CFormInput
                  name="nome"
                  label="Nome"
                  value={filters.nome}
                  onChange={handleChange}
                  className="mb-3"
                />
              </CCol>

              <CCol md={12}>
                <CFormSelect
                  name="curso_id"
                  label="Curso"
                  value={filters.curso_id}
                  onChange={handleChange}
                  className="mb-3"
                >
                  <option value="">Todos</option>
                  {cursos.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.titulo}
                    </option>
                  ))}
                </CFormSelect>
              </CCol>
            </CRow>
          </CForm>
        </CModalBody>

        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => {
              setFilters({ nome: '', curso_id: '' })
              onFiltrar({})
              setVisible(false)
            }}
          >
            Limpar
          </CButton>

          <CButton
            color="primary"
            onClick={() => {
              onFiltrar(filters)
              setVisible(false)
            }}
          >
            Aplicar Filtros
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalFiltrosDisciplina
