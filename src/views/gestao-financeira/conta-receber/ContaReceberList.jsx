import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableBody,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CSpinner,
} from '@coreui/react'

import {
  getContasReceber,
  createContaReceber,
  updateContaReceber,
  deleteContaReceber,
} from '../../../services/accountsReceberService'

import ModalContaReceber from './ModalContaReceber'
import ModalFiltroContaReceber from './ModalFiltroContaReceber'

const ContaReceberList = () => {
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
    <CCard>
      <CCardHeader>
        <h4 className="mb-0">Contas a Receber</h4>
      </CCardHeader>

      <CCardBody>
        <div className="d-flex gap-2 mb-3">
          <CButton color="primary" onClick={() => setModalOpen(true)}>
            + Nova Conta
          </CButton>

          <CButton color="secondary" onClick={() => setFiltroOpen(true)}>
            Filtrar
          </CButton>
        </div>

        {loading ? (
          <div className="text-center py-4">
            <CSpinner />
          </div>
        ) : (
          <CTable striped hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>ID</CTableHeaderCell>
                <CTableHeaderCell>Descrição</CTableHeaderCell>
                <CTableHeaderCell>Valor</CTableHeaderCell>
                <CTableHeaderCell>Vencimento</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Ações</CTableHeaderCell>
              </CTableRow>
            </CTableHead>

            <CTableBody>
              {contas.map((c) => (
                <CTableRow key={c.id}>
                  <CTableDataCell>{c.id}</CTableDataCell>
                  <CTableDataCell>{c.descricao}</CTableDataCell>
                  <CTableDataCell>{c.valor}</CTableDataCell>
                  <CTableDataCell>{c.data_vencimento}</CTableDataCell>
                  <CTableDataCell>{c.status}</CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      size="sm"
                      color="warning"
                      className="me-2"
                      onClick={() => {
                        setEditData(c)
                        setModalOpen(true)
                      }}
                    >
                      Editar
                    </CButton>

                    <CButton size="sm" color="danger" onClick={() => excluir(c.id)}>
                      Excluir
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        )}
      </CCardBody>

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
        onFilter={(filters) => loadData(filters)}
      />
    </CCard>
  )
}

export default ContaReceberList
