import React from 'react'
import { CButtonGroup, CButton } from '@coreui/react'
import { CriterioService } from '../services/criterioService'

export default function CriterioExport({ filters }) {
  const exportar = async (formato) => {
    const response = await CriterioService.exportar({
      ...filters,
      formato,
    })

    const blob = new Blob([response.data])
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.download = `criterios.${formato}`
    link.click()
  }

  return (
    <CButtonGroup className="mb-3">
      <CButton size="sm" onClick={() => exportar('csv')}>
        CSV
      </CButton>
      <CButton size="sm" onClick={() => exportar('xlsx')}>
        Excel
      </CButton>
      <CButton size="sm" onClick={() => exportar('pdf')}>
        PDF
      </CButton>
    </CButtonGroup>
  )
}
