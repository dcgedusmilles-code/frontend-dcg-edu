import api from '../api'

const gerar = async (filtros) => {
  const res = await api.post("/financeiro/relatorio", filtros);
  return res.data;
};

export default { gerar };
