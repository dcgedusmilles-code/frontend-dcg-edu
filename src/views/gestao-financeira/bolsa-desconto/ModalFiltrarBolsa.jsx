// components/ModalFiltrarBolsa.jsx
import React, { useState } from 'react'
import { CModal, CModalHeader, CModalBody, CModalFooter, CFormInput, CButton } from '@coreui/react'

export default function ModalFiltrarBolsa({ isOpen, onClose, onFilter }) {
  const [tipo, setTipo] = useState('')
  const [aluno, setAluno] = useState('')

  const aplicarFiltro = () => {
    onFilter({ tipo, aluno })
    onClose()
  }

  return (
    <CModal visible={isOpen} onClose={onClose}>
      <CModalHeader closeButton>
        <strong>Filtrar Bolsas e Descontos</strong>
      </CModalHeader>

      <CModalBody>
        <CFormInput label="Tipo" value={tipo} onChange={(e) => setTipo(e.target.value)} />

        <CFormInput
          label="Nome do Aluno"
          value={aluno}
          onChange={(e) => setAluno(e.target.value)}
        />
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
