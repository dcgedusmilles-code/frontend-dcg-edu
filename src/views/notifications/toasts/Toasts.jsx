import React, { useEffect, useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CContainer,
} from '@coreui/react'
import axios from '../../../api'
import ModalDisciplina from './ModalCadastroDisciplina'
import ModalFiltrosDisciplina from './ModalFiltrosDisciplina'

const GestaoDisciplinasPage = () => {
  const [disciplinas, setDisciplinas] = useState([])
  const [cursos, setCursos] = useState([])
  const [modalAberto, setModalAberto] = useState(false)
  const [disciplinaEditando, setDisciplinaEditando] = useState(null)

  useEffect(() => {
    fetchDisciplinas()
    fetchCursos()
  }, [])

  const fetchDisciplinas = async (filters = {}) => {
    let url = '/pedagogico/disciplines'
    const params = {}

    if (filters.curso_id) params.curso_id = filters.curso_id
    if (filters.nome) params.nome = filters.nome

    const { data } = await axios.get(url, { params })
    setDisciplinas(data)
  }

  const fetchCursos = async () => {
    const { data } = await axios.get('/training-coordinators/courses')
    setCursos(data)
  }

  const abrirModalNovo = () => {
    setDisciplinaEditando(null)
    setModalAberto(true)
  }

  const abrirModalEditar = (disciplina) => {
    setDisciplinaEditando(disciplina)
    setModalAberto(true)
  }

  return (
    <CContainer className="my-4">

      <CRow className="mb-3">
        <CCol>
          <CButton color="success" onClick={abrirModalNovo}>
            Nova Disciplina
          </CButton>
        </CCol>
      </CRow>

      <ModalFiltrosDisciplina cursos={cursos} onFiltrar={fetchDisciplinas} />

      <CCard>
        <CCardHeader>Lista de Disciplinas</CCardHeader>
        <CCardBody>
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Carga Horária</th>
                <th>Curso</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {disciplinas.map((d) => (
                <tr key={d.id}>
                  <td>{d.id}</td>
                  <td>{d.nome}</td>
                  <td>{d.carga_horaria}h</td>
                  <td>{d.curso?.titulo}</td>
                  <td>{d.descricao}</td>
                  <td>
                    <CButton
                      color="info"
                      size="sm"
                      onClick={() => abrirModalEditar(d)}
                    >
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
        <ModalDisciplina
          disciplinaEditando={disciplinaEditando}
          cursos={cursos}
          onSalvo={() => {
            setModalAberto(false)
            fetchDisciplinas()
          }}
        />
      )}

    </CContainer>
  )
}

export default GestaoDisciplinasPage
