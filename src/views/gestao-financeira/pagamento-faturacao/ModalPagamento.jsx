import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormCheck,
  CFormSelect,
} from '@coreui/react'
import { financeiroService } from '../../../services/financeiroService'

const ModalPagamentoAvancado = ({
  visible,
  onClose,
  aluno,
  mensalidades,
  materiais,
  onPagamentoSucesso,
}) => {
  const [selectedMensalidades, setSelectedMensalidades] = useState([])
  const [selectedMateriais, setSelectedMateriais] = useState([])
  const [metodoPagamento, setMetodoPagamento] = useState('dinheiro')
  const [loading, setLoading] = useState(false)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    // Calcula total sempre que seleciona algo
    const totalMensalidades = selectedMensalidades.reduce((acc, m) => acc + m.valor, 0)
    const totalMateriais = selectedMateriais.reduce((acc, m) => acc + m.preco, 0)
    setTotal(totalMensalidades + totalMateriais)
  }, [selectedMensalidades, selectedMateriais])

  const handleToggleMensalidade = (mensalidade) => {
    setSelectedMensalidades((prev) =>
      prev.find((m) => m.id === mensalidade.id)
        ? prev.filter((m) => m.id !== mensalidade.id)
        : [...prev, mensalidade],
    )
  }

  const handleToggleMaterial = (material) => {
    setSelectedMateriais((prev) =>
      prev.find((m) => m.id === material.id)
        ? prev.filter((m) => m.id !== material.id)
        : [...prev, material],
    )
  }

  const handlePagamento = async () => {
    if (selectedMensalidades.length === 0 && selectedMateriais.length === 0) {
      alert('Selecione pelo menos uma mensalidade ou material.')
      return
    }

    setLoading(true)
    try {
      // Criar uma entrada única de receita
      const dados = {
        aluno_id: aluno.id,
        categoria: 'multiplo', // múltiplos serviços
        valor: total,
        data_recebimento: new Date(),
        metodo_pagamento: metodoPagamento,
        status: 'pago',
        mensalidade_ids: selectedMensalidades.map((m) => m.id),
        material_ids: selectedMateriais.map((m) => m.id),
      }
      await financeiroService.registrarPagamento(dados)
      onPagamentoSucesso()
      onClose()
    } catch (err) {
      console.error('Erro ao registrar pagamento', err)
      alert('Erro ao registrar pagamento!')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CModal visible={visible} onClose={onClose} size="lg">
      <CModalHeader>
        <CModalTitle>Registrar Pagamento Avançado</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div>
          <strong>Aluno:</strong> {aluno?.nome}
        </div>

        <h5 className="mt-3">Mensalidades</h5>
        {mensalidades.map((m) => (
          <CFormCheck
            key={m.id}
            label={`${m.descricao} - ${m.valor} Kz`}
            checked={selectedMensalidades.some((sm) => sm.id === m.id)}
            onChange={() => handleToggleMensalidade(m)}
          />
        ))}

        <h5 className="mt-3">Materiais Didáticos</h5>
        {materiais.map((m) => (
          <CFormCheck
            key={m.id}
            label={`${m.titulo} - ${m.preco} Kz`}
            checked={selectedMateriais.some((sm) => sm.id === m.id)}
            onChange={() => handleToggleMaterial(m)}
          />
        ))}

        <CFormSelect
          className="mt-3"
          label="Método de pagamento"
          value={metodoPagamento}
          onChange={(e) => setMetodoPagamento(e.target.value)}
        >
          <option value="dinheiro">Dinheiro</option>
          <option value="cartao">Cartão</option>
          <option value="transferencia">Transferência</option>
        </CFormSelect>

        <div className="mt-3">
          <strong>Total: </strong> {total.toFixed(2)} Kz
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handlePagamento} disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar Pagamento'}
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalPagamentoAvancado
