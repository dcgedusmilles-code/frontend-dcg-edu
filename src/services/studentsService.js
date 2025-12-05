import api from "../api";

export const getStudents = async () => {
  try {
    const res = await api.get('/secretaria-academica/students');
    return res.data;
  } catch (err) {
    console.error('Erro ao buscar alunos:', err);
    throw err;
  }
};
