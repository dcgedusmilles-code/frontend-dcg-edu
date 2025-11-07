import React, { useState, useEffect } from 'react'
import {
  CButton,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CFormTextarea,
} from '@coreui/react'

import api from '../../../api' 

const ModalCalendario = ({ show, onClose, calendarioEditando, onSalvo }) => {
  const [form, setForm] = useState({
    ano_letivo: '',
    semestre: '',
    data_inicio: '',
    data_fim: '',
    feriados: [],
    eventos_academicos: [],
  })

  // ✅ Preenche ao editar
  useEffect(() => {
    if (calendarioEditando) {
      setForm({
        ano_letivo: calendarioEditando.ano_letivo || '',
        semestre: calendarioEditando.semestre || '',
        data_inicio: calendarioEditando.data_inicio?.substring(0, 10) || '',
        data_fim: calendarioEditando.data_fim?.substring(0, 10) || '',
        feriados: calendarioEditando.feriados || [],
        eventos_academicos: calendarioEditando.eventos_academicos || [],
      })
    } else {
      resetForm()
    }
  }, [calendarioEditando])

  const resetForm = () => {
    setForm({
      ano_letivo: '',
      semestre: '',
      data_inicio: '',
      data_fim: '',
      feriados: [],
      eventos_academicos: [],
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // ✅ Adicionar feriado
  const adicionarFeriado = () => {
    setForm((prev) => ({
      ...prev,
      feriados: [...prev.feriados, { nome: '', data: '' }],
    }))
  }

  const atualizarFeriado = (index, campo, valor) => {
    const atualizados = [...form.feriados]
    atualizados[index][campo] = valor
    setForm((prev) => ({ ...prev, feriados: atualizados }))
  }

  const removerFeriado = (index) => {
    const atualizados = form.feriados.filter((_, i) => i !== index)
    setForm((prev) => ({ ...prev, feriados: atualizados }))
  }

  // ✅ Adicionar evento acadêmico
  const adicionarEvento = () => {
    setForm((prev) => ({
      ...prev,
      eventos_academicos: [...prev.eventos_academicos, { titulo: '', data: '' }],
    }))
  }

  const atualizarEvento = (index, campo, valor) => {
    const atualizados = [...form.eventos_academicos]
    atualizados[index][campo] = valor
    setForm((prev) => ({ ...prev, eventos_academicos: atualizados }))
  }

  const removerEvento = (index) => {
    const atualizados = form.eventos_academicos.filter((_, i) => i !== index)
    setForm((prev) => ({ ...prev, eventos_academicos: atualizados }))
  }

  // ✅ Submit (POST ou PUT)
  const handleSave = async () => {
    try {
      const payload = {
        ...form,
        ano_letivo: Number(form.ano_letivo),
        semestre: Number(form.semestre),
      }

      if (calendarioEditando) {
        await api.put(`/pedagogico/academic-calendar/${calendarioEditando.id}`, payload)
      } else {
        await api.post('/pedagogico/academic-calendar', payload)
      }

      onSalvo()
      onClose()
      resetForm()
    } catch (error) {
      console.error('Erro ao salvar calendário acadêmico:', error)
    }
  }

  return (
    <CModal visible={show} onClose={onClose} size="lg">
      <CModalHeader>
        <CModalTitle>
          {calendarioEditando ? 'Editar Calendário Acadêmico' : 'Novo Calendário Acadêmico'}
        </CModalTitle>
      </CModalHeader>

      <CModalBody>
        <div className="mb-3">
          <CFormInput
            label="Ano Letivo"
            type="number"
            name="ano_letivo"
            value={form.ano_letivo}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <CFormSelect name="semestre" value={form.semestre} onChange={handleChange}>
            <option value="">Selecione o Semestre</option>
            <option value="1">1º Semestre</option>
            <option value="2">2º Semestre</option>
          </CFormSelect>
        </div>

        <div className="mb-3">
          <CFormInput
            label="Data de Início"
            type="date"
            name="data_inicio"
            value={form.data_inicio}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <CFormInput
            label="Data de Fim"
            type="date"
            name="data_fim"
            value={form.data_fim}
            onChange={handleChange}
          />
        </div>

        {/* Feriados */}
        <h6 className="mt-4">Feriados</h6>
        {form.feriados.map((f, i) => (
          <div key={i} className="d-flex gap-2 mb-2">
            <CFormInput
              placeholder="Nome do feriado"
              value={f.nome}
              onChange={(e) => atualizarFeriado(i, 'nome', e.target.value)}
            />
            <CFormInput
              type="date"
              value={f.data}
              onChange={(e) => atualizarFeriado(i, 'data', e.target.value)}
            />
            <CButton color="danger" onClick={() => removerFeriado(i)}>
              X
            </CButton>
          </div>
        ))}
        <CButton color="secondary" size="sm" onClick={adicionarFeriado}>
          + Adicionar Feriado
        </CButton>

        {/* Eventos Acadêmicos */}
        <h6 className="mt-4">Eventos Acadêmicos</h6>
        {form.eventos_academicos.map((ev, i) => (
          <div key={i} className="d-flex gap-2 mb-2">
            <CFormInput
              placeholder="Título do evento"
              value={ev.titulo}
              onChange={(e) => atualizarEvento(i, 'titulo', e.target.value)}
            />
            <CFormInput
              type="date"
              value={ev.data}
              onChange={(e) => atualizarEvento(i, 'data', e.target.value)}
            />
            <CButton color="danger" onClick={() => removerEvento(i)}>
              X
            </CButton>
          </div>
        ))}
        <CButton color="secondary" size="sm" onClick={adicionarEvento}>
          + Adicionar Evento
        </CButton>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleSave}>
          Salvar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalCalendario
