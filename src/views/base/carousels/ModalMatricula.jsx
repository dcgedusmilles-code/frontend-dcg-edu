import { useEffect, useState } from 'react'
import axios from 'axios'


export default function ModalMatricula({ matriculaEditando, onSalvo }) {
  const [alunos, setAlunos] = useState([])
  const [cursos, setCursos] = useState([])
  const [turmas, setTurmas] = useState([])

  const [alunoId, setAlunoId] = useState('')
  const [cursoId, setCursoId] = useState('')
  const [turmaId, setTurmaId] = useState('')
  const [dataMatricula, setDataMatricula] = useState('')

  const [professor, setProfessor] = useState(null)
  const [cursoProfessor, setCursoProfessor] = useState(null)

   // ✅ Base URL da API via variável de ambiente
  const API_BASE_URL = import.meta.env.VITE_API_URL

  // ✅ Instância configurada do Axios
  const api = axios.create({
    baseURL: API_BASE_URL,
  })
  

  // Carregar alunos e cursos
  useEffect(() => {
    fetchAlunos()
    fetchCursos()
  }, [])

  const fetchAlunos = async () => {
    try {
      const { data } = await api.get('/secretaria-academica/alunos')
      setAlunos(data)
    } catch (err) {
      console.error('Erro ao buscar alunos:', err)
    }
  }

  const fetchCursos = async () => {
    try {
      const { data } = await api.get('/secretaria-academica/cursos')
      setCursos(data)
    } catch (err) {
      console.error('Erro ao buscar cursos:', err)
    }
  }

  const fetchTurmas = async (cursoId) => {
    if (!cursoId) return
    try {
      const { data } = await api.get(`/secretaria-academica/turmas?curso_id=${cursoId}`)
      setTurmas(data || [])
    } catch (err) {
      console.error('Erro ao buscar turmas:', err)
    }
  }

  // Preencher campos se estiver editando
  useEffect(() => {
    if (matriculaEditando) {
      setAlunoId(matriculaEditando.aluno_id)
      setCursoId(matriculaEditando.curso_id)
      setTurmaId(matriculaEditando.turma_id)
      setDataMatricula(matriculaEditando.data_matricula || '')

      if (matriculaEditando.turma) {
        setProfessor(matriculaEditando.turma.professor)
        setCursoProfessor(matriculaEditando.turma.professor?.curso)
      }
    } else {
      resetForm()
    }
  }, [matriculaEditando])

  const resetForm = () => {
    setAlunoId('')
    setCursoId('')
    setTurmaId('')
    setDataMatricula('')
    setProfessor(null)
    setCursoProfessor(null)
  }

  const salvarMatricula = async (e) => {
    e.preventDefault()

    const payload = {
      aluno_id: alunoId,
      curso_id: cursoId,
      turma_id: turmaId,
      data_matricula: dataMatricula || new Date().toISOString().split('T')[0],
    }

    try {
      if (matriculaEditando) {
        await api.put(`/secretaria-academica/matriculas/${matriculaEditando.id}`, payload)
      } else {
        await api.post('/secretaria-academica/matriculas', payload)
      }

      onSalvo()
      const modal = bootstrap.Modal.getInstance(document.getElementById('modalMatricula'))
      modal.hide()
      resetForm()
    } catch (err) {
      console.error('Erro ao salvar matrícula:', err)
    }
  }

  // Atualizar turmas quando curso mudar
  useEffect(() => {
    if (cursoId) {
      fetchTurmas(cursoId)
    } else {
      setTurmas([])
    }
  }, [cursoId])

  // Atualizar professor quando turma mudar
  useEffect(() => {
    const turmaSelecionada = turmas.find((t) => String(t.id) === String(turmaId))
    if (turmaSelecionada) {
      setProfessor(turmaSelecionada.professor)
      setCursoProfessor(turmaSelecionada.professor?.curso)
    } else {
      setProfessor(null)
      setCursoProfessor(null)
    }
  }, [turmaId, turmas])

  return (
    <div className="modal fade" id="modalMatricula" tabIndex="-1">
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <form onSubmit={salvarMatricula}>
            <div className="modal-header">
              <h5 className="modal-title">
                {matriculaEditando ? 'Editar Matrícula' : 'Nova Matrícula'}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              {/* Seleção de aluno */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Aluno</label>
                  <select
                    className="form-select"
                    value={alunoId}
                    onChange={(e) => setAlunoId(e.target.value)}
                    required
                  >
                    <option value="">Selecione...</option>
                    {alunos.map((a) => (
                      <option key={a.id} value={a.id}>
                        {a.nome}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Curso */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Curso</label>
                  <select
                    className="form-select"
                    value={cursoId}
                    onChange={(e) => setCursoId(e.target.value)}
                    required
                  >
                    <option value="">Selecione...</option>
                    {cursos.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nome}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Turma */}
              <div className="mb-3">
                <label className="form-label">Turma</label>
                <select
                  className="form-select"
                  value={turmaId}
                  onChange={(e) => setTurmaId(e.target.value)}
                  required
                >
                  <option value="">Selecione...</option>
                  {turmas.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.nome}
                    </option>
                  ))}
                </select>
              </div>

              {/* Professor */}
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Professor</label>
                  <input
                    type="text"
                    className="form-control"
                    value={professor?.nome || ''}
                    disabled
                  />
                </div>

                {/* Curso do professor */}
                <div className="col-md-6 mb-3">
                  <label className="form-label">Curso do Professor</label>
                  <input
                    type="text"
                    className="form-control"
                    value={cursoProfessor?.nome || ''}
                    disabled
                  />
                </div>
              </div>

              {/* Data da matrícula */}
              <div className="mb-3">
                <label className="form-label">Data da Matrícula</label>
                <input
                  type="date"
                  className="form-control"
                  value={dataMatricula}
                  onChange={(e) => setDataMatricula(e.target.value)}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                {matriculaEditando ? 'Atualizar' : 'Salvar'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
