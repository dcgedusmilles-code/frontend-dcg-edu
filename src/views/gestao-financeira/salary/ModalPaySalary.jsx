// ModalPaySalary.jsx
import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormSelect,
  CFormInput,
  CButton,
} from '@coreui/react'
import { paySalary } from '../../../services/salaryService'
import { isCaixaAbertoHoje } from '../../../services/cashMovementsService'

const ModalPaySalary = ({ isOpen, onClose, salary, onPaid }) => {
  const [metodo, setMetodo] = useState('transferencia')
  const [observacao, setObservacao] = useState('')
  const [loading, setLoading] = useState(false)
  const [caixaOk, setCaixaOk] = useState(true)

  useEffect(() => {
    ;(async () => {
      const cs = await isCaixaAbertoHoje()
      setCaixaOk(cs.aberto && cs.fechadoHoje)
    })()
  }, [isOpen])

  useEffect(() => {
    if (salary) {
      setMetodo('transferencia')
      setObservacao('')
    }
  }, [salary])

  const handlePay = async () => {
    if (!salary) return
    if (!caixaOk) {
      alert('Caixa não está disponível para este pagamento.')
      return
    }
    setLoading(true)
    try {
      await paySalary({
        funcionario_id: salary.funcionario_id || salary.funcionario?.id,
        salario_base: salary.salario_base ?? salary.salario_base,
        beneficios: salary.beneficios ?? 0,
        descontos: salary.descontos ?? 0,
        valor_liquido:
          salary.valor_liquido ??
          salary.salario_base - (salary.descontos || 0) + (salary.beneficios || 0),
        data_pagamento: new Date().toISOString(),
        metodo_pagamento: metodo,
        observacao,
      })
      onPaid && onPaid()
      onClose()
    } catch (err) {
      alert('Erro ao registrar pagamento')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen || !salary) return null

  return (
    <CModal visible={isOpen} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>
          Confirmar Pagamento - {salary.funcionario_nome || salary.funcionario?.nome}
        </CModalTitle>
      </CModalHeader>
      <CModalBody>
        <p>
          <strong>Salário base:</strong> {(salary.salario_base ?? 0).toFixed(2)}
        </p>
        <p>
          <strong>Benefícios:</strong> {(salary.beneficios ?? 0).toFixed(2)}
        </p>
        <p>
          <strong>Descontos:</strong> {(salary.descontos ?? 0).toFixed(2)}
        </p>
        <p>
          <strong>Valor líquido:</strong>{' '}
          {(
            salary.valor_liquido ??
            (salary.salario_base || 0) + (salary.beneficios || 0) - (salary.descontos || 0)
          ).toFixed(2)}
        </p>
        <CFormSelect value={metodo} onChange={(e) => setMetodo(e.target.value)}>
          <option value="transferencia">Transferência</option>
          <option value="cheque">Cheque</option>
          <option value="dinheiro">Dinheiro</option>
        </CFormSelect>
        <CFormInput
          className="mt-3"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          placeholder="Observação (opcional)"
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handlePay} disabled={loading || !caixaOk}>
          Pagar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalPaySalary
