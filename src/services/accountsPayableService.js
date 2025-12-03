// services/accountsPayableService.js
import api from '../api'


const API = '/financeiro/accounts-payable';


export const getAccountsPayable = () => api.get(API);
export const getAccountById = (id) => api.get(`${API}/${id}`);
export const createAccount = (data) => api.post(API, data);
export const updateAccount = (id, data) => api.put(`${API}/${id}`, data);
export const deleteAccount = (id) => api.delete(`${API}/${id}`);