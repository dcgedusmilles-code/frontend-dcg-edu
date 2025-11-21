import React, { useState } from 'react'

const ModalFiltros = ({ onFiltrar }) => {
  const [filters, setFilters] = useState({
    search: '',
    unidade_id: '',
    turma_id: '',
    sexo: '',
    status: '',
  })

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const aplicarFiltros = () => {
    onFiltrar(filters)
    document.getElementById('btnCloseModalFiltros').click()
  }

  return (
    <div className="modal fade" id="modalFiltros" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">Filtros de Alunos</h5>
            <button id="btnCloseModalFiltros" className="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div className="modal-body">
            <div className="row g-3">

              <div className="col-12">
                <label className="form-label">Pesquisar por nome, email ou documento</label>
                <input
                  name="search"
                  className="form-control"
                  value={filters.search}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Unidade ID</label>
                <input
                  name="unidade_id"
                  type="number"
                  className="form-control"
                  value={filters.unidade_id}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Turma ID</label>
                <input
                  name="turma_id"
                  type="number"
                  className="form-control"
                  value={filters.turma_id}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Sexo</label>
                <select name="sexo" className="form-select" value={filters.sexo} onChange={handleChange}>
                  <option value="">Todos</option>
                  <option value="M">Masculino</option>
                  <option value="F">Feminino</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Status</label>
                <input
                  name="status"
                  className="form-control"
                  value={filters.status}
                  onChange={handleChange}
                />
              </div>

            </div>
          </div>

          <div className="modal-footer">
            <button className="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            <button className="btn btn-primary" onClick={aplicarFiltros}>Aplicar Filtros</button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default ModalFiltros
