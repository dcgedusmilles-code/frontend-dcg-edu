import React, { useEffect, useState } from 'react'
import axios from '../../../api'
import { CFormSelect } from '@coreui/react'

const ModalAluno = ({ alunoEditando, onSalvo }) => {
  const [turmas, setTurmas] = useState([])
  const [unidades, setUnidades] = useState([])

  const [form, setForm] = useState({
    nome: '',
    unidade_id: '',
    turma_id: '',
    data_nascimento: '',
    sexo: '',
    email: '',
    telefone: '',
    documento: '',
    endereco: '',
    status: '',
  })

  useEffect(() => {
    fetchSelects
  }, [])

  useEffect(() => {
    if (alunoEditando) {
      setForm({
        nome: alunoEditando.nome || '',
        unidade_id: alunoEditando.unidade_id || '',
        turma_id: alunoEditando.turma_id || '',
        data_nascimento: alunoEditando.data_nascimento
          ? alunoEditando.data_nascimento.substring(0, 10)
          : '',
        sexo: alunoEditando.sexo || '',
        email: alunoEditando.email || '',
        telefone: alunoEditando.telefone || '',
        documento: alunoEditando.documento || '',
        endereco: alunoEditando.endereco || '',
        status: alunoEditando.status || '',
      })
    } else {
      setForm({
        nome: '',
        unidade_id: '',
        turma_id: '',
        data_nascimento: '',
        sexo: '',
        email: '',
        telefone: '',
        documento: '',
        endereco: '',
        status: '',
      })
    }
  }, [alunoEditando])

  const fetchSelects = async () => {
    const res = await api.get('/training-coordinators/class-teacher/turmas', { params: filters })
    const resAddress = await api.get('/units/address', { params: filters })

    setTurmas(res.data)
    setUnidades(resAddress.data)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      const headers = { Authorization: `Bearer ${token}` }
      const url = `/secretaria-academica/students`

      if (alunoEditando) {
        await axios.put(`${url}/${alunoEditando.id}`, form, { headers })
      } else {
        await axios.post(url, form, { headers })
      }

      onSalvo()
      document.getElementById('btnCloseModalAluno').click()
    } catch (err) {
      console.error('Erro ao salvar aluno:', err.response?.data || err.message)
    }
  }

  return (
    <div className="modal fade" id="modalAluno" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{alunoEditando ? 'Editar Aluno' : 'Registrar Aluno'}</h5>
            <button id="btnCloseModalAluno" className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body">
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Nome</label>
                <input
                  name="nome"
                  className="form-control"
                  value={form.nome}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-3">
                {/* <label className="form-label">Unidade ID</label>
                <input
                  name="unidade_id"
                  type="number"
                  className="form-control"
                  value={form.unidade_id}
                  onChange={handleChange}
                /> */}

                <CFormSelect
                  className="mb-3"
                  name="unidade_id"
                  label="Unidade"
                  value={form.unidade_id}
                  onChange={handleChange}
                >
                  <option value="">Selecione...</option>
                  {unidades.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.nome} - {e.endereco?.rua}
                    </option>
                  ))}
                </CFormSelect>
              </div>

              <div className="col-md-3">
                {/* <label className="form-label">Turma ID</label>
                <input
                  name="turma_id"
                  type="number"
                  className="form-control"
                  value={form.turma_id}
                  onChange={handleChange}
                /> */}
                <CFormSelect
                  className="mb-3"
                  name="turma_id"
                  label="Turma"
                  value={form.turma_id}
                  onChange={handleChange}
                >
                  <option value="">Selecione...</option>
                  {turmas.map((e) => (
                    <option key={e.id} value={e.id}>
                      {e.nome} - {e.curso?.titulo}
                    </option>
                  ))}
                </CFormSelect>
              </div>

              <div className="col-md-4">
                <label className="form-label">Data de Nascimento</label>
                <input
                  name="data_nascimento"
                  type="date"
                  className="form-control"
                  value={form.data_nascimento}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Sexo</label>
                <select
                  name="sexo"
                  className="form-select"
                  value={form.sexo}
                  onChange={handleChange}
                >
                  <option value="">--</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Telefone</label>
                <input
                  name="telefone"
                  className="form-control"
                  value={form.telefone}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Documento</label>
                <input
                  name="documento"
                  className="form-control"
                  value={form.documento}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-8">
                <label className="form-label">Endereço</label>
                <input
                  name="endereco"
                  className="form-control"
                  value={form.endereco}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Status</label>
                <input
                  name="status"
                  className="form-control"
                  value={form.status}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">
              Cancelar
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              {alunoEditando ? 'Salvar Alterações' : 'Registrar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModalAluno
