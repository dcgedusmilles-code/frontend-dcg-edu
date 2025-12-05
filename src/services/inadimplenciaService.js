import api from '../api'
export async function listar(filters) {
    const res = await api.get("/financeiro/default-report", {
      params: filters,
    });
    return res.data;
  }

  export async function criar (dados) {
    const res = await api.post("/financeiro/default-report", dados);
    return res.data;
  }

  export async function listarAlunos () {
    const res = await api.get("/pedagogico/alunos");
    return res.data;
  }

  export async function listarMensalidades() {
    const res = await api.get("/financeiro/mensalidades");
    return res.data;
  }

