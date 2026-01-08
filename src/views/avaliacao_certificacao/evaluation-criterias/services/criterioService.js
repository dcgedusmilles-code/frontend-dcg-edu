import api from '../../../../api'

export const CriterioService = {
  listar: (params) =>
    api.get('/avaliacao-certicacao/evaluation-criterias', { params }),

  obter: (id) =>
    api.get(`/avaliacao-certicacao/evaluation-criterias/${id}`),

  criar: (data) =>
    api.post('/avaliacao-certicacao/evaluation-criterias', data),

  atualizar: (id, data) =>
    api.put(`/avaliacao-certicacao/evaluation-criterias/${id}`, data),

  remover: (id, motivo) =>
    api.delete(
      `/avaliacao-certicacao/evaluation-criterias/${id}`,
      { data: { motivo } },
    ),

  ativar: (id) =>
    api.patch(
      `/avaliacao-certicacao/evaluation-criterias/${id}/ativar`,
    ),

  importar: (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return api.post(
      '/avaliacao-certicacao/evaluation-criterias/import',
      formData,
    )
  },

  exportar: (params) =>
    api.get(
      '/avaliacao-certicacao/evaluation-criterias/export',
      { params, responseType: 'blob' },
    ),
}
