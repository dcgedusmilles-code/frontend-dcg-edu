import React, { useEffect, useState } from 'react'
import axios from '../../../api'

const API_PROFESSORES = '/pedagogico/teachers'
const API_UNIDADES = '/pedagogico/unidades'
const API_CURSOS = '/pedagogico/cursos'
const API_ENDERECOS = '/pedagogico/enderecos'

const ModalProfessor = ({ professorEditando, onSalvo }) => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    especialidade: '',
    status: 'Ativo',
    unidade_id: '',
    curso_id: '',
    rua: '',
    casa_numero: '',
    bairro: '',
    municipio: '',
    provincia: '',
  })

  const [unidades, setUnidades] = useState([])
  const [cursos, setCursos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchUnidades()
    fetchCursos()
    if (professorEditando) {
      setFormData({
        nome: professorEditando.nome || '',
        email: professorEditando.email || '',
        telefone: professorEditando.telefone || '',
        especialidade: professorEditando.especialidade || '',
        status: professorEditando.status || 'Ativo',
        unidade_id: professorEditando.unidade?.id || '',
        curso_id: professorEditando.curso?.id || '',
        rua: professorEditando.enderecos?.rua || '',
        casa_numero: professorEditando.enderecos?.casa_numero || '',
        bairro: professorEditando.enderecos?.bairro || '',
        municipio: professorEditando.enderecos?.municipio || '',
        provincia: professorEditando.enderecos?.provincia || '',
      })
    } else {
      resetForm()
    }
  }, [professorEditando])

  const fetchUnidades = async () => {
    try {
      const { data } = await axios.get(API_UNIDADES)
      setUnidades(data || [])
    } catch (error) {
      console.error('Erro ao carregar unidades:', error)
    }
  }

  const fetchCursos = async () => {
    try {
      const { data } = await axios.get(API_CURSOS)
      setCursos(data || [])
    } catch (error) {
      console.error('Erro ao carregar cursos:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      especialidade: '',
      status: 'Ativo',
      unidade_id: '',
      curso_id: '',
      rua: '',
      casa_numero: '',
      bairro: '',
      municipio: '',
      provincia: '',
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    setLoading(true)
    try {
      let enderecoId = professorEditando?.endereco_id

      // ✅ Criar ou atualizar endereço
      if (!enderecoId) {
        const { data: enderecoData } = await axios.post(API_ENDERECOS, {
          rua: formData.rua,
          casa_numero: formData.casa_numero,
          bairro: formData.bairro,
          municipio: formData.municipio,
          provincia: formData.provincia,
        })
        enderecoId = enderecoData.id
      }

      const payload = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        especialidade: formData.especialidade,
        status: formData.status,
        unidade_id: formData.unidade_id,
        curso_id: formData.curso_id,
        endereco_id: enderecoId,
      }

      if (professorEditando) {
        await axios.put(`${API_PROFESSORES}/${professorEditando.id}`, payload)
      } else {
        await axios.post(API_PROFESSORES, payload)
      }

      onSalvo()
      resetForm()

      // Fecha o modal
      const modalEl = document.getElementById('modalProfessor')
      const modalInstance = window.bootstrap.Modal.getInstance(modalEl)
      modalInstance.hide()
    } catch (error) {
      console.error('Erro ao salvar professor:', error)
      alert('Erro ao salvar professor. Verifique os dados.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal fade" id="modalProfessor" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {professorEditando ? 'Editar Professor' : 'Novo Professor'}
            </h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" />
          </div>
          <div className="modal-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label>Nome</label>
                <input
                  type="text"
                  className="form-control"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-6">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Telefone</label>
                <input
                  type="text"
                  className="form-control"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Especialidade</label>
                <input
                  type="text"
                  className="form-control"
                  name="especialidade"
                  value={formData.especialidade}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Status</label>
                <select
                  name="status"
                  className="form-select"
                  value={formData.status}
                  onChange={handleChange}
                >
                  <option value="Ativo">Ativo</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
              <div className="col-md-6">
                <label>Unidade de Atuação</label>
                <select
                  name="unidade_id"
                  className="form-select"
                  value={formData.unidade_id}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  {unidades.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.nome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6">
                <label>Curso</label>
                <select
                  name="curso_id"
                  className="form-select"
                  value={formData.curso_id}
                  onChange={handleChange}
                >
                  <option value="">Selecione</option>
                  {cursos.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Endereço */}
              <div className="col-md-6">
                <label>Rua</label>
                <input
                  type="text"
                  className="form-control"
                  name="rua"
                  value={formData.rua}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Número</label>
                <input
                  type="text"
                  className="form-control"
                  name="casa_numero"
                  value={formData.casa_numero}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Bairro</label>
                <input
                  type="text"
                  className="form-control"
                  name="bairro"
                  value={formData.bairro}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Município</label>
                <input
                  type="text"
                  className="form-control"
                  name="municipio"
                  value={formData.municipio}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-4">
                <label>Província</label>
                <input
                  type="text"
                  className="form-control"
                  name="provincia"
                  value={formData.provincia}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button type="button" className="btn btn-primary" onClick={handleSave} disabled={loading}>
              {loading ? 'Salvando...' : 'Salvar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalProfessor
