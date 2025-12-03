import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormSelect,
} from '@coreui/react'

const ModalFiltroCaixaMovimento = ({ show, onClose, onFiltrar }) => {
  const [filters, setFilters] = useState({
    tipo: '',
    dataInicio: '',
    dataFim: '',
    responsavel: '',
  })

  const handleApply = () => {
    onFiltrar(filters)
    onClose()
  }

  return (
    <CModal visible={show} onClose={onClose}>
      <CModalHeader>
        <strong>Filtrar Movimentos</strong>
      </CModalHeader>

      <CModalBody>
        <CFormSelect
          label="Tipo"
          value={filters.tipo}
          onChange={(e) => setFilters({ ...filters, tipo: e.target.value })}
        >
          <option value="">Todos</option>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </CFormSelect>

        <CFormInput
          label="Data Início"
          type="date"
          className="mt-2"
          value={filters.dataInicio}
          onChange={(e) => setFilters({ ...filters, dataInicio: e.target.value })}
        />

        <CFormInput
          label="Data Fim"
          type="date"
          className="mt-2"
          value={filters.dataFim}
          onChange={(e) => setFilters({ ...filters, dataFim: e.target.value })}
        />

        <CFormInput
          label="Responsável"
          className="mt-2"
          value={filters.responsavel}
          onChange={(e) => setFilters({ ...filters, responsavel: e.target.value })}
        />
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleApply}>
          Aplicar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalFiltroCaixaMovimento
