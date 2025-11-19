import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react'
import axios from '../../../api' // axios com baseURL
import provinciasData from '../../../assets/data/provincias.json'


const AddressFormModal = ({ visible, onClose, address, onSave }) => {
  const [formData, setFormData] = useState({
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    provincia: '',
    pais: 'Angola',
    complemento: '',
    cep: '',
  })

  const [provinces, setProvinces] = useState([])
  const [municipalities, setMunicipalities] = useState([])

  useEffect(() => {
    if (address) setFormData(address)
  }, [address])

// Buscar lista de províncias
useEffect(() => {
  setProvinces(
    provinciasData.map((prov) => ({
      id: prov.id,
      nome: prov.nome
    }))
  )
}, [])

// Buscar municípios ao selecionar província
useEffect(() => {
  if (!formData.provincia) return

  const provinciaSelecionada = provinciasData.find(
    (p) => p.nome === formData.provincia
  )

  setMunicipalities(provinciaSelecionada?.municipios || [])
}, [formData.provincia])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      if (address) {
        await axios.put(`/user/address/${address.id}`, formData)
      } else {
        await axios.post('/user/address', formData)
      }

      onSave(formData)
      onClose()
    } catch (error) {
      console.error('Erro ao salvar endereço:', error)
    }
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>{address ? 'Editar Endereço' : 'Adicionar Novo Endereço'}</CModalTitle>
      </CModalHeader>

      <CForm onSubmit={handleSubmit}>
        <CModalBody>
          {/* Rua */}
          <div className="mb-3">
            <CFormLabel>Rua</CFormLabel>
            <CFormInput
              name="rua"
              value={formData.rua}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Número */}
          <div className="mb-3">
            <CFormLabel>Número</CFormLabel>
            <CFormInput name="numero" value={formData.numero} onChange={handleInputChange} />
          </div>

          {/* Bairro */}
          <div className="mb-3">
            <CFormLabel>Bairro</CFormLabel>
            <CFormInput
              name="bairro"
              value={formData.bairro}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Província */}
          <div className="mb-3">
            <CFormLabel>Província</CFormLabel>
            <CFormSelect
              name="provincia"
              value={formData.provincia}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione...</option>
              {provinces.map((prov) => (
                <option key={prov.id} value={prov.nome}>
                  {prov.nome}
                </option>
              ))}
            </CFormSelect>
          </div>

          {/* Município / Cidade */}
          <div className="mb-3">
            <CFormLabel>Município (Cidade)</CFormLabel>
            <CFormSelect
              name="cidade"
              value={formData.cidade}
              onChange={handleInputChange}
              required
            >
              <option value="">Selecione...</option>
              {municipalities.map((mun) => (
                <option key={mun} value={mun}>
                  {mun}
                </option>
              ))}
            </CFormSelect>
          </div>
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Cancelar
          </CButton>
          <CButton color="primary" type="submit">
            Salvar
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  )
}

export default AddressFormModal
