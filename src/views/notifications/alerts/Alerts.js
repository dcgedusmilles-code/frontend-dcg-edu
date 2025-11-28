


// Component 3: TransferScreen.js
// Combines logic, API calls and UI

import React, { useEffect, useState } from 'react'
import axios from '../../../api'
import { CButton, CContainer } from '@coreui/react'
import { TransferForm } from './TransferForm'
import { TransferSummary } from './TransferSummary'

const TransferScreen = () => {
  const [students, setStudents] = useState([])
  const [cursos, setCursos] = useState([])
  const [turmas, setTurmas] = useState([])
  const [unidades, setUnidades] = useState([])
  const [selectedAluno, setSelectedAluno] = useState(null)

  const [form, setForm] = useState({
    aluno_id: '',
    curso_origem: '',
    curso_destino: '',
    turma_id: '',
    unidade_id: '',
    status: 'Em Análise',
  })

  // Load data
  useEffect(() => {
    axios.get('/secretaria-academica/students').then((res) => setStudents(res.data))
    axios.get('/training-coordinators/courses').then((res) => setCursos(res.data))
    axios.get('/training-coordinators/class-teacher/turmas').then((res) => setTurmas(res.data))
    axios.get('/units/address').then((res) => setUnidades(res.data))
  }, [])

  // Load aluno origin data
  useEffect(() => {
    if (form.aluno_id) {
      const aluno = students.find((a) => a.id == form.aluno_id)
      setSelectedAluno(aluno)
      setForm((prev) => ({ ...prev, curso_origem: aluno?.curso || '' }))
    }
  }, [form.aluno_id, students])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleTransferir = async () => {
    await axios.post('/secretaria-academica/transfers', form)
    await axios.patch(`/secretaria-academica/students/${form.aluno_id}`, {
      curso_id: form.curso_destino,
      turma_id: form.turma_id,
      unidade_id: form.unidade_id,
    })
    alert('Transferência realizada com sucesso!')
  }

  return (
    <CContainer>
      <h3 className="mb-4">Transferência de Aluno</h3>

      <TransferForm
        form={form}
        onChange={handleChange}
        students={students}
        cursos={cursos}
        turmas={turmas}
        unidades={unidades}
      />

      <TransferSummary form={form} selectedAluno={selectedAluno} />

      <CButton color="primary" className="mt-3" onClick={handleTransferir}>
        Confirmar Transferência
      </CButton>
    </CContainer>
  )
}

export default TransferScreen
