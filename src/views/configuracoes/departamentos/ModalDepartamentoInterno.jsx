import React, { useState, useEffect } from 'react'
import { CModal, CModalHeader, CModalBody, CModalFooter, CButton, CFormInput, CFormTextarea } from '@coreui/react'
import axios from '../../../api' // <-- seu axios configurado com baseURL

const ModalDepartamentoInterno = ({ departamentoEditando, onSalvo, onClose }) => {
  const [form, setForm] = useState({
    nome: '',
    descricao: '',
  })

  useEffect(() => {
    if (departamentoEditando) {
      setForm({
        nome: departamentoEditando.nome || '',
        descricao: departamentoEditando.descricao || '',
      })
    } else {
      setForm({ nome: '', descricao: '' })
    }
  }, [departamentoEditando])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async () => {
    try {
      if (departamentoEditando) {
        await axios.put(`/human-resources/internal-departments/${departamentoEditando.id}`, form)
      } else {
        await axios.post('/human-resources/internal-departments', form)
      }
      onSalvo?.()
      onClose()
    } catch (error) {
      console.error('Erro ao salvar departamento:', error)
    }
  }

  return (
    <CModal visible onClose={onClose}>
      <CModalHeader>
        {departamentoEditando ? 'Editar Departamento Interno' : 'Novo Departamento Interno'}
      </CModalHeader>
      <CModalBody>
        <CFormInput
          className="mb-3"
          label="Nome"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Ex: Departamento de Formação"
        />
        <CFormTextarea
          label="Descrição"
          name="descricao"
          rows={3}
          value={form.descricao}
          onChange={handleChange}
          placeholder="Descrição breve do departamento..."
        />
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

export default ModalDepartamentoInterno
