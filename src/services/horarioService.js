import api from '../api'

const API_URL = '/pedagogico/horario'

export const getHorarios = (params = {}) =>
  api.get(API_URL, { params })

export const createHorario = (data) =>
  api.post(API_URL, data)

export const updateHorario = (id, data) =>
  api.put(`${API_URL}/${id}`, data)

export const deleteHorario = (id) =>
  api.delete(`${API_URL}/${id}`)
