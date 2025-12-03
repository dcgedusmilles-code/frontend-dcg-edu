// service/accountsReceberService.js
import api from '../api'

const API = '/financeiro/accounts-receivable'

export const getContasReceber = (filters = {}) => {
  return api.get(API, { params: filters })
}

export const createContaReceber = (data) => {
  return api.post(API, data)
}

export const updateContaReceber = (id, data) => {
  return api.put(`${API}/${id}`, data)
}

export const deleteContaReceber = (id) => {
  return api.delete(`${API}/${id}`)
}
