import React, { useState, useEffect } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilPencil, cilTrash, cilFilter, cilPlus } from '@coreui/icons'
import AddressFormModal from './ModalCriarEnderecos'
import AddressFilterModal from './ModalFiltrarEnderecos'
import axios from '../../../api' // <-- seu axios configurado com baseURL

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([])
  const [loading, setLoading] = useState(true)
  const [formModalVisible, setFormModalVisible] = useState(false)
  const [filterModalVisible, setFilterModalVisible] = useState(false)
  const [currentAddress, setCurrentAddress] = useState(null)

useEffect(() => {
  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/user/address', { params: {} })
      setAddresses(res.data)
    } catch (e) {
      console.error('Erro ao buscar endereços:', e)
    }
    setLoading(false)
  }

  fetchData()
}, [])



  const handleEdit = (address) => {
    setCurrentAddress(address)
    setFormModalVisible(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este endereço?')) {
      await axios.delete(`/user/address/${id}`)
      setAddresses(addresses.filter((addr) => addr.id !== id))
    }
  }

  const handleAddNew = () => {
    setCurrentAddress(null)
    setFormModalVisible(true)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard>
          <CCardHeader>
            <strong>Gestão de Endereços</strong>
            <div className="float-end">
              <CButton
                color="secondary"
                onClick={() => setFilterModalVisible(true)}
                className="me-2"
              >
                <CIcon icon={cilFilter} /> Filtrar
              </CButton>
              <CButton color="primary" onClick={handleAddNew}>
                <CIcon icon={cilPlus} /> Adicionar
              </CButton>
            </div>
          </CCardHeader>
          <CCardBody>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell>Rua</CTableHeaderCell>
                  <CTableHeaderCell>Cidade</CTableHeaderCell>
                  <CTableHeaderCell>Província</CTableHeaderCell>
                  <CTableHeaderCell>País</CTableHeaderCell>
                  <CTableHeaderCell>Ações</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {loading ? (
                  <CTableRow>
                    <CTableDataCell colSpan="5">Carregando...</CTableDataCell>
                  </CTableRow>
                ) : (
                  addresses.map((address) => (
                    <CTableRow key={address.id}>
                      <CTableDataCell>{`${address.rua}, ${address.numero}`}</CTableDataCell>
                      <CTableDataCell>{address.cidade}</CTableDataCell>
                      <CTableDataCell>{address.provincia}</CTableDataCell>
                      <CTableDataCell>{address.pais}</CTableDataCell>
                      <CTableDataCell>
                        <CButton
                          color="info"
                          size="sm"
                          onClick={() => handleEdit(address)}
                          className="me-2"
                        >
                          <CIcon icon={cilPencil} />
                        </CButton>
                        <CButton color="danger" size="sm" onClick={() => handleDelete(address.id)}>
                          <CIcon icon={cilTrash} />
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))
                )}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal de Cadastro/Edição */}
      {formModalVisible && (
        <AddressFormModal
          visible={formModalVisible}
          onClose={() => setFormModalVisible(false)}
          address={currentAddress}
          onSave={(newAddress) => {
            if (currentAddress) {
              setAddresses(addresses.map((addr) => (addr.id === newAddress.id ? newAddress : addr)))
            } else {
              setAddresses([...addresses, newAddress])
            }
            setFormModalVisible(false)
          }}
        />
      )}

      {/* Modal de Filtros */}
      {filterModalVisible && (
        <AddressFilterModal
          visible={filterModalVisible}
          onClose={() => setFilterModalVisible(false)}
          onFilter={(filteredAddresses) => {
            setAddresses(filteredAddresses)
            setFilterModalVisible(false)
          }}
        />
      )}
    </CRow>
  )
}

export default AddressManagement
