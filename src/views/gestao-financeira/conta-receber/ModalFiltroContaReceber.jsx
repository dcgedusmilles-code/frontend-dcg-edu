import React, { useState } from 'react'

export const ModalFiltroContaReceber = ({ isOpen, onClose, onFilter }) => {
  const [descricao, setDescricao] = useState('')
  const [status, setStatus] = useState('')

  const aplicarFiltro = () => {
    onFilter({ descricao, status })
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal">
      <h3>Filtrar Contas a Receber</h3>

      <input
        placeholder="Descrição"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">Todos</option>
        <option value="pendente">Pendente</option>
        <option value="recebido">Recebido</option>
      </select>

      <button onClick={aplicarFiltro}>Aplicar</button>
      <button onClick={onClose}>Cancelar</button>
    </div>
  )
}
