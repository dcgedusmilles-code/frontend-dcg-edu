import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react'
import cashMovementsService from '../../../services/cashMovementsService'

const ModalCreateCaixaMovimento = ({ show, onClose, onSaved }) => {
  const [data, setData] = useState({
    tipo: '',
    descricao: '',
    valor: '',
    data_movimento: '',
    responsavel: '',
  })

  const handleSave = async () => {
    try {
      await cashMovementsService.create(data)
      onClose()
      onSaved()
    } catch (err) {
      console.error('Erro ao criar movimento', err)
    }
  }

  return (
    <CModal visible={show} onClose={onClose}>
      <CModalHeader>
        <strong>Novo Movimento</strong>
      </CModalHeader>

      <CModalBody>
        <CFormSelect
          label="Tipo"
          value={data.tipo}
          onChange={(e) => setData({ ...data, tipo: e.target.value })}
        >
          <option value="">Selecione</option>
          <option value="entrada">Entrada</option>
          <option value="saida">Saída</option>
        </CFormSelect>

        <CFormInput
          label="Descrição"
          className="mt-2"
          value={data.descricao}
          onChange={(e) => setData({ ...data, descricao: e.target.value })}
        />

        <CFormInput
          label="Valor"
          type="number"
          className="mt-2"
          value={data.valor}
          onChange={(e) => setData({ ...data, valor: e.target.value })}
        />

        <CFormInput
          label="Data do Movimento"
          type="date"
          className="mt-2"
          value={data.data_movimento}
          onChange={(e) => setData({ ...data, data_movimento: e.target.value })}
        />

        <CFormInput
          label="Responsável"
          className="mt-2"
          value={data.responsavel}
          onChange={(e) => setData({ ...data, responsavel: e.target.value })}
        />
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleSave}>
          Salvar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalCreateCaixaMovimento
