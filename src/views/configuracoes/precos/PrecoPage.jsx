import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CButton } from '@coreui/react'
import { PaginationWrapper, ModalConfirmacao } from '../../../components'
import PrecoForm from './PrecoForm'
import PrecoService from './PrecoService'

const PrecoPage = () => {
  const [lista, setLista] = useState([])
  const [modalShow, setModalShow] = useState(false)
  const [registroEdit, setRegistroEdit] = useState(null)
  const [registroExcluir, setRegistroExcluir] = useState(null)
  const [confirmShow, setConfirmShow] = useState(false)

  useEffect(() => {
    carregar()
  }, [])

  const carregar = async () => {
    try {
      const res = await PrecoService.listar()
      setLista(res)
    } catch (err) {
      console.error('Erro ao carregar preços:', err)
    }
  }

  const abrirNovo = () => {
    setRegistroEdit(null)
    setModalShow(true)
  }

  const abrirEditar = (item) => {
    setRegistroEdit(item)
    setModalShow(true)
  }

  const pedirConfirmacao = (item) => {
    setRegistroExcluir(item)
    setConfirmShow(true)
  }

  const excluir = async () => {
    try {
      await PrecoService.excluir(registroExcluir.id)
      setLista((prev) => prev.filter((i) => i.id !== registroExcluir.id))
    } catch (err) {
      console.error('Erro ao excluir:', err)
    }
    setConfirmShow(false)
  }

  const aoSalvar = () => {
    carregar()
  }

  return (
    <>
      <CCard>
        <CCardHeader>
          <strong>Tabela de Preços</strong>
          <CButton className="float-end" color="primary" onClick={abrirNovo}>
            Novo Preço
          </CButton>
        </CCardHeader>

        <CCardBody>
          <PaginationWrapper data={lista} itemsPerPage={10}>
            {(pagina) => (
              <table className="table table-striped table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Curso</th>
                    <th>Unidade</th>
                    <th>Material</th>
                    <th>Preço Individual</th>
                    <th>Preço p/ 2</th>
                    <th>Preço p/ 3+</th>
                    <th>Validade</th>
                    <th>Ativo</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {pagina.map((item) => (
                    <tr key={item.id}>
                      <td>{item.curso?.nome}</td>
                      <td>{item.unidade?.nome}</td>
                      <td>{item.material?.nome}</td>

                      <td>
                        {item.preco_individual} {item.moeda}
                      </td>
                      <td>{item.preco_para_2 ?? '-'}</td>
                      <td>{item.preco_para_3_ou_mais ?? '-'}</td>

                      <td>
                        {item.valido_de} até {item.valido_ate}
                      </td>

                      <td>
                        {item.ativo ? (
                          <span className="badge bg-success">Ativo</span>
                        ) : (
                          <span className="badge bg-danger">Inativo</span>
                        )}
                      </td>

                      <td>
                        <button
                          className="btn btn-secondary btn-sm me-2"
                          onClick={() => abrirEditar(item)}
                        >
                          Editar
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => pedirConfirmacao(item)}
                        >
                          Excluir
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

      {modalShow && (
        <PrecoForm
          show={modalShow}
          onClose={() => setModalShow(false)}
          registro={registroEdit}
          onSaved={aoSalvar}
        />
      )}

      <ModalConfirmacao
        show={confirmShow}
        onClose={() => setConfirmShow(false)}
        onConfirm={excluir}
        title="Excluir Preço"
        message={`Deseja remover o preço do curso "${registroExcluir?.curso?.nome}"?`}
      />
    </>
  )
}

export default PrecoPage
