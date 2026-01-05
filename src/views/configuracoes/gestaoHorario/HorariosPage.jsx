import React, { useEffect, useState } from 'react'
import {
  CContainer,
  CButton,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CSpinner
} from '@coreui/react'

import { getHorarios } from '../../../services/horarioService' 
import HorariosFiltro from './HorariosFiltro'
import HorariosTabela from './HorariosTabela'
import HorarioFormModal from './HorarioFormModal'
import HorarioDetalhesModal from './HorarioDetalhesModal'

const HorariosPage = () => {
  const [horarios, setHorarios] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalForm, setModalForm] = useState(false)
  const [modalDetalhes, setModalDetalhes] = useState(false)
  const [selected, setSelected] = useState(null)

  const carregar = async (filtros = {}) => {
    setLoading(true)
    const res = await getHorarios(filtros)
    setHorarios(res.data)
    setLoading(false)
  }

  useEffect(() => {
    carregar()
  }, [])

  return (
    <CContainer fluid>
      <CRow className="mb-3">
        <CCol>
          <h3>Gestão de Horários</h3>
        </CCol>
        <CCol className="text-end">
          <CButton color="primary" onClick={() => setModalForm(true)}>
            + Novo Horário
          </CButton>
        </CCol>
      </CRow>

      <HorariosFiltro onFilter={carregar} />

      <CCard>
        <CCardBody>
          {loading ? (
            <CSpinner />
          ) : (
            <HorariosTabela
              data={horarios}
              onView={(h) => {
                setSelected(h)
                setModalDetalhes(true)
              }}
              onEdit={(h) => {
                setSelected(h)
                setModalForm(true)
              }}
              onReload={carregar}
            />
          )}
        </CCardBody>
      </CCard>

      <HorarioFormModal
        visible={modalForm}
        onClose={() => {
          setModalForm(false)
          setSelected(null)
        }}
        initialData={selected}
        onSaved={carregar}
      />

      <HorarioDetalhesModal
        visible={modalDetalhes}
        horario={selected}
        onClose={() => setModalDetalhes(false)}
      />
    </CContainer>
  )
}

export default HorariosPage
