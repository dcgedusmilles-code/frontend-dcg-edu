import React, { useEffect, useState } from 'react'
import {
  CButton, CCard, CCardBody, CCardHeader,
  CCol, CRow, CContainer
} from '@coreui/react'
import api from '../../../api'

import ModalUnidade from './ModalCriarUnidade'
import ModalFiltrosUnidade from './ModalFiltrarUnidade'

const GestaoUnidadesPage = () => {
  const [unidades, setUnidades] = useState([])
  const [enderecos, setEnderecos] = useState([])

  const [modalAberto, setModalAberto] = useState(false)
  const [unidadeEditando, setUnidadeEditando] = useState(null)

  useEffect(() => {
    fetchUnidades()
    fetchEnderecos()
  }, [])

  const fetchUnidades = async (filters = {}) => {
    try {
      const res = await api.get('/units/address', { params: filters })
      setUnidades(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const fetchEnderecos = async () => {
    const res = await api.get('/user/address')
    setEnderecos(res.data)
  }

  const abrirNovo = () => {
    setUnidadeEditando(null)
    setModalAberto(true)
  }

  const abrirEditar = (u) => {
    setUnidadeEditando(u)
    setModalAberto(true)
  }

  return (
    <CContainer className="my-4">

      <CRow className="mb-3">
        <CCol>
          <CButton color="success" onClick={abrirNovo}>Nova Unidade</CButton>
        </CCol>
      </CRow>

      <ModalFiltrosUnidade enderecos={enderecos} onFiltrar={fetchUnidades} />

      <CCard>
        <CCardHeader>Lista de Unidades</CCardHeader>

        <CCardBody>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nome</th>
                <th>Sigla</th>
                <th>Tipo</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Status</th>
                <th>Endereço</th>
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {unidades.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.nome}</td>
                  <td>{u.sigla}</td>
                  <td>{u.tipo}</td>
                  <td>{u.email}</td>
                  <td>{u.telefone}</td>
                  <td>{u.status}</td>
                  <td>{u.endereco?.rua} - {u.endereco?.cidade}</td>

                  <td>
                    <CButton size="sm" color="info" onClick={() => abrirEditar(u)}>
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
        <ModalUnidade
          unidadeEditando={unidadeEditando}
          enderecos={enderecos}
          onSalvo={() => {
            setModalAberto(false)
            fetchUnidades()
          }}
        />
      )}

    </CContainer>
  )
}

export default GestaoUnidadesPage
