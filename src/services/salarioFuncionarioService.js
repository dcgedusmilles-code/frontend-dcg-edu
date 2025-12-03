import api from "../api";

const salarioFuncionarioService = {
  listar: async (filters) => {
    const res = await api.get("/financeiro/employee-salaries", {
      params: filters,
    });
    return res.data;
  },

  criar: async (dados) => {
    const res = await api.post("/financeiro/employee-salaries", dados);
    return res.data;
  },

  listarFuncionarios: async () => {
    const res = await api.get("/recursos-humanos/funcionarios");
    return res.data;
  },
};

export default salarioFuncionarioService;
