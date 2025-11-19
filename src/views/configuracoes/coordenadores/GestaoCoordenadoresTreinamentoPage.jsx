import React, { useState, useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CContainer } from '@coreui/react'
import axios from '../../../api' // <-- seu axios configurado com baseURL
import ModalCoordenadorTreinamento from './ModalCoordenadorTreinamento'
import ModalFiltroCoordenadorTreinamento from './ModalFiltroCoordenadorTreinamento'

const GestaoCoordenadoresTreinamentoPage = () => {
  const [coordenadores, setCoordenadores] = useState([])
  const [departamentos, setDepartamentos] = useState([])
  const [modalAberto, setModalAberto] = useState(false)
  const [coordenadorEditando, setCoordenadorEditando] = useState(null)

  useEffect(() => {
    fetchCoordenadores()
    fetchDepartamentos()
  }, [])

  const fetchCoordenadores = async (filters = {}) => {
    try {
      const response = await axios.get('/training-coordinators/coordinator/coordenadores', {
        params: filters,
      })
      setCoordenadores(response.data)
    } catch (error) {
      console.error('Erro ao buscar coordenadores:', error)
    }
  }

  const fetchDepartamentos = async () => {
    try {
      const response = await axios.get('/human-resources/internal-departments')
      setDepartamentos(response.data)
    } catch (error) {
      console.error('Erro ao carregar departamentos:', error)
    }
  }

  

  const abrirModalNovo = () => {
    setCoordenadorEditando(null)
    setModalAberto(true)
    fetchDepartamentos()
  }

  const abrirModalEditar = (coordenador) => {
    setCoordenadorEditando(coordenador)
    setModalAberto(true)
  }

  return (
    <CContainer className="my-4">

      <ModalFiltroCoordenadorTreinamento
        onFiltrar={fetchCoordenadores}
        departamentos={departamentos}
      />
      <CRow className="mb-3">
        <CCol>
          <CButton color="success" onClick={abrirModalNovo}>
            Novo Coordenador
          </CButton>
        </CCol>
      </CRow>

      <CCard className="mt-4">
        <CCardHeader>Lista de Coordenadores de Treinamento</CCardHeader>
        <CCardBody>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Departamento</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {coordenadores.map((coord) => (
                <tr key={coord.id}>
                  <td>{coord.id}</td>
                  <td>{coord.nome}</td>
                  <td>{coord.email}</td>
                  <td>{coord.telefone}</td>
                  <td>{coord.departamento?.nome}</td>
                  <td>
                    <CButton size="sm" color="info" onClick={() => abrirModalEditar(coord)}>
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
        <ModalCoordenadorTreinamento
          coordenadorEditando={coordenadorEditando}
          departamentos={departamentos}
          onClose={() => setModalAberto(false)}
          onSalvo={fetchCoordenadores}
        />
      )}
    </CContainer>
  )
}

export default GestaoCoordenadoresTreinamentoPage
