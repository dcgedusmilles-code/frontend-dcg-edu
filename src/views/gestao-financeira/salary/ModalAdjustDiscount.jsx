// ModalAdjustDiscount.jsx
import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react'
import { adjustDiscount } from '../../../services/salaryService'

const descontoTipos = [
  { value: 'falta', label: 'Falta' },
  { value: 'atraso', label: 'Atraso' },
  { value: 'alimentacao', label: 'Alimentação' },
  { value: 'outro', label: 'Outro' },
]

const ModalAdjustDiscount = ({ isOpen, onClose, salary, onSaved }) => {
  const [tipo, setTipo] = useState('falta')
  const [valor, setValor] = useState(0)
  const [nota, setNota] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (salary) {
      setValor(0)
      setTipo('falta')
      setNota('')
    }
  }, [salary])

  const handleSave = async () => {
    if (!salary) return
    setLoading(true)
    try {
      await adjustDiscount(salary.id, { descontos: Number(valor), tipo, nota })
      onSaved && onSaved()
      onClose()
    } catch (err) {
      alert('Erro ao aplicar desconto')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <CModal visible={isOpen} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>
          Aplicar Desconto - {salary?.funcionario_nome || salary?.funcionario?.nome}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormSelect value={tipo} onChange={(e) => setTipo(e.target.value)}>
          {descontoTipos.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </CFormSelect>
        <CFormInput
          className="mt-3"
          type="number"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          placeholder="Valor do desconto"
        />
        <CFormInput
          className="mt-3"
          value={nota}
          onChange={(e) => setNota(e.target.value)}
          placeholder="Observação / motivo"
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleSave} disabled={loading}>
          Aplicar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalAdjustDiscount
