// src/services/MaterialDidaticoService.js
import api from '../api'

const API = "/pedagogico/material-didatico";

class MaterialDidaticoService {
  listar() {
    return api.get(API);
  }

  obterPorId(id) {
    return api.get(`${API}/${id}`);
  }

  criar(data) {
    return api.post(API, data);
  }

  atualizar(id, data) {
    return api.put(`${API}/${id}`, data);
  }

  remover(id) {
    return api.delete(`${API}/${id}`);
  }
}

export default new MaterialDidaticoService();
