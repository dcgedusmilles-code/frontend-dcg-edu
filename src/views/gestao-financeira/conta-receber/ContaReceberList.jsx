import React, { useEffect, useState } from 'react'
import {
  getContasReceber,
  createContaReceber,
  updateContaReceber,
  deleteContaReceber,
} from '../service/accountsReceberService'
import { ModalContaReceber } from '../components/ModalContaReceber'
import { ModalFiltroContaReceber } from '../components/ModalFiltroContaReceber'

export const ContaReceberList = () => {
  const [contas, setContas] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)
  const [filtroOpen, setFiltroOpen] = useState(false)
  const [editData, setEditData] = useState(null)

  const loadData = async (filters = {}) => {
    setLoading(true)
    const res = await getContasReceber(filters)
    setContas(res.data)
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [])

  const salvar = async (data) => {
    if (editData) await updateContaReceber(editData.id, data)
    else await createContaReceber(data)

    setModalOpen(false)
    setEditData(null)
    loadData()
  }

  const excluir = async (id) => {
    await deleteContaReceber(id)
    loadData()
  }

  return (
    <div className="container">
      <h2>Contas a Receber</h2>

      <div>
        <button onClick={() => setModalOpen(true)}>+ Nova Conta</button>
        <button onClick={() => setFiltroOpen(true)}>Filtrar</button>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Valor</th>
              <th>Vencimento</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {contas.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.descricao}</td>
                <td>{c.valor}</td>
                <td>{c.data_vencimento}</td>
                <td>{c.status}</td>
                <td>
                  <button
                    onClick={() => {
                      setEditData(c)
                      setModalOpen(true)
                    }}
                  >
                    Editar
                  </button>
                  <button onClick={() => excluir(c.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <ModalContaReceber
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false)
          setEditData(null)
        }}
        onSubmit={salvar}
        initialData={editData}
      />

      <ModalFiltroContaReceber
        isOpen={filtroOpen}
        onClose={() => setFiltroOpen(false)}
        onFilter={(f) => loadData(f)}
      />
    </div>
  )
}
