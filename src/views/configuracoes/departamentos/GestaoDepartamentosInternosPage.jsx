import React, { useState, useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CContainer } from '@coreui/react'
import axios from '../../../api' // <-- seu axios configurado com baseURL
import ModalDepartamentoInterno from './ModalDepartamentoInterno'
import ModalFiltroDepartamentoInterno from './ModalFiltroDepartamentoInterno'

const GestaoDepartamentosInternosPage = () => {
  const [departamentos, setDepartamentos] = useState([])
  const [modalAberto, setModalAberto] = useState(false)
  const [departamentoEditando, setDepartamentoEditando] = useState(null)

  useEffect(() => {
    fetchDepartamentos()
  }, [])

  const fetchDepartamentos = async (filters = {}) => {
    try {
      const response = await axios.get('/human-resources/internal-departments', { params: filters })
      setDepartamentos(response.data)
    } catch (error) {
      console.error('Erro ao buscar departamentos:', error)
    }
  }

  const abrirModalNovo = () => {
    setDepartamentoEditando(null)
    setModalAberto(true)
  }

  const abrirModalEditar = (departamento) => {
    setDepartamentoEditando(departamento)
    setModalAberto(true)
  }

  return (
    <CContainer className="my-4">
      <ModalFiltroDepartamentoInterno onFiltrar={fetchDepartamentos} />

      <CRow className="mb-3">
        <CCol>
          <CButton color="success" onClick={abrirModalNovo}>
            Novo Departamento
          </CButton>
        </CCol>
      </CRow>

      <CCard className="mt-4">
        <CCardHeader>Lista de Departamentos Internos</CCardHeader>
        <CCardBody>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {departamentos.map((dep) => (
                <tr key={dep.id}>
                  <td>{dep.id}</td>
                  <td>{dep.nome}</td>
                  <td>{dep.descricao}</td>
                  <td>
                    <CButton size="sm" color="info" onClick={() => abrirModalEditar(dep)}>
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
        <ModalDepartamentoInterno
          departamentoEditando={departamentoEditando}
          onClose={() => setModalAberto(false)}
          onSalvo={fetchDepartamentos}
        />
      )}
    </CContainer>
  )
}

export default GestaoDepartamentosInternosPage
