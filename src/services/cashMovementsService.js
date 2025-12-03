import api from '../api'

const API = '/financeiro/cash-movements'

export default {
  async getAll() {
    const res = await api.get(API)
    return res.data
  },

  async create(data) {
    const res = await api.post(API, data)
    return res.data
  },

  async remove(id) {
    const res = await api.delete(`${API}/${id}`)
    return res.data
  },
}
