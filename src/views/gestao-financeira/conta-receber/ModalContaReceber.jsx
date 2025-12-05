import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react'

const ModalContaReceber = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({
    descricao: '',
    valor: '',
    data_vencimento: '',
    data_recebimento: '',
    origem: '',
    status: '',
  })

  useEffect(() => {
    if (initialData) {
      setForm({
        descricao: initialData?.descricao || '',
        valor: initialData?.valor || '',
        data_vencimento: initialData?.data_vencimento || '',
        data_recebimento: initialData?.data_recebimento || '',
        origem: initialData?.origem || '',
        status: initialData?.status || '',
      })
    } else {
      setForm({
        descricao: '',
        valor: '',
        data_vencimento: '',
        data_recebimento: '',
        origem: '',
        status: '',
      })
    }
  }, [initialData])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = () => {
    onSubmit(form)
  }

  return (
    <CModal visible={isOpen} onClose={onClose}>
      <CModalHeader>
        <h5 className="modal-title">
          {initialData ? 'Editar Conta a Receber' : 'Nova Conta a Receber'}
        </h5>
      </CModalHeader>

      <CModalBody>
        <div className="d-flex flex-column gap-3">
          <CFormInput
            name="descricao"
            placeholder="Descrição"
            value={form.descricao}
            onChange={handleChange}
          />

          <CFormInput
            name="valor"
            placeholder="Valor"
            type="number"
            value={form.valor}
            onChange={handleChange}
          />

          <CFormInput
            name="data_vencimento"
            type="date"
            label="Data de Vencimento"
            value={form.data_vencimento}
            onChange={handleChange}
          />

          <CFormInput
            name="data_recebimento"
            type="date"
            label="Data de Recebimento"
            value={form.data_recebimento}
            onChange={handleChange}
          />

          <CFormInput
            name="origem"
            placeholder="Origem"
            value={form.origem}
            onChange={handleChange}
          />

          <CFormSelect name="status" value={form.status} onChange={handleChange}>
            <option value="">Selecione</option>
            <option value="pendente">Pendente</option>
            <option value="recebido">Recebido</option>
          </CFormSelect>
        </div>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={submit}>
          Salvar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalContaReceber
