import api from '../api'

export async function listar(filters) {
  const res = await api.get('/financeiro/employee-salaries', {
    params: filters,
  })
  return res.data
}

export async function criar(dados) {
  const res = await api.post('/financeiro/employee-salaries', dados)
  return res.data
}

export async function listarFuncionarios() {
  const res = await api.get('/recursos-humanos/funcionarios')
  return res.data
}
