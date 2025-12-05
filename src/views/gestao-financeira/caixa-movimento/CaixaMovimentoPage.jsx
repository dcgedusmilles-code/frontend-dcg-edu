import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
} from '@coreui/react'
import { PaginationWrapper, ModalConfirmacao } from '../../../components'
import ModalFiltroCaixaMovimento from './ModalFiltroCaixaMovimento'
import ModalCreateCaixaMovimento from './ModalCreateCaixaMovimento'
import cashMovementsService from '../../../services/cashMovementsService'

const CaixaMovimentoPage = () => {
  const [movimentos, setMovimentos] = useState([])
  const [filtrados, setFiltrados] = useState([])
  const [showCreate, setShowCreate] = useState(false)
  const [showFilter, setShowFilter] = useState(false)
  const [registroParaExcluir, setRegistroParaExcluir] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    carregarMovimentos()
  }, [])

  const carregarMovimentos = async () => {
    try {
      const dados = await cashMovementsService.getAll()
      setMovimentos(dados)
      setFiltrados(dados)
    } catch (err) {
      console.error('Erro ao carregar movimentos de caixa', err)
    }
  }

  const aplicarFiltro = (filters) => {
    let lista = [...movimentos]

    if (filters.tipo) {
      lista = lista.filter((m) => m.tipo === filters.tipo)
    }

    if (filters.dataInicio) {
      lista = lista.filter(
        (m) => new Date(m.data_movimento) >= new Date(filters.dataInicio)
      )
    }

    if (filters.dataFim) {
      lista = lista.filter(
        (m) => new Date(m.data_movimento) <= new Date(filters.dataFim)
      )
    }

    if (filters.responsavel) {
      const termo = filters.responsavel.toLowerCase()
      lista = lista.filter((m) =>
        m.responsavel?.toLowerCase().includes(termo)
      )
    }

    setFiltrados(lista)
  }

  const confirmarExclusao = (item) => {
    setRegistroParaExcluir(item)
    setShowConfirm(true)
  }

  const deletar = async () => {
    if (!registroParaExcluir) return
    try {
      await cashMovementsService.remove(registroParaExcluir.id)

      setMovimentos((prev) =>
        prev.filter((m) => m.id !== registroParaExcluir.id)
      )
      setFiltrados((prev) =>
        prev.filter((m) => m.id !== registroParaExcluir.id)
      )
    } catch (error) {
      console.error('Erro ao excluir movimento', error)
    }
    setShowConfirm(false)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-3">
          <strong>Movimentos de Caixa</strong>
        </CCardHeader>

        <div className="d-flex gap-2 mb-3 px-3">
          <CButton color="primary" onClick={() => setShowCreate(true)}>
            Novo Movimento
          </CButton>
          <CButton color="secondary" onClick={() => setShowFilter(true)}>
            Filtrar
          </CButton>
        </div>

        <CCard>
          <CCardBody>
            <PaginationWrapper data={filtrados} itemsPerPage={6}>
              {(pagina) => (
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>Tipo</th>
                      <th>Descrição</th>
                      <th>Valor</th>
                      <th>Data</th>
                      <th>Responsável</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pagina.map((m) => (
                      <tr key={m.id}>
                        <td>{m.tipo}</td>
                        <td>{m.descricao}</td>
                        <td>{m.valor}</td>
                        <td>
                          {new Date(m.data_movimento).toLocaleDateString()}
                        </td>
                        <td>{m.responsavel}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => confirmarExclusao(m)}
                          >
                            <i className="fa fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </PaginationWrapper>
          </CCardBody>
        </CCard>
      </CCol>

      <ModalCreateCaixaMovimento
        show={showCreate}
        onClose={() => setShowCreate(false)}
        onSaved={carregarMovimentos}
      />

      <ModalFiltroCaixaMovimento
        show={showFilter}
        onClose={() => setShowFilter(false)}
        onFiltrar={aplicarFiltro}
      />

      <ModalConfirmacao
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={deletar}
        title="Excluir Movimento"
        message={`Deseja excluir o movimento "${registroParaExcluir?.descricao}"?`}
      />
    </CRow>
  )
}

export default CaixaMovimentoPage
