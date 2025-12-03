import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CModalFooter,
  CButton,
  CFormInput,
  CFormSelect,
  CFormTextarea,
} from '@coreui/react'
import InformacaoBancariaService from './InformacaoBancariaService'
import api from '../../../api'

const InformacaoBancariaForm = ({ show, onClose, onSaved, registro }) => {
  const [unidades, setUnidades] = useState([])
  const [dados, setDados] = useState({
    unidade_id: '',
    banco_nome: '',
    banco_codigo: '',
    agencia: '',
    conta: '',
    tipo_conta: '',
    titular: '',
    titular_documento: '',
    iban: '',
    swift_bic: '',
    moeda: 'AOA',
    observacoes: '',
    ativo: true,
  })

  useEffect(() => {
    carregarUnidades()

    if (registro) {
      setDados(registro)
    }
  }, [registro])

  const carregarUnidades = async () => {
    const res = await api.get('/units/address')
    setUnidades(res.data)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setDados({ ...dados, [name]: value })
  }

  const salvar = async () => {
    try {
      if (registro) {
        await InformacaoBancariaService.atualizar(registro.id, dados)
      } else {
        await InformacaoBancariaService.criar(dados)
      }
      onSaved()
      onClose()
    } catch (err) {
      console.error('Erro ao salvar:', err)
    }
  }

  return (
    <CModal visible={show} onClose={onClose} size="lg">
      <CModalHeader>
        <CModalTitle>
          {registro ? 'Editar Informação Bancária' : 'Nova Informação Bancária'}
        </CModalTitle>
      </CModalHeader>

      <CModalBody>
        <div className="row">
          <div className="col-md-6">
            <CFormSelect
              label="Unidade"
              name="unidade_id"
              value={dados.unidade_id ?? ''}
              onChange={handleChange}
            >
              <option value="">Selecione...</option>
              {unidades.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
              ))}
            </CFormSelect>
          </div>

          <div className="col-md-6">
            <CFormInput
              label="Banco"
              name="banco_nome"
              value={dados.banco_nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <CFormInput
              label="Código do Banco"
              name="banco_codigo"
              value={dados.banco_codigo ?? ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <CFormInput
              label="Agência"
              name="agencia"
              value={dados.agencia ?? ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <CFormInput
              label="Conta"
              name="conta"
              value={dados.conta}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <CFormInput
              label="Tipo de Conta"
              name="tipo_conta"
              value={dados.tipo_conta ?? ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <CFormInput
              label="Titular"
              name="titular"
              value={dados.titular ?? ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <CFormInput
              label="Documento do Titular"
              name="titular_documento"
              value={dados.titular_documento ?? ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <CFormInput
              label="IBAN"
              name="iban"
              value={dados.iban ?? ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6">
            <CFormInput
              label="SWIFT/BIC"
              name="swift_bic"
              value={dados.swift_bic ?? ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <CFormInput
              label="Moeda"
              name="moeda"
              value={dados.moeda}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-12">
            <CFormTextarea
              label="Observações"
              name="observacoes"
              value={dados.observacoes ?? ''}
              onChange={handleChange}
            />
          </div>
        </div>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={salvar}>
          Salvar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default InformacaoBancariaForm
