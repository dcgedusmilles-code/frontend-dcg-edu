// src/services/MaterialDidaticoService.js
import api from '../api'

const API = "/pedagogico/material-didatico";

  export async function listar() {
    return api.get(API);
  }

  export async function obterPorId(id) {
    return api.get(`${API}/${id}`);
  }

  export async function criar(data) {
    return api.post(API, data);
  }

  export async function atualizar(id, data) {
    return api.put(`${API}/${id}`, data);
  }

  export async function remover(id) {
    return api.delete(`${API}/${id}`);
  }
