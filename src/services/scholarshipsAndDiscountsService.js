import api from '../api'
// services/scholarshipsAndDiscountsService.js

const API = '/financeiro/scholarships-and-discounts'

export default {
  async getAll(filters = {}) {
    const res = await api.get(API, { params: filters })
    return res.data
  },

  async create(payload) {
    const res = await api.post(API, payload)
    return res.data
  },

  async update(id, payload) {
    const res = await api.put(`${API}/${id}`, payload)
    return res.data
  },

  async remove(id) {
    const res = await api.delete(`${API}/${id}`)
    return res.data
  }
}
