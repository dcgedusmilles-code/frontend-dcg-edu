import api from "../api";

export const createReceita = async (data) => {
  try {
    const res = await api.post('/financeiro/receitas', data)
    return res.data
  } catch (err) {
    console.error('Erro ao registrar pagamento:', err)
    throw err
  }
}
