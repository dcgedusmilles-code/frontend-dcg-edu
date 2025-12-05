import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react'

const ModalFiltroContaReceber = ({ isOpen, onClose, onFilter }) => {
  const [descricao, setDescricao] = useState('')
  const [status, setStatus] = useState('')

  const aplicarFiltro = () => {
    onFilter({ descricao, status })
    onClose()
  }

  return (
    <CModal visible={isOpen} onClose={onClose}>
      <CModalHeader>
        <h5 className="modal-title">Filtrar Contas a Receber</h5>
      </CModalHeader>

      <CModalBody>
        <div className="d-flex flex-column gap-3">
          <CFormInput
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />

          <CFormSelect value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="">Todos</option>
            <option value="pendente">Pendente</option>
            <option value="recebido">Recebido</option>
          </CFormSelect>
        </div>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={aplicarFiltro}>
          Aplicar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalFiltroContaReceber
