import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
  CButton,
  CSpinner,
} from '@coreui/react'
import axios from '../../../api'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import ModalCalendario from './ModalEvento'
import ModalFiltrosCalendario from './ModalFiltrosCalendario'

const GestaoCalendarioPage = () => {
  const [calendarios, setCalendarios] = useState([])
  const [loading, setLoading] = useState(false)

  const [eventoSelecionado, setEventoSelecionado] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const API = "/pedagogico/academic-calendar"

  // -----------------------------------------------------
  // ✅ Buscar calendários da API REST
  // -----------------------------------------------------
  const fetchCalendarios = async (filters = {}) => {
    try {
      setLoading(true)

      const params = new URLSearchParams()
      if (filters.ano_letivo) params.append("ano_letivo", filters.ano_letivo)
      if (filters.semestre) params.append("semestre", filters.semestre)
      if (filters.startDate) params.append("startDate", filters.startDate)
      if (filters.endDate) params.append("endDate", filters.endDate)

      const response = await axios.get(`${API}?${params.toString()}`)
      const data = response.data || []

      setCalendarios(
        data.map((cal) => ({
          ...cal,
          events: [
            ...(cal.eventos_academicos || []),
            ...(cal.feriados || []).map(f => ({
              title: f.nome || "Feriado",
              start: f.data,
              backgroundColor: "#d9534f"
            }))
          ]
        }))
      )
    } catch (e) {
      console.error("Erro ao buscar calendário:", e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCalendarios()
  }, [])

  // -----------------------------------------------------
  // ✅ Evento clicado no calendário → abre modal
  // -----------------------------------------------------
  const handleEventClick = (info) => {
    const calendarioPai = calendarios.find(cal =>
      (cal.eventos_academicos || []).some(ev => ev.id === info.event.id)
    )

    const evento = (calendarioPai?.eventos_academicos || []).find(ev => ev.id === info.event.id)

    setEventoSelecionado({
      ...evento,
      calendario_id: calendarioPai?.id
    })

    setShowModal(true)
  }

  // -----------------------------------------------------
  // ✅ Criar evento por clique na data
  // -----------------------------------------------------
  const handleDateClick = (info) => {
    setEventoSelecionado({
      data_inicio: info.dateStr,
      data_fim: info.dateStr
    })
    setShowModal(true)
  }

  // -----------------------------------------------------
  // ✅ Após salvar ou editar → recarregar calendário
  // -----------------------------------------------------
  const handleEventoSalvo = () => {
    fetchCalendarios()
    setShowModal(false)
    setEventoSelecionado(null)
  }

  // -----------------------------------------------------
  // ✅ Filtrar calendários
  // -----------------------------------------------------
  const handleFiltrar = (filtros) => {
    fetchCalendarios(filtros)
  }

  if (loading) {
    return (
      <div className="text-center p-5">
        <CSpinner color="primary" />
      </div>
    )
  }

  // juntar todos os eventos de todos calendários
  const todosEventos = calendarios.flatMap(cal => cal.events || [])

  return (
    <CContainer className="py-4">
      <CCardHeader className="mb-4">
        <strong>Gestão de Calendário Acadêmico</strong>
      </CCardHeader>

      <ModalFiltrosCalendario onFiltrar={handleFiltrar} />

      <CRow className="my-3">
        <CCol xs={12} className="d-flex justify-content-end">
          <CButton color="success" onClick={() => {
            setEventoSelecionado(null)
            setShowModal(true)
          }}>
            + Adicionar Evento
          </CButton>
        </CCol>
      </CRow>

      <CCard>
        <CCardBody>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,dayGridWeek"
            }}
            events={todosEventos}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
          />
        </CCardBody>
      </CCard>

      {showModal && (
        <ModalCalendario
          show={showModal}
          evento={eventoSelecionado}
          onClose={() => setShowModal(false)}
          onSalvo={handleEventoSalvo}
        />
      )}
    </CContainer>
  )
}

export default GestaoCalendarioPage
