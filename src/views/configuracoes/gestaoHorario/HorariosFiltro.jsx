import React, { useState } from 'react'
import { CRow, CCol, CFormSelect, CButton } from '@coreui/react'

const HorariosFiltro = ({ onFilter }) => {
  const [dia, setDia] = useState('')
  const [unidade, setUnidade] = useState('')

  return (
    <CRow className="mb-3">
      <CCol>
        <CFormSelect value={dia} onChange={(e) => setDia(e.target.value)}>
          <option value="">Dia da Semana</option>
          <option value="segunda">Segunda</option>
          <option value="terca">Terça</option>
          <option value="quarta">Quarta</option>
          <option value="quinta">Quinta</option>
          <option value="sexta">Sexta</option>
          <option value="sabado">Sábado</option>
        </CFormSelect>
      </CCol>

      <CCol>
        <CButton
          color="secondary"
          onClick={() => onFilter({ dia_semana: dia, unidade_id: unidade })}
        >
          Filtrar
        </CButton>
      </CCol>
    </CRow>
  )
}

export default HorariosFiltro
