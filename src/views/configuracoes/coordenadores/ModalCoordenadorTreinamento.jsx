import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import axios from '../../../api' // <-- seu axios configurado com baseURL

const ModalCoordenadorTreinamento = ({ coordenadorEditando, departamentos = [], onSalvo, onClose }) => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    departamento_id: '',
  })

  useEffect(() => {
    if (coordenadorEditando) {
      setForm({
        nome: coordenadorEditando.nome || '',
        email: coordenadorEditando.email || '',
        telefone: coordenadorEditando.telefone || '',
        departamento_id: coordenadorEditando.departamento_id || '',
      })
    } else {
      setForm({ nome: '', email: '', telefone: '', departamento_id: '' })
    }
  }, [coordenadorEditando])

  

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      if (coordenadorEditando) {
        await axios.put(`/training-coordinators/training-coordinators/${coordenadorEditando.id}`, form)
      } else {
        await axios.post(`/training-coordinators/training-coordinators`, form)
      }
      onSalvo?.()
      onClose()
    } catch (error) {
      console.error('Erro ao salvar coordenador:', error)
    }
  }

  return (
    <CModal visible onClose={onClose}>
      <CModalHeader>
        {coordenadorEditando ? 'Editar Coordenador de Treinamento' : 'Novo Coordenador de Treinamento'}
      </CModalHeader>
      <CModalBody>
        <CFormInput
          className="mb-3"
          label="Nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Ex: João Silva"
        />
        <CFormInput
          className="mb-3"
          type="email"
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="exemplo@email.com"
        />
        <CFormInput
          className="mb-3"
          label="Telefone"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          placeholder="Ex: +244 900 000 000"
        />
        <CFormSelect
          label="Departamento Interno"
          name="departamento_id"
          value={form.departamento_id}
          onChange={handleChange}
        >
          <option value="">Selecione o Departamento</option>
          {departamentos.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nome}
            </option>
          ))}
        </CFormSelect>
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

export default ModalCoordenadorTreinamento
