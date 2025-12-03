import React, { useState, useEffect } from 'react'

export const ModalContaReceber = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [form, setForm] = useState({
    descricao: '',
    valor: '',
    data_vencimento: '',
    data_recebimento: '',
    origem: '',
    status: '',
  })

  useEffect(() => {
    if (initialData) setForm(initialData)
  }, [initialData])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const submit = () => {
    onSubmit(form)
  }

  if (!isOpen) return null

  return (
    <div className="modal">
      <h3>{initialData ? 'Editar Conta a Receber' : 'Nova Conta a Receber'}</h3>

      <input
        name="descricao"
        placeholder="Descrição"
        value={form.descricao}
        onChange={handleChange}
      />
      <input
        name="valor"
        placeholder="Valor"
        type="number"
        value={form.valor}
        onChange={handleChange}
      />
      <input
        name="data_vencimento"
        type="date"
        value={form.data_vencimento}
        onChange={handleChange}
      />
      <input
        name="data_recebimento"
        type="date"
        value={form.data_recebimento}
        onChange={handleChange}
      />
      <input name="origem" placeholder="Origem" value={form.origem} onChange={handleChange} />

      <select name="status" value={form.status} onChange={handleChange}>
        <option value="">Selecione</option>
        <option value="pendente">Pendente</option>
        <option value="recebido">Recebido</option>
      </select>

      <button onClick={submit}>Salvar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  )
}
