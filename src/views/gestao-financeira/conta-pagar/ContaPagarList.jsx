import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CContainer,
  CRow,
  CCol,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

import { getAccountsPayable, deleteAccount } from '../../../services/accountsPayableService'

import ModalContaPagar from './ModalContaPagar'
import FiltrosContaPagar from './FiltrosContaPagar'

export default function ContaPagarList() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [open, setOpen] = useState(false)

  const fetchData = () => {
    setLoading(true)
    getAccountsPayable()
      .then((res) => setData(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleEdit = (item) => {
    setSelected(item)
    setOpen(true)
  }

  const handleDelete = async (id) => {
    await deleteAccount(id)
    fetchData()
  }

  return (
    <CContainer className="mt-4">
      <CRow className="mb-3">
        <CCol>
          <h2>Contas a Pagar</h2>
        </CCol>
      </CRow>

      <CRow>
        <CCol>
          <FiltrosContaPagar onFilter={() => {}} />
        </CCol>
      </CRow>

      <CRow className="mb-3">
        <CCol>
          <CButton
            color="primary"
            onClick={() => {
              setSelected(null)
              setOpen(true)
            }}
          >
            Nova Conta
          </CButton>
        </CCol>
      </CRow>

      <CCard>
        <CCardBody>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <CTable bordered hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Fornecedor</CTableHeaderCell>
                  <CTableHeaderCell>Descrição</CTableHeaderCell>
                  <CTableHeaderCell>Valor</CTableHeaderCell>
                  <CTableHeaderCell>Vencimento</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {data.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell>{item.fornecedor?.nome || '-'}</CTableDataCell>
                    <CTableDataCell>{item.descricao}</CTableDataCell>
                    <CTableDataCell>{item.valor}</CTableDataCell>
                    <CTableDataCell>{item.data_vencimento}</CTableDataCell>
                    <CTableDataCell>{item.status}</CTableDataCell>

                    <CTableDataCell>
                      <CButton
                        size="sm"
                        color="warning"
                        className="me-2"
                        onClick={() => handleEdit(item)}
                      >
                        Editar
                      </CButton>

                      <CButton
                        size="sm"
                        color="danger"
                        onClick={() => handleDelete(item.id)}
                      >
                        Apagar
                      </CButton>
                    </CTableDataCell>
                  </CTableRow>
                ))}
              </CTableBody>
            </CTable>
          )}
        </CCardBody>
      </CCard>

      {open && (
        <ModalContaPagar
          open={open}
          setOpen={setOpen}
          selected={selected}
          refresh={fetchData}
        />
      )}
    </CContainer>
  )
}
