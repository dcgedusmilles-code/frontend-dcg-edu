import api from '../api'
import dayjs from 'dayjs'

const API_RECEITAS = '/financeiro/receitas'
const API_MENSALIDADES = '/financeiro/monthly-fees'
const API_MATERIAIS = '/pedagogico/material-didatico'
const API_CAIXA = '/financeiro/caixa-movimento'

export const financeiroService = {
  async getMensalidadesAluno(alunoId) {
    const res = await api.get(`${API_MENSALIDADES}?aluno_id=${alunoId}`)
    return res.data
  },

  async getMateriaisAluno(alunoId) {
    const res = await api.get(`${API_MATERIAIS}?aluno_id=${alunoId}`)
    return res.data
  },

  async getCaixaAbertoHoje() {
    const hoje = dayjs().format('YYYY-MM-DD')
    const res = await api.get(`${API_CAIXA}?data=${hoje}`)
    if (!res.data || res.data.length === 0) return null

    // Caixa só pode estar aberto se foi fechado hoje
    const caixaHoje = res.data.find((c) => dayjs(c.data_movimento).isSame(hoje, 'day'))
    return caixaHoje || null
  },

  async abrirCaixa(valorInicial) {
    const hoje = dayjs().format('YYYY-MM-DD')
    const res = await api.post(API_CAIXA, {
      tipo: 'abertura',
      valor: valorInicial,
      descricao: 'Abertura de caixa',
      data_movimento: hoje,
    })
    return res.data
  },

  async registrarPagamento(dados) {
    const res = await api.post(API_RECEITAS, dados)
    return res.data
  },
}
