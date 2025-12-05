import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CForm,
  CFormInput,
} from '@coreui/react'
import { createAccount, updateAccount } from '../../../services/accountsPayableService'

export default function ModalContaPagar({ open, setOpen, selected, refresh }) {
  const [form, setForm] = useState({
    fornecedor_id: '',
    descricao: '',
    valor: '',
    data_vencimento: '',
    data_pagamento: '',
    status: '',
  })

  useEffect(() => {
    if (selected) setForm(selected)
  }, [selected])

  const handleSubmit = async () => {
    if (selected) await updateAccount(selected.id, form)
    else await createAccount(form)

    refresh()
    setOpen(false)
  }

  return (
    <CModal visible={open} onClose={() => setOpen(false)}>
      <CModalHeader>
        <CModalTitle>{selected ? 'Editar Conta' : 'Nova Conta'}</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <CForm className="row g-3">
          <CFormInput
            label="Fornecedor ID"
            value={form.fornecedor_id}
            onChange={(e) => setForm({ ...form, fornecedor_id: e.target.value })}
          />

          <CFormInput
            label="Descrição"
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          />

          <CFormInput
            label="Valor"
            value={form.valor}
            onChange={(e) => setForm({ ...form, valor: e.target.value })}
          />

          <CFormInput
            type="date"
            label="Data de Vencimento"
            value={form.data_vencimento}
            onChange={(e) => setForm({ ...form, data_vencimento: e.target.value })}
          />

          <CFormInput
            type="date"
            label="Data de Pagamento"
            value={form.data_pagamento}
            onChange={(e) => setForm({ ...form, data_pagamento: e.target.value })}
          />

          <CFormInput
            label="Status"
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value })}
          />
        </CForm>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={() => setOpen(false)}>
          Cancelar
        </CButton>

        <CButton color="primary" onClick={handleSubmit}>
          Salvar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
