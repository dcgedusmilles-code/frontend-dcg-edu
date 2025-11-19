import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CCol,
} from '@coreui/react'
import axios from '../../../api' // <-- seu axios configurado com baseURL

const ModalCurso = ({ cursoEditando, coordenadores = [], onSalvo, onClose }) => {
  const [form, setForm] = useState({
    titulo: '',
    descricao: '',
    carga_horaria: '',
    modalidade: '',
    nivel: '',
    coordenador_id: '',
  })

  useEffect(() => {
    if (cursoEditando) {
      setForm({
        titulo: cursoEditando.titulo || '',
        descricao: cursoEditando.descricao || '',
        carga_horaria: cursoEditando.carga_horaria || '',
        modalidade: cursoEditando.modalidade || '',
        nivel: cursoEditando.nivel || '',
        coordenador_id: cursoEditando.coordenador_id || '',
      })
    } else {
      setForm({
        titulo: '',
        descricao: '',
        carga_horaria: '',
        modalidade: '',
        nivel: '',
        coordenador_id: '',
      })
    }
  }, [cursoEditando])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      console.log("form",form)
      if (cursoEditando) {
        await axios.put(`/training-coordinators/courses/${cursoEditando.id}`, form)
      } else {
        await axios.post(`/training-coordinators/courses`, form)
      }
      onSalvo?.()
      onClose()
    } catch (error) {
      console.error('Erro ao salvar curso:', error)
    }
  }

  return (
    <CModal visible onClose={onClose} size="lg">
      <CModalHeader>{cursoEditando ? 'Editar Curso' : 'Novo Curso'}</CModalHeader>
      <CModalBody>
        <div className="row g-3">
          <CCol md={6}>
            <CFormInput
              label="Título"
              name="titulo"
              value={form.titulo}
              onChange={handleChange}
              placeholder="Ex: Curso de Programação"
            />
          </CCol>

          <CCol md={6}>
            <CFormSelect
              label="Coordenador"
              name="coordenador_id"
              value={form.coordenador_id}
              onChange={handleChange}
            >
              <option value="">Selecione o Coordenador</option>
              {coordenadores.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </CFormSelect>
          </CCol>

          <CCol md={12}>
            <CFormTextarea
              label="Descrição"
              name="descricao"
              rows={3}
              value={form.descricao}
              onChange={handleChange}
            />
          </CCol>

          <CCol md={4}>
            <CFormInput
              label="Carga Horária (h)"
              name="carga_horaria"
              type="number"
              value={form.carga_horaria}
              onChange={handleChange}
            />
          </CCol>

          <CCol md={4}>
            <CFormSelect
              label="Modalidade"
              name="modalidade"
              value={form.modalidade}
              onChange={handleChange}
            >
              <option value="">Selecione</option>
              <option value="Presencial">Presencial</option>
              <option value="Online">Online</option>
              <option value="Híbrido">Híbrido</option>
            </CFormSelect>
          </CCol>

          <CCol md={4}>
            <CFormSelect label="Nível" name="nivel" value={form.nivel} onChange={handleChange}>
              <option value="">Selecione</option>
              <option value="Básico">Básico</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
            </CFormSelect>
          </CCol>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleSubmit}>
          Salvar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalCurso
