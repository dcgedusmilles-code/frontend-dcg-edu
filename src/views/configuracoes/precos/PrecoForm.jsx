import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CButton,
} from '@coreui/react'
import api from '../../../api'
import PrecoService from './PrecoService'

const PrecoForm = ({ show, onClose, onSaved, registro }) => {
  const [cursos, setCursos] = useState([])
  const [unidades, setUnidades] = useState([])
  const [materiais, setMateriais] = useState([])

  const [dados, setDados] = useState({
    curso_id: '',
    unidade_id: '',
    material_id: '',
    preco_incricao: '',
    preco_individual: '',
    preco_para_2: '',
    preco_para_3_ou_mais: '',
    desconto_percentual: '',
    moeda: 'AOA',
    valido_de: '',
    valido_ate: '',
    observacoes: '',
    ativo: true,
  })

  useEffect(() => {
    carregarListas()
    if (registro) setDados(registro)
  }, [registro])

  const carregarListas = async () => {
    const [c, u, m] = await Promise.all([
      api.get('/training-coordinators/courses'),
      api.get('/units/address'),
      api.get('/secretaria-academica/material-didatico'),
    ])

    setCursos(c.data)
    setUnidades(u.data)
    setMateriais(m.data)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setDados({ ...dados, [name]: value })
  }

  const salvar = async () => {
    try {
      if (registro) {
        await PrecoService.atualizar(registro.id, dados)
      } else {
        await PrecoService.criar(dados)
      }
      onSaved()
      onClose()
    } catch (err) {
      console.error('Erro ao salvar preço:', err)
    }
  }

  return (
    <CModal visible={show} onClose={onClose} size="lg">
      <CModalHeader>
        <CModalTitle>{registro ? 'Editar Preço' : 'Novo Preço'}</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <div className="row">
          <div className="col-md-4">
            <CFormSelect
              label="Curso"
              name="curso_id"
              value={dados.curso_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              {cursos.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nome}
                </option>
              ))}
            </CFormSelect>
          </div>

          <div className="col-md-4">
            <CFormSelect
              label="Unidade"
              name="unidade_id"
              value={dados.unidade_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              {unidades.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nome}
                </option>
              ))}
            </CFormSelect>
          </div>

          <div className="col-md-4">
            <CFormSelect
              label="Material Didático"
              name="material_id"
              value={dados.material_id}
              onChange={handleChange}
              required
            >
              <option value="">Selecione...</option>
              {materiais.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.nome}
                </option>
              ))}
            </CFormSelect>
          </div>

          <div className="col-md-3">
            <CFormInput
              label="Inscrição"
              name="preco_incricao"
              value={dados.preco_incricao ?? ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <CFormInput
              label="Individual"
              name="preco_individual"
              value={dados.preco_individual}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-3">
            <CFormInput
              label="Preço p/ 2"
              name="preco_para_2"
              value={dados.preco_para_2 ?? ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <CFormInput
              label="Preço p/ 3+"
              name="preco_para_3_ou_mais"
              value={dados.preco_para_3_ou_mais ?? ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4">
            <CFormInput
              label="Desconto (%)"
              name="desconto_percentual"
              value={dados.desconto_percentual ?? ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-2">
            <CFormInput label="Moeda" name="moeda" value={dados.moeda} onChange={handleChange} />
          </div>

          <div className="col-md-3">
            <CFormInput
              type="date"
              label="Válido De"
              name="valido_de"
              value={dados.valido_de ?? ''}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <CFormInput
              type="date"
              label="Válido Até"
              name="valido_ate"
              value={dados.valido_ate ?? ''}
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

export default PrecoForm
