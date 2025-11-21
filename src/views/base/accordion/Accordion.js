// src/views/secretaria/alunos/Accordion.jsx

import React, { useEffect, useState } from 'react'
import axios from '../../../api'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow, CSpinner } from '@coreui/react'

import ModalAluno from './ModalAluno'
import ModalFiltros from './ModalFiltros'
import { ModalConfirmacao, PaginationWrapper } from '../../../components'

const Accordion = () => {
  const [alunos, setAlunos] = useState([])
  const [alunoEditando, setAlunoEditando] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [alunoParaExcluir, setAlunoParaExcluir] = useState(null)
  const [loading, setLoading] = useState(false)


  useEffect(() => {
    fetchAlunos()
  }, [])

  const fetchAlunos = async (filters = {}) => {
    try {
      setLoading(true)

      let url = `/secretaria-academica/students`
      const params = new URLSearchParams()

      if (filters.search) params.append('search', filters.search)
      if (filters.orderBy) params.append('orderBy', filters.orderBy)

      const token = localStorage.getItem('accessToken')
      const response = await axios.get(`${url}?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setAlunos(response.data || [])
    } catch (error) {
      console.error('Erro ao buscar alunos:', error)
    } finally {
      setLoading(false)
    }
  }

  const deletarAluno = async (id) => {
    try {
      const token = localStorage.getItem('accessToken')
      await axios.delete(`/secretaria-academica/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setAlunos((prev) => prev.filter((a) => a.id !== id))
    } catch (error) {
      console.error('Erro ao deletar aluno:', error)
    }
  }

  const confirmarExclusao = (aluno) => {
    setAlunoParaExcluir(aluno)
    setShowConfirm(true)
  }

  const handleConfirmDelete = () => {
    if (alunoParaExcluir) deletarAluno(alunoParaExcluir.id)
    setShowConfirm(false)
  }

  const abrirModalNovo = () => setAlunoEditando(null)
  const abrirModalEditar = (aluno) => setAlunoEditando(aluno)

  const handleFiltrar = (filters) => fetchAlunos(filters)

  if (loading) {
    return (
      <div className="text-center p-5">
        <CSpinner color="primary" />
      </div>
    )
  }

  return (
    <CRow>
      <CCol xs={12}>

        <CCardHeader className="my-4">
          <strong>Gestão de Alunos</strong>
        </CCardHeader>

        <CContainer className="px-4">
          <ModalFiltros onFiltrar={handleFiltrar} />
        </CContainer>

        <CRow className="my-4">
          <CCol xs={6} md={4} className="d-flex justify-content-end ms-auto">
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modalAluno"
              onClick={abrirModalNovo}
            >
              Registrar Aluno
            </button>
          </CCol>
        </CRow>

        <CCard>
          <CCardBody>
            <PaginationWrapper data={alunos} itemsPerPage={5}>
              {(paginaAtual) => (
                <div className="table_wrapper">
                  <table className="table table-bordered table-striped align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Data Nascimento</th>
                        <th>Sexo</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Documento</th>
                        <th>Endereço</th>
                        <th>Status</th>

                        {/* Relacionamentos permitidos */}
                        <th>Unidade</th>
                        <th>Turma</th>

                        <th>Encarregados</th>
                        <th>Matrículas</th>
                        <th>Mensalidades</th>
                        <th>Contas</th>
                        <th>Históricos</th>
                        <th>Documentos</th>
                        <th>Transferências</th>
                        <th>Protocolos</th>
                        <th>Atendimentos</th>

                        <th>Ações</th>
                      </tr>
                    </thead>

                    <tbody>
                      {paginaAtual?.length ? (
                        paginaAtual.map((aluno) => (
                          <tr key={aluno.id}>
                            <td>{aluno.id}</td>
                            <td>{aluno.nome}</td>
                            <td>
                              {aluno.data_nascimento
                                ? new Date(aluno.data_nascimento).toLocaleDateString('pt-PT')
                                : '-'}
                            </td>
                            <td>{aluno.sexo ?? '-'}</td>
                            <td>{aluno.email ?? '-'}</td>
                            <td>{aluno.telefone ?? '-'}</td>
                            <td>{aluno.documento ?? '-'}</td>
                            <td>{aluno.endereco ?? '-'}</td>
                            <td>{aluno.status ?? '-'}</td>

                            <td>{aluno.unidade?.nome ?? '-'}</td>
                            <td>{aluno.turma?.nome ?? '-'}</td>

                            <td>{aluno.encarregados?.map((e) => e.nome).join(', ') || '-'}</td>
                            <td>{aluno.matriculas?.length || 0}</td>
                            <td>{aluno.mensalidades?.length || 0}</td>
                            <td>{aluno.contas?.length || 0}</td>
                            <td>{aluno.historicos?.length || 0}</td>
                            <td>{aluno.documentos?.length || 0}</td>
                            <td>{aluno.transferencias?.length || 0}</td>
                            <td>{aluno.protocolos?.length || 0}</td>
                            <td>{aluno.agendamentos?.length || 0}</td>

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
                                      className="dropdown-item"
                                      data-bs-toggle="modal"
                                      data-bs-target="#modalAluno"
                                      onClick={() => abrirModalEditar(aluno)}
                                    >
                                      Editar
                                    </button>
                                  </li>

                                  <li>
                                    <button
                                      className="dropdown-item text-danger"
                                      onClick={() => confirmarExclusao(aluno)}
                                    >
                                      Excluir
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={21} className="text-center py-4">
                            Nenhum aluno encontrado.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </PaginationWrapper>

            <ModalAluno alunoEditando={alunoEditando} onSalvo={() => fetchAlunos()} />

            <ModalConfirmacao
              show={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={handleConfirmDelete}
              title="Excluir Aluno"
              message={`Tem certeza que deseja excluir o aluno "${alunoParaExcluir?.nome}"?`}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Accordion
