import React, { useState, useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CContainer } from '@coreui/react'
import axios from '../../../api' // <-- seu axios configurado com baseURL
import ModalCurso from './ModalCurso'
import ModalFiltroCurso from './ModalFiltroCurso'

const GestaoCursosPage = () => {
  const [cursos, setCursos] = useState([])
  const [coordenadores, setCoordenadores] = useState([])
  const [modalAberto, setModalAberto] = useState(false)
  const [cursoEditando, setCursoEditando] = useState(null)

  useEffect(() => {
    fetchCursos()
    fetchCoordenadores()
  }, [])

  const fetchCursos = async (filters = {}) => {
    try {
      const response = await axios.get('/training-coordinators/courses', { params: filters })
      setCursos(response.data)
    } catch (error) {
      console.error('Erro ao buscar cursos:', error)
    }
  }

  // const fetchCoordenadores = async () => {
  //   try {
  //     const response = await axios.get('/training-coordinators/training-coordinators')
  //     setCoordenadores(response.data)
  //   } catch (error) {
  //     console.error('Erro ao carregar coordenadores:', error)
  //   }
  // }

    const fetchCoordenadores = async (filters = {}) => {
      try {
        const response = await axios.get('/training-coordinators/training-coordinators', {
          params: filters,
        })
        setCoordenadores(response.data)
      } catch (error) {
        console.error('Erro ao buscar coordenadores:', error)
      }
    }

  const abrirModalNovo = () => {
    setCursoEditando(null)
    setModalAberto(true)
    fetchCoordenadores()
  }

  const abrirModalEditar = (curso) => {
    setCursoEditando(curso)
    setModalAberto(true)
  }

  return (
    <CContainer className="my-4">
      <CRow className="mb-3">
        <CCol>
          <CButton color="success" onClick={abrirModalNovo}>
            Novo Curso
          </CButton>
        </CCol>
      </CRow>

      <ModalFiltroCurso onFiltrar={fetchCursos} coordenadores={coordenadores} />

      <CCard className="mt-4">
        <CCardHeader>Lista de Cursos</CCardHeader>
        <CCardBody>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Título</th>
                <th>Coordenador</th>
                <th>Modalidade</th>
                <th>Nível</th>
                <th>Carga Horária</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {cursos.map((curso) => (
                <tr key={curso.id}>
                  <td>{curso.id}</td>
                  <td>{curso.titulo}</td>
                  <td>{curso.coordenador?.nome}</td>
                  <td>{curso.modalidade}</td>
                  <td>{curso.nivel}</td>
                  <td>{curso.carga_horaria}h</td>
                  <td>
                    <CButton size="sm" color="info" onClick={() => abrirModalEditar(curso)}>
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
        <ModalCurso
          cursoEditando={cursoEditando}
          coordenadores={coordenadores}
          onClose={() => setModalAberto(false)}
          onSalvo={fetchCursos}
        />
      )}
    </CContainer>
  )
}

export default GestaoCursosPage
