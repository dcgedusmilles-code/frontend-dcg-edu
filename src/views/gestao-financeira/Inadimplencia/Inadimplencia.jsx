import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CButton,
  CSpinner,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

import inadimplenciaService from '../../../services/inadimplenciaService'
import ModalInadimplenciaFiltro from './ModalInadimplenciaFiltro'
import ModalInadimplenciaCreate from './ModalInadimplenciaCreate'

const Inadimplencia = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const [showFilter, setShowFilter] = useState(false)
  const [showCreate, setShowCreate] = useState(false)

  const [filters, setFilters] = useState({
    aluno: '',
    status_negociacao: '',
    dias_min: '',
    dias_max: '',
  })

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await inadimplenciaService.listar(filters)
      setData(response)
    } catch (error) {
      console.error('Erro ao carregar inadimplência:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [filters])

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <div className="d-flex justify-content-between align-items-center">
              <h5 className="fw-bold">Relatório de Inadimplência</h5>
              <div className="d-flex gap-2">
                <CButton color="secondary" onClick={() => setShowFilter(true)}>
                  Filtrar
                </CButton>

                <CButton color="primary" onClick={() => setShowCreate(true)}>
                  Nova Negociação
                </CButton>
              </div>
            </div>
          </CCardHeader>

          <CCardBody>
            {loading ? (
              <div className="text-center p-4">
                <CSpinner color="primary" />
              </div>
            ) : (
              <CTable hover bordered responsive>
                <CTableHead color="dark">
                  <CTableRow>
                    <CTableHeaderCell>#</CTableHeaderCell>
                    <CTableHeaderCell>Aluno</CTableHeaderCell>
                    <CTableHeaderCell>Dias de Atraso</CTableHeaderCell>
                    <CTableHeaderCell>Valor em Aberto</CTableHeaderCell>
                    <CTableHeaderCell>Status da Negociação</CTableHeaderCell>
                    <CTableHeaderCell>Data</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>

                <CTableBody>
                  {data.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell colSpan={6} className="text-center">
                        Nenhum registro encontrado
                      </CTableDataCell>
                    </CTableRow>
                  ) : (
                    data.map((item) => (
                      <CTableRow key={item.id}>
                        <CTableDataCell>{item.id}</CTableDataCell>
                        <CTableDataCell>{item.aluno?.nome}</CTableDataCell>
                        <CTableDataCell>{item.dias_atraso} dias</CTableDataCell>
                        <CTableDataCell>{item.valor_em_aberto} AOA</CTableDataCell>
                        <CTableDataCell>{item.status_negociacao}</CTableDataCell>
                        <CTableDataCell>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </CTableDataCell>
                      </CTableRow>
                    ))
                  )}
                </CTableBody>
              </CTable>
            )}
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modals */}
      <ModalInadimplenciaFiltro
        visible={showFilter}
        onClose={() => setShowFilter(false)}
        filters={filters}
        setFilters={setFilters}
      />

      <ModalInadimplenciaCreate
        visible={showCreate}
        onClose={() => setShowCreate(false)}
        refresh={fetchData}
      />
    </CRow>
  )
}

export default Inadimplencia
