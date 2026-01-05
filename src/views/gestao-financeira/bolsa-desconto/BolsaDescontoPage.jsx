// pages/BolsaDescontoPage.jsx
import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CRow, CCol, CSpinner } from '@coreui/react'
import scholarshipsService from '../../../services/scholarshipsAndDiscountsService'
import ModalCreateBolsa from './ModalCreateBolsa'
import ModalFiltrarBolsa from './ModalFiltrarBolsa'

export default function BolsaDescontoPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({})

  const loadData = async () => {
    setLoading(true)
    try {
      const res = await scholarshipsService.getAll(filters)
      setData(res)
    } catch (err) {
      console.error('Erro ao carregar bolsas e descontos:', err)
    }
    setLoading(false)
  }

  useEffect(() => {
    loadData()
  }, [filters])

  return (
    <CCard>
      <CCardHeader>
        <CRow>
          <CCol>
            <h4>Bolsas e Descontos</h4>
          </CCol>
          <CCol className="text-end">
            <CButton color="primary" onClick={() => setIsFilterOpen(true)}>
              Filtrar
            </CButton>{' '}
            <CButton color="success" onClick={() => setIsCreateOpen(true)}>
              Novo
            </CButton>
          </CCol>
        </CRow>
      </CCardHeader>

      <CCardBody>
        {loading && <CSpinner />}

        {!loading && (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Tipo</th>
                <th>Percentual</th>
                <th>Motivo</th>
                <th>Início</th>
                <th>Fim</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item?.aluno?.nome}</td>
                  <td>{item.tipo}</td>
                  <td>{item.percentual}%</td>
                  <td>{item.motivo}</td>
                  <td>{item.data_inicio}</td>
                  <td>{item.data_fim}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CCardBody>

      {isCreateOpen && (
        <ModalCreateBolsa
          isOpen={isCreateOpen}
          onClose={() => setIsCreateOpen(false)}
          onSaved={loadData}
        />
      )}

      {isFilterOpen && (
        <ModalFiltrarBolsa
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onFilter={(f) => setFilters(f)}
        />
      )}
    </CCard>
  )
}
