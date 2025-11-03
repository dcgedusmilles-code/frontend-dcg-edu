import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow, CSpinner } from '@coreui/react'

import ModalAluno from './ModalAluno'
import ModalFiltros from './ModalFiltros'
import { AppBreadcrumb, ModalConfirmacao, PaginationWrapper } from '../../../components'

const Accordion = () => {
  const [alunos, setAlunos] = useState([])
  const [alunoEditando, setAlunoEditando] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [alunoParaExcluir, setAlunoParaExcluir] = useState(null)
  const [loading, setLoading] = useState(false)

  const [tipoClientes] = useState([])
  const [municipios] = useState([])

  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

  useEffect(() => {
    fetchAlunos()
  }, [])

  const fetchAlunos = async (filters = {}) => {
    try {
      setLoading(true)
      let url = `${API_BASE_URL}/secretaria-academica/students`

      const params = new URLSearchParams()
      if (filters.search) params.append('search', filters.search)
      if (filters.startDate) params.append('startDate', filters.startDate)
      if (filters.endDate) params.append('endDate', filters.endDate)
      if (filters.orderBy) params.append('orderBy', filters.orderBy)
      if (filters.perPage) params.append('perPage', filters.perPage)

      const token = localStorage.getItem('accessToken')
      const response = await axios.get(`${url}?${params.toString()}`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setAlunos(response.data || [])
    } catch (error) {
      console.error('Erro ao buscar alunos:', error.response?.data || error.message)
    } finally {
      setLoading(false)
    }
  }

  const deletarAluno = async (id) => {
    try {
      const token = localStorage.getItem('accessToken')
      await axios.delete(`${API_BASE_URL}/secretaria-academica/students/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setAlunos((prev) => prev.filter((aluno) => aluno.id !== id))
    } catch (error) {
      console.error('Erro ao deletar aluno:', error.response?.data || error.message)
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
          <ModalFiltros
            onFiltrar={handleFiltrar}
            tipoClientes={tipoClientes}
            municipios={municipios}
          />
        </CContainer>

        <CRow className="my-4">
          <CCol md={8}></CCol>
          <CCol xs={6} md={4} className="d-flex justify-content-end gap-2">
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

        <CCard className="my-4">
          <CCardBody>
            <PaginationWrapper data={alunos} itemsPerPage={5}>
              {(paginaAtual) => (
                <div class="table_wrapper">
                  <table className="table table-bordered table-striped align-middle">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Data de Nascimento</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Status</th>
                        <th>Endereço</th>
                        <th>Responsáveis</th>
                        <th>Matrículas</th>
                        <th>Documentos</th>
                        <th>Transferências</th>
                        <th>Históricos</th>
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
                            <td>{aluno?.nome ?? '-'}</td>
                            <td>
                              {aluno?.data_nascimento
                                ? new Date(aluno.data_nascimento).toLocaleDateString('pt-PT')
                                : '-'}
                            </td>
                            <td>{aluno?.email ?? '-'}</td>
                            <td>{aluno?.telefone ?? '-'}</td>
                            <td>{aluno?.status ?? '-'}</td>
                            <td>{aluno?.endereco ?? '-'}</td>
                            <td>
                              {aluno?.encarregados?.length
                                ? aluno.encarregados.map((e) => e.nome).join(', ')
                                : '-'}
                            </td>
                            <td>
                              {aluno?.matriculas?.length
                                ? aluno.matriculas.map((m) => m.curso_nome ?? m.id).join(', ')
                                : '-'}
                            </td>
                            <td>
                              {aluno?.documentos?.length
                                ? aluno.documentos.map((d) => d.tipo ?? d.nome).join(', ')
                                : '-'}
                            </td>
                            <td>
                              {aluno?.transferencias?.length
                                ? aluno.transferencias.map((t) => t.destino ?? t.id).join(', ')
                                : '-'}
                            </td>
                            <td>
                              {aluno?.historicos?.length
                                ? aluno.historicos.map((h) => h.descricao ?? h.id).join(', ')
                                : '-'}
                            </td>
                            <td>
                              {aluno?.protocolos?.length
                                ? aluno.protocolos.map((p) => p.tipo ?? p.id).join(', ')
                                : '-'}
                            </td>
                            <td>
                              {aluno?.agendamentos?.length
                                ? aluno.agendamentos.map((a) => a.data ?? a.id).join(', ')
                                : '-'}
                            </td>
                            <td>
                              <div className="dropdown">
                                <button
                                  className="btn btn-secondary btn-sm dropdown-toggle"
                                  type="button"
                                  id={`dropdownMenu-${aluno.id}`}
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  Ações
                                </button>

                                <ul
                                  className="dropdown-menu"
                                  aria-labelledby={`dropdownMenu-${aluno.id}`}
                                >
                                  <li>
                                    <button
                                      className="dropdown-item btn-sm"
                                      data-bs-toggle="modal"
                                      data-bs-target="#modalAluno"
                                      onClick={() => abrirModalEditar(aluno)}
                                    >
                                      <i className="fa fa-edit"></i> Editar
                                    </button>
                                  </li>
                                  <li>
                                    <button
                                      className="dropdown-item btn-sm text-danger"
                                      onClick={() => confirmarExclusao(aluno)}
                                    >
                                      <i className="fa fa-trash"></i> Excluir
                                    </button>
                                  </li>
                                </ul>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={15} className="text-center py-4">
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
