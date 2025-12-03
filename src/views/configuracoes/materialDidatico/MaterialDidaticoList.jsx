// src/views/MaterialDidatico/MaterialDidaticoList.jsx
import React, { useEffect, useState } from 'react'
import MaterialDidaticoService from '../../../services/MaterialDidaticoService'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableRow,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react'
import MaterialDidaticoForm from './MaterialDidaticoForm'
import MaterialDidaticoModalDelete from './MaterialDidaticoModalDelete'

const MaterialDidaticoList = () => {
  const [lista, setLista] = useState([])
  const [loading, setLoading] = useState(true)

  const [modalAddEdit, setModalAddEdit] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)

  const [selected, setSelected] = useState(null)

  const carregar = () => {
    setLoading(true)
    MaterialDidaticoService.listar()
      .then((res) => setLista(res.data))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    carregar()
  }, [])

  const abrirEditar = (item) => {
    setSelected(item)
    setModalAddEdit(true)
  }

  const abrirNovo = () => {
    setSelected(null)
    setModalAddEdit(true)
  }

  const abrirDelete = (item) => {
    setSelected(item)
    setModalDelete(true)
  }

  return (
    <>
      <CCard>
        <CCardHeader className="d-flex justify-content-between">
          <h5>Materiais Didáticos</h5>
          <CButton color="primary" onClick={abrirNovo}>
            + Novo Material
          </CButton>
        </CCardHeader>

        <CCardBody>
          {loading ? (
            <p>Carregando...</p>
          ) : (
            <CTable hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Título</CTableHeaderCell>
                  <CTableHeaderCell>Nível</CTableHeaderCell>
                  <CTableHeaderCell>Curso</CTableHeaderCell>
                  <CTableHeaderCell>Unidade</CTableHeaderCell>
                  <CTableHeaderCell>Status</CTableHeaderCell>
                  <CTableHeaderCell>Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {lista.map((item) => (
                  <CTableRow key={item.id}>
                    <CTableDataCell>{item.titulo}</CTableDataCell>
                    <CTableDataCell>{item.nivel}</CTableDataCell>
                    <CTableDataCell>{item.curso?.nome || '-'}</CTableDataCell>
                    <CTableDataCell>{item.unidade?.nome || '-'}</CTableDataCell>
                    <CTableDataCell>{item.ativo ? 'Ativo' : 'Inativo'}</CTableDataCell>
                    <CTableDataCell>
                      <CButton
                        size="sm"
                        color="warning"
                        className="me-2"
                        onClick={() => abrirEditar(item)}
                      >
                        Editar
                      </CButton>
                      <CButton size="sm" color="danger" onClick={() => abrirDelete(item)}>
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

      <MaterialDidaticoForm
        visible={modalAddEdit}
        onClose={() => setModalAddEdit(false)}
        item={selected}
        reload={carregar}
      />

      <MaterialDidaticoModalDelete
        visible={modalDelete}
        onClose={() => setModalDelete(false)}
        item={selected}
        reload={carregar}
      />
    </>
  )
}

export default MaterialDidaticoList
