import React, { useEffect, useState } from 'react'
import axios from '../../../api'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow
} from '@coreui/react'

import { ModalConfirmacao, PaginationWrapper } from '../../../components'
import ModalFiltros from './ModalFiltrosHistoricoAcademico'

const HistoricoEscolarPage = () => {
  const [historico, setHistorico] = useState([])
  const [historicoFiltrado, setHistoricoFiltrado] = useState([])
  const [registroParaExcluir, setRegistroParaExcluir] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    fetchHistorico()
  }, [])

  // ============================
  // BUSCA API
  // ============================
  const fetchHistorico = async () => {
    try {
      const res = await axios.get('/secretaria-academica/academic-records')
      const dados = res.data || []
      setHistorico(dados)
      setHistoricoFiltrado(dados)
    } catch (error) {
      console.error('Erro ao carregar histórico:', error)
    }
  }

  // ============================
  // FILTRAGEM
  // ============================
  const onFiltrar = (filters) => {
    let filtradas = [...historico]

    // ano inicial
    if (filters.startDate) {
      filtradas = filtradas.filter(
        (h) => Number(h.ano) >= Number(filters.startDate)
      )
    }

    // ano final
    if (filters.endDate) {
      filtradas = filtradas.filter(
        (h) => Number(h.ano) <= Number(filters.endDate)
      )
    }

    // filtro por disciplina
    if (filters.disciplina) {
      const termo = filters.disciplina.toLowerCase()
      filtradas = filtradas.filter((h) =>
        h.disciplina?.nome?.toLowerCase().includes(termo)
      )
    }

    // filtro por resultado (resultado substitui “situação”)
    if (filters.situacao) {
      filtradas = filtradas.filter(
        (h) =>
          h.resultado?.toLowerCase() === filters.situacao.toLowerCase()
      )
    }

    // pesquisa rápida
    if (filters.search) {
      const termo = filters.search.toLowerCase()

      filtradas = filtradas.filter((h) => {
        switch (filters.keyFilter) {
          case 'aluno':
            return h.aluno?.nome?.toLowerCase().includes(termo)
          case 'disciplina':
            return h.disciplina?.nome?.toLowerCase().includes(termo)
          case 'situacao':
            return h.resultado?.toLowerCase().includes(termo)
          default:
            return true
        }
      })
    }

    setHistoricoFiltrado(filtradas)
  }

  // ============================
  // EXCLUSÃO
  // ============================
  const confirmarExclusao = (registro) => {
    setRegistroParaExcluir(registro)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (!registroParaExcluir) return
    try {
      await axios.delete(
        `/secretaria-academica/academic-records/${registroParaExcluir.id}`
      )

      setHistorico((prev) =>
        prev.filter((h) => h.id !== registroParaExcluir.id)
      )

      setHistoricoFiltrado((prev) =>
        prev.filter((h) => h.id !== registroParaExcluir.id)
      )
    } catch (err) {
      console.error('Erro ao excluir registro:', err)
    }

    setShowConfirm(false)
  }

  // ============================
  // RENDER
  // ============================
  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Histórico Académico</strong>
        </CCardHeader>

        <CContainer className="px-4">
          <ModalFiltros onFiltrar={onFiltrar} />
        </CContainer>

        <CCard className="my-4">
          <CCardBody>
            <PaginationWrapper data={historicoFiltrado} itemsPerPage={8}>
              {(historico) => (
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>Ano</th>
                      <th>Semestre</th>
                      <th>Aluno</th>
                      <th>Disciplina</th>
                      <th>Nota Final</th>
                      <th>Frequência</th>
                      <th>Resultado</th>
                      <th>Ações</th>
                    </tr>
                  </thead>

                  <tbody>
                    {historico.map((h) => (
                      <tr key={h.id}>
                        <td>{h.ano}</td>
                        <td>{h.semestre}</td>
                        <td>{h.aluno?.nome ?? '-'}</td>
                        <td>{h.disciplina?.nome ?? '-'}</td>
                        <td>{h.nota_final ?? '-'}</td>
                        <td>{h.frequencia ? `${h.frequencia}%` : '-'}</td>

                        <td>
                          <span
                            className={`badge ${
                              h.resultado?.toLowerCase() === 'aprovado'
                                ? 'bg-success'
                                : 'bg-danger'
                            }`}
                          >
                            {h.resultado ?? '-'}
                          </span>
                        </td>

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
                                <button className="dropdown-item">
                                  <i className="fa fa-edit"></i> Editar
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  onClick={() => confirmarExclusao(h)}
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

            <ModalConfirmacao
              show={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={handleConfirmDelete}
              title="Excluir Registro"
              message={`Tem certeza que deseja excluir este registro acadêmico?`}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default HistoricoEscolarPage
