// services/employeesService.js
import api from '../api'

export const getEmployees = async (params = {}) => {
  const res = await api.get('/human-resources/employees', { params });
  // espera que res.data seja array de funcionários
  return res.data;
};

export const getEmployeeById = async (id) => {
  const res = await api.get(`/human-resources/employees/${id}`);
  return res.data;
};
