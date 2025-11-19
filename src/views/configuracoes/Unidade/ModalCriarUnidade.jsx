import React, { useState, useEffect } from 'react'
import {
  CModal, CModalBody, CModalHeader, CModalFooter,
  CButton, CFormInput, CFormSelect, CFormTextarea
} from '@coreui/react'
import api from '../../../api'

const ModalUnidade = ({ unidadeEditando, enderecos, onSalvo }) => {
  const [visible, setVisible] = useState(true)

  const [form, setForm] = useState({
    nome: '',
    sigla: '',
    tipo: '',
    descricao: '',
    telefone: '',
    email: '',
    status: '',
    endereco_id: ''
  })

  useEffect(() => {
    if (unidadeEditando) {
      setForm({
        nome: unidadeEditando.nome,
        sigla: unidadeEditando.sigla,
        tipo: unidadeEditando.tipo,
        descricao: unidadeEditando.descricao,
        telefone: unidadeEditando.telefone,
        email: unidadeEditando.email,
        status: unidadeEditando.status,
        endereco_id: unidadeEditando.endereco_id
      })
    }
  }, [unidadeEditando])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const salvar = async () => {
    try {
      if (unidadeEditando) {
        await api.put(`/units/address/${unidadeEditando.id}`, form)
      } else {
        await api.post(`/units/address`, form)
      }
      onSalvo()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <CModal visible={visible} onClose={() => onSalvo()} size="lg">
      <CModalHeader closeButton>
        {unidadeEditando ? 'Editar Unidade' : 'Nova Unidade'}
      </CModalHeader>

      <CModalBody>
        <CFormInput className="mb-3" name="nome" label="Nome" value={form.nome} onChange={handleChange} />

        <CFormInput className="mb-3" name="sigla" label="Sigla" value={form.sigla} onChange={handleChange} />

        <CFormSelect className="mb-3" name="tipo" label="Tipo" value={form.tipo} onChange={handleChange}>
          <option value="">Selecione...</option>
          <option value="Matriz">Matriz</option>
          <option value="Filial">Filial</option>
          <option value="Polo">Polo</option>
        </CFormSelect>

        <CFormTextarea
          className="mb-3"
          name="descricao"
          label="Descrição"
          value={form.descricao}
          onChange={handleChange}
        />

        <CFormInput className="mb-3" name="telefone" label="Telefone" value={form.telefone} onChange={handleChange} />

        <CFormInput className="mb-3" name="email" type="email" label="E-mail" value={form.email} onChange={handleChange} />

        <CFormSelect className="mb-3" name="status" label="Status" value={form.status} onChange={handleChange}>
          <option value="">Selecione...</option>
          <option value="Ativo">Ativo</option>
          <option value="Inativo">Inativo</option>
        </CFormSelect>

        <CFormSelect className="mb-3" name="endereco_id" label="Endereço" value={form.endereco_id} onChange={handleChange}>
          <option value="">Selecione...</option>
          {enderecos.map((e) => (
            <option key={e.id} value={e.id}>{e.rua} - {e.cidade}</option>
          ))}
        </CFormSelect>

      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onSalvo}>Cancelar</CButton>
        <CButton color="primary" onClick={salvar}>Salvar</CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalUnidade
