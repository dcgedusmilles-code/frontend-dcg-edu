import React, { useEffect, useState } from 'react'
import axios from '../../../api'
import { CCard, CCardBody, CCardHeader, CCol, CRow, CContainer } from '@coreui/react'
import ModalProfessor from './ModalProfessor'
import ModalFiltrosProfessores from './ModalFiltrosProfessores'
import { PaginationWrapper, ModalConfirmacao } from '../../../components'

const API = '/pedagogico/teachers'

const GestaoProfessores = () => {
  const [professores, setProfessores] = useState([])
  const [filtros, setFiltros] = useState({ nome: '', email: '', departamento: '' })
  const [loading, setLoading] = useState(false)
  const [professorEditando, setProfessorEditando] = useState(null)
  const [professorParaExcluir, setProfessorParaExcluir] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  // ------------------------------------------------------------------
  // ✅ Buscar professores com filtros
  // ------------------------------------------------------------------
  const fetchProfessores = async () => {
    try {
      setLoading(true)
      const params = {}
      if (filtros.nome) params.nome = filtros.nome
      if (filtros.email) params.email = filtros.email
      if (filtros.departamento) params.departamento = filtros.departamento

      const { data } = await axios.get(API, { params })
      setProfessores(data || [])
    } catch (error) {
      console.error('Erro ao buscar professores:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfessores()
  }, [])

  // ------------------------------------------------------------------
  // 🗑️ Exclusão com confirmação
  // ------------------------------------------------------------------
  const confirmarExclusao = (prof) => {
    setProfessorParaExcluir(prof)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (!professorParaExcluir) return
    try {
      await axios.delete(`${API}/${professorParaExcluir.id}`)
      fetchProfessores()
    } catch (error) {
      console.error('Erro ao excluir professor:', error)
      alert('Erro ao excluir professor.')
    } finally {
      setShowConfirm(false)
    }
  }

  // ------------------------------------------------------------------
  // 🔍 Filtro via componente filho
  // ------------------------------------------------------------------
  const handleFiltrar = (filters) => {
    setFiltros(filters)
    fetchProfessores(filters)
  }

  // ------------------------------------------------------------------
  // 🧾 Renderização
  // ------------------------------------------------------------------
  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Gestão de Professores</strong>
        </CCardHeader>

        <CContainer className="px-4">
          <ModalFiltrosProfessores onFiltrar={handleFiltrar} />
        </CContainer>

        <CRow className="my-4">
          <CCol md={8}></CCol>
          <CCol xs={6} md={4} className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modalProfessor"
              onClick={() => setProfessorEditando(null)}
            >
              Registrar Professor
            </button>
          </CCol>
        </CRow>

        <CCard className="my-4">
          <CCardBody>
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-primary" />
              </div>
            ) : professores.length === 0 ? (
              <p className="text-center text-muted my-4">Nenhum professor encontrado.</p>
            ) : (
              <PaginationWrapper data={professores} itemsPerPage={5}>
                {(paginaAtual) => (
                  <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Formação</th>
                        <th>Departamento</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginaAtual.map((prof) => (
                        <tr key={prof.id}>
                          <td>{prof.id}</td>
                          <td>{prof.nome}</td>
                          <td>{prof.email}</td>
                          <td>{prof.telefone || '-'}</td>
                          <td>{prof.formacao || '-'}</td>
                          <td>{prof.departamento?.nome || '-'}</td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary btn-sm dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                              >
                                Ações
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <button
                                    className="dropdown-item btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target="#modalProfessor"
                                    onClick={() => setProfessorEditando(prof)}
                                  >
                                    <i className="fa fa-edit"></i> Editar
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item btn-sm text-danger"
                                    onClick={() => confirmarExclusao(prof)}
                                  >
                                    <i className="fa fa-trash"></i> Excluir
                                  </button>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </PaginationWrapper>
            )}

            {/* 🧾 Modal Cadastro */}
            <ModalProfessor professorEditando={professorEditando} onSalvo={fetchProfessores} />

            {/* ⚠️ Modal Confirmação */}
            <ModalConfirmacao
              show={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={handleConfirmDelete}
              title="Excluir Professor"
              message={`Tem certeza que deseja excluir o professor "${professorParaExcluir?.nome}"?`}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GestaoProfessores
