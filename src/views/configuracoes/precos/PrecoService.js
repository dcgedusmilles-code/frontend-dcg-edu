import api from '../../../api'

const BASE = '/financeiro/precos'

export default {
  async listar() {
    const res = await api.get(BASE)
    return res.data
  },

  async criar(data) {
    const res = await api.post(BASE, data)
    return res.data
  },

  async atualizar(id, data) {
    const res = await api.put(`${BASE}/${id}`, data)
    return res.data
  },

  async excluir(id) {
    const res = await api.delete(`${BASE}/${id}`)
    return res.data
  },
}
