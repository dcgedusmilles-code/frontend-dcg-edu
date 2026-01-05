// services/salaryService.js
import api from '../api'
import dayjs from 'dayjs';

/**
 * Busca salários (com filtros: mes, ano, funcionario_id, status)
 * params: { month, year, funcionario_id, status }
 */
export const getSalaries = async (params = {}) => {
  const res = await api.get('/financeiro/employee-salaries', { params });
  return res.data;
};

/**
 * Buscar histórico de um funcionário
 */
export const getSalaryHistory = async (funcionario_id) => {
  const res = await api.get(`/financeiro/employee-salaries?funcionario_id=${funcionario_id}`);
  return res.data;
};

/**
 * Aplica/atualiza desconto em um registro de salario (PATCH)
 * data: { descontos (array ou valor), nota }
 */
export const adjustDiscount = async (salaryId, data) => {
  const res = await api.patch(`/financeiro/employee-salaries/${salaryId}`, data);
  return res.data;
};

/**
 * Registrar pagamento de salário
 * data: { funcionario_id, salario_base, beneficios, descontos, valor_liquido, data_pagamento, metodo_pagamento, observacao }
 */
export const paySalary = async (data) => {
  const res = await api.post('/financeiro/employee-salaries/pay', data);
  return res.data;
};

/**
 * Verifica se salário do mês (month, year) já foi pago - opção local se backend não suportar
 */
export const isSalaryPaid = (salaryRecord, month, year) => {
  if (!salaryRecord || !salaryRecord.data_pagamento) return false;
  const dp = dayjs(salaryRecord.data_pagamento);
  return dp.month() + 1 === Number(month) && dp.year() === Number(year);
};
