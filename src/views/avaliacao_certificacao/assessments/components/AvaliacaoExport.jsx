import React from 'react'
import { CButton, CButtonGroup } from '@coreui/react'
import { AvaliacaoService } from '../services/avaliacaoService'

export default function AvaliacaoExport({ filters }) {
  const exportar = async (formato) => {
    try {
      const response = await AvaliacaoService.exportar({
        ...filters,
        formato,
      })

      const blob = new Blob([response.data])
      const url = window.URL.createObjectURL(blob)

      const link = document.createElement('a')
      link.href = url
      link.setAttribute(
        'download',
        `avaliacoes_${new Date().getTime()}.${formato}`,
      )

      document.body.appendChild(link)
      link.click()
      link.remove()
    } catch (error) {
      alert('Erro ao exportar dados.')
    }
  }

  return (
    <div className="mb-3">
      <CButtonGroup>
        <CButton
          color="secondary"
          size="sm"
          onClick={() => exportar('csv')}
        >
          Exportar CSV
        </CButton>

        <CButton
          color="secondary"
          size="sm"
          onClick={() => exportar('xlsx')}
        >
          Exportar Excel
        </CButton>

        <CButton
          color="secondary"
          size="sm"
          onClick={() => exportar('pdf')}
        >
          Exportar PDF
        </CButton>
      </CButtonGroup>
    </div>
  )
}
