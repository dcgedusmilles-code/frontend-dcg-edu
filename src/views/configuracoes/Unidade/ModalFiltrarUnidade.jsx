import React, { useState } from 'react'
import {
  CModal, CModalHeader, CModalBody, CModalFooter,
  CButton, CFormSelect
} from '@coreui/react'

const ModalFiltrosUnidade = ({ enderecos, onFiltrar }) => {
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
      <CButton color="info" className="mb-3" onClick={() => setVisible(true)}>
        Filtros
      </CButton>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader closeButton>Filtros de Unidade</CModalHeader>

        <CModalBody>

          <CFormSelect className="mb-3" name="status" label="Status" onChange={handleChange}>
            <option value="">Todos</option>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </CFormSelect>

          <CFormSelect className="mb-3" name="tipo" label="Tipo" onChange={handleChange}>
            <option value="">Todos</option>
            <option value="Matriz">Matriz</option>
            <option value="Filial">Filial</option>
            <option value="Polo">Polo</option>
          </CFormSelect>

          <CFormSelect className="mb-3" name="endereco_id" label="Endereço" onChange={handleChange}>
            <option value="">Todos</option>
            {enderecos.map((e) => (
              <option key={e.id} value={e.id}>{e.rua} - {e.cidade}</option>
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

export default ModalFiltrosUnidade
