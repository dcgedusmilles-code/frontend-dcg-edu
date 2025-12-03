import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CRow,
  CCol,
} from '@coreui/react'
import { ModalConfirmacao, PaginationWrapper } from '../../../components'
import InformacaoBancariaForm from './InformacaoBancariaForm'
import InformacaoBancariaService from './InformacaoBancariaService'

const InformacaoBancariaPage = () => {
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
      const res = await InformacaoBancariaService.listar()
      setLista(res)
    } catch (err) {
      console.error('Erro ao carregar informações bancárias:', err)
    }
  }

  const abrirCriar = () => {
    setRegistroEdit(null)
    setModalShow(true)
  }

  const abrirEditar = (item) => {
    setRegistroEdit(item)
    setModalShow(true)
  }

  const confirmarExclusao = (item) => {
    setRegistroExcluir(item)
    setConfirmShow(true)
  }

  const excluir = async () => {
    try {
      await InformacaoBancariaService.excluir(registroExcluir.id)
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
          <strong>Informações Bancárias</strong>
          <CButton
            color="primary"
            className="float-end"
            onClick={abrirCriar}
          >
            Novo Registro
          </CButton>
        </CCardHeader>

        <CCardBody>
          <PaginationWrapper data={lista} itemsPerPage={10}>
            {(pagina) => (
              <table className="table table-bordered table-striped">
                <thead className="table-dark">
                  <tr>
                    <th>Unidade</th>
                    <th>Banco</th>
                    <th>Conta</th>
                    <th>IBAN</th>
                    <th>Ativo</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {pagina.map((item) => (
                    <tr key={item.id}>
                      <td>{item.unidade?.nome ?? '-'}</td>
                      <td>{item.banco_nome}</td>
                      <td>{item.conta}</td>
                      <td>{item.iban ?? '-'}</td>
                      <td>
                        {item.ativo ? (
                          <span className="badge bg-success">Ativo</span>
                        ) : (
                          <span className="badge bg-danger">Inativo</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-secondary me-2"
                          onClick={() => abrirEditar(item)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => confirmarExclusao(item)}
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
        <InformacaoBancariaForm
          show={modalShow}
          onClose={() => setModalShow(false)}
          onSaved={aoSalvar}
          registro={registroEdit}
        />
      )}

      <ModalConfirmacao
        show={confirmShow}
        onClose={() => setConfirmShow(false)}
        onConfirm={excluir}
        title="Excluir Informação Bancária"
        message={`Deseja excluir o registro do banco "${registroExcluir?.banco_nome}"?`}
      />
    </>
  )
}

export default InformacaoBancariaPage
