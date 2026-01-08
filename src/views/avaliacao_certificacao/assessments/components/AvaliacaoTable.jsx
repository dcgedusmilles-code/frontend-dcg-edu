import React from 'react'
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CBadge,
} from '@coreui/react'

export default function AvaliacaoTable({ data, onReload }) {
  return (
    <CTable hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>Título</CTableHeaderCell>
          <CTableHeaderCell>Curso</CTableHeaderCell>
          <CTableHeaderCell>Data</CTableHeaderCell>
          <CTableHeaderCell>Estado</CTableHeaderCell>
          <CTableHeaderCell>Ações</CTableHeaderCell>
        </CTableRow>
      </CTableHead>

      <CTableBody>
        {data.map((item) => (
          <CTableRow key={item.id}>
            <CTableDataCell>{item.titulo}</CTableDataCell>
            <CTableDataCell>{item.curso?.nome}</CTableDataCell>
            <CTableDataCell>
              {new Date(item.data).toLocaleDateString()}
            </CTableDataCell>
            <CTableDataCell>
              <CBadge color={item.ativo ? 'success' : 'secondary'}>
                {item.ativo ? 'Ativo' : 'Inativo'}
              </CBadge>
            </CTableDataCell>
            <CTableDataCell>
              <CButton size="sm" color="info" href={`#/avaliacao-certicacao/assessments/${item.id}`}>
                Ver
              </CButton>{' '}
              <CButton size="sm" color="warning" href={`#/avaliacao-certicacao/assessments/${item.id}/editar`}>
                Editar
              </CButton>
            </CTableDataCell>
          </CTableRow>
        ))}
      </CTableBody>
    </CTable>
  )
}
