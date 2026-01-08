import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CSpinner,
} from '@coreui/react'

import { CriterioService } from '../services/criterioService'
import CriterioTable from '../components/CriterioTable'
import CriterioFilters from '../components/CriterioFilters'
import CriterioExport from '../components/CriterioExport'
import CriterioImport from '../components/CriterioImport'

export default function CriterioList() {
  const [criterios, setCriterios] = useState([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({})

  const carregar = async () => {
    setLoading(true)
    const { data } = await CriterioService.listar(filters)
    setCriterios(data.rows)
    setLoading(false)
  }

  useEffect(() => {
    carregar()
  }, [filters])

  return (
    <CCard>
      <CCardHeader className="d-flex justify-content-between">
        <strong>Critérios de Avaliação</strong>
        <CButton color="primary" href="#/dashboard/avaliacao-certicacao/evaluation-criterias/novo">
          Novo Critério
        </CButton>
      </CCardHeader>

      <CCardBody>
        <CriterioFilters onFilter={setFilters} />
        <CriterioImport onSuccess={carregar} />
        <CriterioExport filters={filters} />

        {loading ? (
          <CSpinner />
        ) : (
          <CriterioTable data={criterios} onReload={carregar} />
        )}
      </CCardBody>
    </CCard>
  )
}
