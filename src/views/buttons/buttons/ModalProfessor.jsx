import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CRow,
  CCol,
  CSpinner,
} from '@coreui/react'
import api from '../../../api'

const ModalProfessor = ({ visible, onClose, onSuccess, professor }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
  })

  const [loading, setLoading] = useState(false)

  // Carrega professor para edição
  useEffect(() => {
    if (professor) {
      setFormData({
        nome: professor.nome || '',
        email: professor.email || '',
        telefone: professor.telefone || '',
      })
    } else {
      setFormData({
        nome: '',
        email: '',
        telefone: '',
      })
    }
  }, [professor, visible])

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (professor) {
        // Atualizar
        await api.put(`/pedagogico/teachers/${professor.id}`, formData)
      } else {
        // Criar novo
        await api.post('/pedagogico/teachers', formData)
      }

      onSuccess()
      onClose()
    } catch (err) {
      console.error('Erro ao salvar professor:', err)
      alert('Erro ao salvar professor.')
    }

    setLoading(false)
  }

  return (
    <div className="d-flex justify-content-center align-items-center">

  <CModal visible={visible} onClose={onClose}>

      <CModalHeader closeButton>
        <CModalTitle>{professor ? 'Editar Professor' : 'Novo Professor'}</CModalTitle>
      </CModalHeader>

      <CForm onSubmit={handleSubmit}>
        <CModalBody>
          <CRow className="mb-3">
            <CCol md={12}>
              <CFormLabel>Nome</CFormLabel>
              <CFormInput
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Email</CFormLabel>
              <CFormInput
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </CCol>

            <CCol md={6}>
              <CFormLabel>Telefone</CFormLabel>
              <CFormInput
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
              />
            </CCol>
          </CRow>
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={onClose} disabled={loading}>
            Cancelar
          </CButton>

          <CButton color="primary" type="submit" disabled={loading}>
            {loading ? <CSpinner size="sm" /> : 'Salvar'}
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
    </div>
  )
}

export default ModalProfessor
