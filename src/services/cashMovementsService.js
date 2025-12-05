import api from '../api'
import dayjs from 'dayjs'

const API = '/financeiro/cash-movements'

export async function getAll() {
  const res = await api.get(API)
  return res.data
}

export async function create(data) {
  const res = await api.post(API, data)
  return res.data
}

export async function remove(id) {
  const res = await api.delete(`${API}/${id}`)
  return res.data
}

export async function isCaixaAbertoHoje() {
  try {
    const today = dayjs().format('YYYY-MM-DD')
    const res = await api.get(`/financeiro/caixa-movimento?data=${today}`)
    const movimentos = res.data

    const abertoHoje = movimentos.some(
      (m) => m.aberto && dayjs(m.data_movimento).isSame(today, 'day'),
    )
    const fechadoHoje = movimentos.some(
      (m) => m.fechado && dayjs(m.data_movimento).isSame(today, 'day'),
    )

    return abertoHoje && fechadoHoje
  } catch (err) {
    console.error('Erro ao verificar caixa:', err)
    return false
  }
}
