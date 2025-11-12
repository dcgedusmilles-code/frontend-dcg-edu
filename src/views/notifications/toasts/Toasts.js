import React, { useEffect, useState } from 'react'
import axios from '../../../api'
import { PaginationWrapper, ModalConfirmacao } from '../../../components'
import ModalCadastroDisciplina from './ModalCadastroDisciplina'

const API = `/pedagogico/disciplines`

const ControleDisciplinas = () => {
  const [disciplinas, setDisciplinas] = useState([])
  const [filtros, setFiltros] = useState({ nome: '', codigo: '' })
  const [loading, setLoading] = useState(false)
  const [disciplinaEditando, setDisciplinaEditando] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [disciplinaParaExcluir, setDisciplinaParaExcluir] = useState(null)

  // -----------------------------------------------------------------
  // ✅ Buscar Disciplinas com filtros
  // -----------------------------------------------------------------
  const fetchDisciplinas = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()

      if (filtros.nome) params.nome = filtros.nome
      if (filtros.codigo) params.codigo = filtros.codigo

      const data  = await axios.get(`${API}?${params}`)
      const response = data.data
      console.log("Dadosssssss", data )
      setDisciplinas(response || [])
    } catch (error) {
      console.error('Erro ao buscar disciplinas:', error)
      // alert('Erro ao carregar disciplinas.',)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDisciplinas()
  }, [])

  // -----------------------------------------------------------------
  // ✅ Confirmação de exclusão
  // -----------------------------------------------------------------
  const confirmarExclusao = (disciplina) => {
    setDisciplinaParaExcluir(disciplina)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (!disciplinaParaExcluir) return

    try {
      await axios.delete(`${API}/${disciplinaParaExcluir.id}`)
      fetchDisciplinas()
    } catch (error) {
      console.error('Erro ao excluir disciplina:', error)
      alert('Erro ao excluir disciplina.')
    } finally {
      setShowConfirm(false)
    }
  }

  return (
    <div className="container-fluid">
      <h4 className="mb-4">Controle de Disciplinas</h4>

      {/* 🔍 Filtros */}
      <div className="card mb-3">
        <div className="card-header">
          <strong>Filtros</strong>
        </div>
        <div className="card-body">
          <div className="row g-3 align-items-end">
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Nome da Disciplina"
                value={filtros.nome}
                onChange={(e) => setFiltros({ ...filtros, nome: e.target.value })}
              />
            </div>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Código"
                value={filtros.codigo}
                onChange={(e) => setFiltros({ ...filtros, codigo: e.target.value })}
              />
            </div>
            <div className="col-md-2 d-grid">
              <button
                className="btn btn-primary"
                onClick={fetchDisciplinas}
                disabled={loading}
              >
                {loading ? 'Filtrando...' : 'Filtrar'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ➕ Botão Nova Disciplina */}
      <div className="mb-3 text-end">
        <button
          className="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#modalCadastroDisciplina"
          onClick={() => setDisciplinaEditando(null)}
        >
          + Nova Disciplina
        </button>
      </div>

      {/* 📋 Tabela */}
      <div className="card">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" />
            </div>
          ) : disciplinas.length === 0 ? (
            <p className="text-center my-4 text-muted">Nenhuma disciplina encontrada.</p>
          ) : (
            <PaginationWrapper data={disciplinas} itemsPerPage={6}>
              {(paginaAtual) => (
                <table className="table table-bordered table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Nome</th>
                      <th>Código</th>
                      <th>Carga Horária</th>
                      <th>Descrição</th>
                      <th style={{ width: 120 }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginaAtual.map((d) => (
                      <tr key={d.id}>
                        <td>{d.id}</td>
                        <td>{d.nome}</td>
                        <td>{d.codigo}</td>
                        <td>{d.carga_horaria}h</td>
                        <td>{d.descricao || '-'}</td>
                        <td className="text-center">
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-sm dropdown-toggle"
                              data-bs-toggle="dropdown"
                            >
                              Ações
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li>
                                <button
                                  className="dropdown-item"
                                  data-bs-toggle="modal"
                                  data-bs-target="#modalCadastroDisciplina"
                                  onClick={() => setDisciplinaEditando(d)}
                                >
                                  Editar
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item text-danger"
                                  onClick={() => confirmarExclusao(d)}
                                >
                                  Excluir
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
        </div>
      </div>

      {/* 🧾 Modal Cadastro */}
      <ModalCadastroDisciplina
        disciplinaEditando={disciplinaEditando}
        onSalvo={fetchDisciplinas}
      />

      {/* ⚠️ Modal Confirmação */}
      <ModalConfirmacao
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        title="Excluir Disciplina"
        message={`Tem certeza que deseja excluir a disciplina "${disciplinaParaExcluir?.nome}"?`}
      />
    </div>
  )
}

export default ControleDisciplinas
