// Component 2: TransferSummary.js
// Shows summary before sending

import { CCard, CCardBody, CCardHeader } from '@coreui/react'

export const TransferSummary = ({ form, selectedAluno }) => {
  if (!selectedAluno) return null

  return (
    <CCard className="mt-3">
      <CCardHeader>Resumo da Transferência</CCardHeader>
      <CCardBody>
        <p>
          <strong>Aluno:</strong> {selectedAluno.nome}
        </p>
        <p>
          <strong>Curso Origem:</strong> {form.curso_origem}
        </p>
        <p>
          <strong>Curso Destino:</strong> {form.curso_destino}
        </p>
        <p>
          <strong>Nova Turma:</strong> {form.turma_id}
        </p>
        <p>
          <strong>Nova Unidade:</strong> {form.unidade_id}
        </p>
        <p>
          <strong>Status:</strong> {form.status}
        </p>
      </CCardBody>
    </CCard>
  )
}
