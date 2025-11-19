import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CContainer } from '@coreui/react'
import api from '../../../api'

import ModalTurma from './ModalCriarTurma'
import ModalFiltrosTurma from './ModalFiltrarTurma'

const GestaoTurmasPage = () => {
  const [turmas, setTurmas] = useState([])
  const [cursos, setCursos] = useState([])
  const [coordenadores, setCoordenadores] = useState([])

  const [modalAberto, setModalAberto] = useState(false)
  const [turmaEditando, setTurmaEditando] = useState(null)

  useEffect(() => {
    fetchTurmas()
    fetchSelects()
  }, [])

  const fetchTurmas = async (filters = {}) => {
    try {
      const res = await api.get('/training-coordinators/class-teacher/turmas', { params: filters })
      setTurmas(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchSelects = async () => {
    const resCursos = await api.get('/training-coordinators/courses')
    const resCoord = await api.get('/training-coordinators/coordinator/coordenadores')

    setCursos(resCursos.data)
    setCoordenadores(resCoord.data)
  }

  const abrirNovo = () => {
    setTurmaEditando(null)
    setModalAberto(true)
  }

  const abrirEditar = (t) => {
    setTurmaEditando(t)
    setModalAberto(true)
  }

  return (
    <CContainer className="my-4">
      <CRow className="mb-3">
        <CCol>
          <CButton color="success" onClick={abrirNovo}>Nova Turma</CButton>
        </CCol>
      </CRow>

      <ModalFiltrosTurma cursos={cursos} coordenadores={coordenadores} onFiltrar={fetchTurmas} />

      <CCard>
        <CCardHeader>Lista de Turmas</CCardHeader>
        <CCardBody>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Ano</th>
                <th>Semestre</th>
                <th>Curso</th>
                <th>Coordenador</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {turmas.map((t) => (
                <tr key={t.id}>
                  <td>{t.id}</td>
                  <td>{t.nome}</td>
                  <td>{t.ano}</td>
                  <td>{t.semestre}</td>
                  <td>{t.curso?.titulo}</td>
                  <td>{t.coordenador?.nome}</td>
                  <td>
                    <CButton size="sm" color="info" onClick={() => abrirEditar(t)}>
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
        <ModalTurma
          turmaEditando={turmaEditando}
          cursos={cursos}
          coordenadores={coordenadores}
          onSalvo={() => {
            setModalAberto(false)
            fetchTurmas()
          }}
        />
      )}
    </CContainer>
  )
}

export default GestaoTurmasPage
