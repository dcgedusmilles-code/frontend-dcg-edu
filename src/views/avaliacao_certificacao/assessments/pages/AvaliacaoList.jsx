import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CSpinner,
} from '@coreui/react'
import { AvaliacaoService } from '../services/avaliacaoService'
import AvaliacaoTable from '../components/AvaliacaoTable'
import AvaliacaoFilters from '../components/AvaliacaoFilters'
import AvaliacaoExport from '../components/AvaliacaoExport'

export default function AvaliacaoList() {
  const [avaliacoes, setAvaliacoes] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({})

  const carregar = async () => {
    setLoading(true)
    const { data } = await AvaliacaoService.listar(filters)
    setAvaliacoes(data.rows)
    setLoading(false)
  }

  useEffect(() => {
    carregar()
  }, [filters])

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between">
        <strong>Avaliações</strong>
        <CButton color="primary" href="#/dashboard/avaliacao-certicacao/assessments/nova">
          Nova Avaliação
        </CButton>
      </CCardHeader>

      <CCardBody>
        <AvaliacaoFilters onFilter={setFilters} />
        <AvaliacaoExport filters={filters} />

        {loading ? (
          <CSpinner />
        ) : (
          <AvaliacaoTable data={avaliacoes} onReload={carregar} />
        )}
      </CCardBody>
    </CCard>
  )
}
