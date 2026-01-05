import React from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CButton
} from '@coreui/react'

const HorarioDetalhesModal = ({ visible, horario, onClose }) => {
  if (!horario) return null

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Detalhes do Horário</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p><strong>Curso:</strong> {horario.curso?.nome}</p>
        <p><strong>Turma:</strong> {horario.turma?.nome}</p>
        <p><strong>Professor:</strong> {horario.professor?.nome}</p>
        <p><strong>Dia:</strong> {horario.dia_semana}</p>
        <p><strong>Hora:</strong> {horario.inicio_hora} - {horario.fim_hora}</p>
        <p><strong>Sala:</strong> {horario.sala}</p>
        <p><strong>Observações:</strong> {horario.observacoes}</p>

        <CButton color="secondary" onClick={onClose}>
          Fechar
        </CButton>
      </CModalBody>
    </CModal>
  )
}

export default HorarioDetalhesModal
