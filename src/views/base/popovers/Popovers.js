import React, { useState, useEffect } from 'react'
import axios from '../../../api' // <-- seu axios configurado com baseURL
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CContainer } from '@coreui/react'
import ModalAula from './ModalAula'
import ModalFiltrosAula from './ModalFiltrosAula'
const API = '/pedagogico/lesson-plan'


const GestaoAulasPage = () => {
  const [aulas, setAulas] = useState([])
  const [modalAberto, setModalAberto] = useState(false)
  const [aulaEditando, setAulaEditando] = useState(null)

  // Dados para selects
  const [turmas, setTurmas] = useState([])
  const [disciplinas, setDisciplinas] = useState([])
  const [professores, setProfessores] = useState([])

  useEffect(() => {
    fetchAulas()
    fetchSelects()
  }, [])

  // ===============================
  // Fetch de aulas com filtros
  // ===============================
  const fetchAulas = async (filters = {}) => {
    try {
      const response = await axios.get(API, { params: filters })
      setAulas(response.data)
    } catch (error) {
      console.error('Erro ao buscar aulas:', error)
    }
  }

  // ===============================
  // Fetch para selects
  // ===============================
  const fetchSelects = async () => {
    try {
      const [turmasRes, disciplinasRes, professoresRes] = await Promise.all([
        axios.get('/pedagogico/classroom'),
        axios.get('/pedagogico/disciplines'),
        axios.get('/pedagogico/teachers'),
      ])
      setTurmas(turmasRes.data || [])
      setDisciplinas(disciplinasRes.data || [])
      setProfessores(professoresRes.data || [])
    } catch (error) {
      console.error('Erro ao buscar dados para selects:', error)
    }
  }

  const abrirModalNovo = () => {
    setAulaEditando(null)
    setModalAberto(true)
  }

  const abrirModalEditar = (aula) => {
    setAulaEditando(aula)
    setModalAberto(true)
  }

  return (
    <CContainer className="my-4">
      <CRow className="mb-3">
        <CCol>
          <CButton color="success" onClick={abrirModalNovo}>
            Nova Aula
          </CButton>
        </CCol>
      </CRow>

      <ModalFiltrosAula
        turmas={turmas}
        disciplinas={disciplinas}
        professores={professores}
        onFiltrar={fetchAulas}
      />

      <CCard className="mt-4">
        <CCardHeader>Lista de Aulas</CCardHeader>
        <CCardBody>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Turma</th>
                <th>Disciplina</th>
                <th>Professor</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Sala</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {aulas.map((aula) => (
                <tr key={aula.id}>
                  <td>{aula.id}</td>
                  <td>{aula.turma?.nome}</td>
                  <td>{aula.disciplina?.nome}</td>
                  <td>{aula.professor?.nome}</td>
                  <td>{aula.data_aula}</td>
                  <td>
                    {aula.hora_inicio} - {aula.hora_fim}
                  </td>
                  <td>{aula.sala}</td>
                  <td>{aula.status}</td>
                  <td>
                    <CButton size="sm" color="info" onClick={() => abrirModalEditar(aula)}>
                      Editar
                    </CButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CCardBody>
      </CCard>

      {modalAberto && (
        <ModalAula
          aulaEditando={aulaEditando}
          turmas={turmas}
          disciplinas={disciplinas}
          professores={professores}
          onSalvo={() => {
            setModalAberto(false)
            fetchAulas()
          }}
        />
      )}
    </CContainer>
  )
}

export default GestaoAulasPage
