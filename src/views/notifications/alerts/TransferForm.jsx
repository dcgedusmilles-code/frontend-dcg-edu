// Component 1: TransferForm.js
// Handles form fields and selection inputs

import React from 'react'
import { CForm, CFormInput, CFormLabel, CFormSelect } from '@coreui/react'

export const TransferForm = ({ form, onChange, students, cursos, turmas, unidades }) => {
  return (
    <CForm>
      <div className="mb-3">
        <CFormLabel>Aluno</CFormLabel>
        <CFormSelect name="aluno_id" value={form.aluno_id} onChange={onChange}>
          <option value="">Selecione o aluno</option>
          {students.map((aluno) => (
            <option key={aluno.id} value={aluno.id}>
              {aluno.nome}
            </option>
          ))}
        </CFormSelect>
      </div>

      <div className="mb-3">
        <CFormLabel>Curso de Origem</CFormLabel>
        <CFormInput name="curso_origem" value={form.curso_origem} onChange={onChange} readOnly />
      </div>

      <div className="mb-3">
        <CFormLabel>Curso de Destino</CFormLabel>
        <CFormSelect name="curso_destino" value={form.curso_destino} onChange={onChange}>
          <option value="">Selecione o curso</option>
          {cursos.map((c) => (
            <option key={c.id} value={c.titulo}>
              {c.titulo}
            </option>
          ))}
        </CFormSelect>
      </div>

      <div className="mb-3">
        <CFormLabel>Nova Turma</CFormLabel>
        <CFormSelect name="turma_id" value={form.turma_id} onChange={onChange}>
          <option value="">Selecione a turma</option>
          {turmas.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome}
            </option>
          ))}
        </CFormSelect>
      </div>

      <div className="mb-3">
        <CFormLabel>Nova Unidade</CFormLabel>
        <CFormSelect name="unidade_id" value={form.unidade_id} onChange={onChange}>
          <option value="">Selecione a unidade</option>
          {unidades.map((u) => (
            <option key={u.id} value={u.id}>
              {u.nome}
            </option>
          ))}
        </CFormSelect>
      </div>
    </CForm>
  )
}