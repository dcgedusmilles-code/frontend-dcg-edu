import api from '../../../../api'

export const AvaliacaoService = {
  listar: (params) => api.get('/avaliacao-certicacao/assessments', { params }),
  obter: (id) => api.get(`/avaliacao-certicacao/assessments/${id}`),
  criar: (data) => api.post('/avaliacao-certicacao/assessments', data),
  atualizar: (id, data) => api.put(`/avaliacao-certicacao/assessments/${id}`, data),
  remover: (id, motivo) =>
    api.delete(`/avaliacao-certicacao/assessments/${id}`, { data: { motivo } }),
  ativar: (id) => api.patch(`/avaliacao-certicacao/assessments/${id}/ativar`),
  importar: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post('/avaliacao-certicacao/assessments/import', formData)
  },
  exportar: (params) =>
    api.get('/avaliacao-certicacao/assessments/export', {
      params,
      responseType: 'blob',
    }),
}
