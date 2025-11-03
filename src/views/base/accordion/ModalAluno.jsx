import { useEffect, useState } from 'react'
import axios from '../../../api'
import Swal from 'sweetalert2'

export default function ModalAluno({ alunoEditando, onSalvo }) {
  const [formData, setFormData] = useState({
    nome: '',
    data_nascimento: '',
    email: '',
    telefone: '',
    sexo: '',
    documento: '',
    endereco: '',
    status: 'ativo',
  })

  const [usarResponsavelExistente, setUsarResponsavelExistente] = useState(false)
  const [responsaveis, setResponsaveis] = useState([])
  const [responsavelSelecionado, setResponsavelSelecionado] = useState('')
  const [novoResponsavel, setNovoResponsavel] = useState({
    nome: '',
    telefone: '',
    email: '',
    parentesco: '',
    endereco: '',
  })

  const [documentos, setDocumentos] = useState([])

  // 🔹 Carrega encarregados existentes se marcado
  useEffect(() => {
    if (usarResponsavelExistente) fetchResponsaveis()
  }, [usarResponsavelExistente])

  const fetchResponsaveis = async () => {
    try {
      const { data } = await axios.get('/secretaria-academica/in-charge')
      setResponsaveis(data)
    } catch (error) {
      console.error('Erro ao carregar encarregados:', error)
    }
  }

  // 🔹 Preenche formulário ao editar
  useEffect(() => {
    if (alunoEditando) {
      setFormData({
        nome: alunoEditando.nome || '',
        data_nascimento: alunoEditando.data_nascimento || '',
        email: alunoEditando.email || '',
        telefone: alunoEditando.telefone || '',
        sexo: alunoEditando.sexo || '',
        documento: alunoEditando.documento || '',
        endereco: alunoEditando.endereco || '',
        status: alunoEditando.status || 'ativo',
      })
    } else {
      resetForm()
    }
  }, [alunoEditando])

  const resetForm = () => {
    setFormData({
      nome: '',
      data_nascimento: '',
      email: '',
      telefone: '',
      sexo: '',
      documento: '',
      endereco: '',
      status: 'ativo',
    })
    setNovoResponsavel({
      nome: '',
      telefone: '',
      email: '',
      parentesco: '',
      endereco: '',
    })
    setResponsavelSelecionado('')
    setUsarResponsavelExistente(false)
    setDocumentos([])
  }

  const salvarAluno = async (e) => {
    e.preventDefault()

    if (!formData.nome.trim()) {
      Swal.fire('Atenção', 'O nome do aluno é obrigatório', 'warning')
      return
    }

    try {
      let encarregadoId = responsavelSelecionado

      // 🔹 Cria novo encarregado, se necessário
      if (!usarResponsavelExistente) {
        if (!novoResponsavel.nome.trim()) {
          Swal.fire('Atenção', 'O nome do encarregado é obrigatório', 'warning')
          return
        }

        const { data: novoEnc } = await axios.post('/secretaria-academica/in-charge', novoResponsavel)
        encarregadoId = novoEnc.id
      }

      // 🔹 Cria ou atualiza aluno
      let alunoId
      if (alunoEditando) {
        const { data } = await axios.put(`/secretaria-academica/students/${alunoEditando.id}`, formData)
        alunoId = data.id
      } else {
        const { data } = await axios.post('/secretaria-academica/students', formData)
        alunoId = data.id
      }

      // 🔹 Relaciona aluno e encarregado
      if (encarregadoId) {
        await axios.post('/secretaria-academica/student-in-charge', {
          aluno_id: alunoId,
          encarregado_id: encarregadoId,
          tipo_responsabilidade: 'geral',
        })
      }

      // 🔹 Upload de documentos
      if (documentos.length > 0) {
        const formDataFiles = new FormData()
        documentos.forEach((file) => formDataFiles.append('files', file))
        await axios.post(`/secretaria-academica/students/${alunoId}/documentos`, formDataFiles, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
      }

      Swal.fire('Sucesso', 'Aluno salvo com sucesso!', 'success')
      onSalvo()
      resetForm()
      const modal = bootstrap.Modal.getInstance(document.getElementById('modalAluno'))
      modal.hide()
    } catch (error) {
      console.error('Erro ao salvar aluno:', error)
      Swal.fire('Erro', 'Falha ao salvar aluno', 'error')
    }
  }

  return (
    <div className="modal fade" id="modalAluno" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={salvarAluno}>
            <div className="modal-header">
              <h5 className="modal-title">{alunoEditando ? 'Editar Aluno' : 'Novo Aluno'}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body row g-3">
              {/* 🔸 Dados do Aluno */}
              <div className="col-md-6">
                <label className="form-label">Nome</label>
                <input className="form-control" value={formData.nome} onChange={(e) => setFormData({ ...formData, nome: e.target.value })} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Data de Nascimento</label>
                <input type="date" className="form-control" value={formData.data_nascimento} onChange={(e) => setFormData({ ...formData, data_nascimento: e.target.value })} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Sexo</label>
                <select className="form-select" value={formData.sexo} onChange={(e) => setFormData({ ...formData, sexo: e.target.value })}>
                  <option value="">Selecione...</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Feminino">Feminino</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Documento</label>
                <input className="form-control" value={formData.documento} onChange={(e) => setFormData({ ...formData, documento: e.target.value })} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Email</label>
                <input type="email" className="form-control" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Telefone</label>
                <input className="form-control" value={formData.telefone} onChange={(e) => setFormData({ ...formData, telefone: e.target.value })} />
              </div>

              <div className="col-md-12">
                <label className="form-label">Endereço</label>
                <input className="form-control" value={formData.endereco} onChange={(e) => setFormData({ ...formData, endereco: e.target.value })} />
              </div>

              <div className="col-md-6">
                <label className="form-label">Status</label>
                <select className="form-select" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                  <option value="ativo">Ativo</option>
                  <option value="inativo">Inativo</option>
                </select>
              </div>

              {/* 🔸 Responsável */}
              <div className="col-12 mt-3">
                <div className="form-check mb-2">
                  <input className="form-check-input" type="checkbox" checked={usarResponsavelExistente} onChange={(e) => setUsarResponsavelExistente(e.target.checked)} />
                  <label className="form-check-label">Usar encarregado existente</label>
                </div>
              </div>

              {usarResponsavelExistente ? (
                <div className="col-md-12">
                  <label className="form-label">Selecione o encarregado</label>
                  <select className="form-select" value={responsavelSelecionado} onChange={(e) => setResponsavelSelecionado(e.target.value)}>
                    <option value="">Selecione...</option>
                    {responsaveis.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.nome} - {r.telefone}
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <>
                  <div className="col-md-6">
                    <label className="form-label">Nome do Encarregado</label>
                    <input className="form-control" value={novoResponsavel.nome} onChange={(e) => setNovoResponsavel({ ...novoResponsavel, nome: e.target.value })} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Telefone</label>
                    <input className="form-control" value={novoResponsavel.telefone} onChange={(e) => setNovoResponsavel({ ...novoResponsavel, telefone: e.target.value })} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" value={novoResponsavel.email} onChange={(e) => setNovoResponsavel({ ...novoResponsavel, email: e.target.value })} />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Parentesco</label>
                    <input className="form-control" value={novoResponsavel.parentesco} onChange={(e) => setNovoResponsavel({ ...novoResponsavel, parentesco: e.target.value })} />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">Endereço</label>
                    <input className="form-control" value={novoResponsavel.endereco} onChange={(e) => setNovoResponsavel({ ...novoResponsavel, endereco: e.target.value })} />
                  </div>
                </>
              )}

              {/* 🔸 Documentos */}
              <div className="col-md-12 mt-3">
                <label className="form-label">Documentos (PDF/DOCX)</label>
                <input type="file" multiple className="form-control" accept=".pdf,.docx" onChange={(e) => setDocumentos(Array.from(e.target.files))} />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {alunoEditando ? 'Atualizar' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
