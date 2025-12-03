import api from '../api'

const inadimplenciaService = {
  listar: async (filters) => {
    const res = await api.get("/financeiro/default-report", {
      params: filters,
    });
    return res.data;
  },

  criar: async (dados) => {
    const res = await api.post("/financeiro/default-report", dados);
    return res.data;
  },

  listarAlunos: async () => {
    const res = await api.get("/pedagogico/alunos");
    return res.data;
  },

  listarMensalidades: async () => {
    const res = await api.get("/financeiro/mensalidades");
    return res.data;
  },
};

export default inadimplenciaService;
