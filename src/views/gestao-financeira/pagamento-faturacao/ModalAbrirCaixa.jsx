import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
} from '@coreui/react'
import { financeiroService } from '../../../services/financeiroService'

const ModalAbrirCaixa = ({ visible, onClose, onSuccess }) => {
  const [valorInicial, setValorInicial] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleAbrirCaixa = async () => {
    setLoading(true)
    try {
      const caixa = await financeiroService.abrirCaixa(valorInicial)
      onSuccess(caixa)
      onClose()
    } catch (err) {
      console.error('Erro ao abrir caixa', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Abrir Caixa</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormInput
          type="number"
          label="Valor Inicial"
          value={valorInicial}
          onChange={(e) => setValorInicial(Number(e.target.value))}
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleAbrirCaixa} disabled={loading}>
          {loading ? 'Abrindo...' : 'Abrir Caixa'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAbrirCaixa
