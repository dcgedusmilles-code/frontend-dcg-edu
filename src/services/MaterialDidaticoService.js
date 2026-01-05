// src/services/MaterialDidaticoService.js
import api from '../api'

const API = '/pedagogico/material-didatico'

export const listar = async (params = {}) => {
  return api.get(API)
}

export const obterPorId = async (id) => {
  return api.get(`${API}/${id}`)
}

export const criar = async (data) => {
  return api.post(API, data)
}

export const atualizar = async (id, data) => {
  return api.put(`${API}/${id}`, data)
}

export const remover = async (id) => {
  return api.delete(`${API}/${id}`)
}
