import React, { useState } from 'react'
import { CCol } from '@coreui/react'

const ModalFiltros = ({ onFiltrar }) => {
  const [filters, setFilters] = useState({
    perPage: 10,
    startDate: '',
    endDate: '',
    keyFilter: 'null',
    search: '',
    orderBy: '',
    status: '',
    sexo: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    onFiltrar?.(filters)
  }

  const handleReset = () => {
    const resetFilters = {
      perPage: 10,
      startDate: '',
      endDate: '',
      keyFilter: 'null',
      search: '',
      orderBy: '',
      status: '',
      sexo: '',
    }
    setFilters(resetFilters)
    onFiltrar?.(resetFilters)
  }

  return (
    <CCol xs={12}>
      <div className="filter-modal">
        <div className="modal-body">
          <div className="row g-2 align-items-end">
            {/* Itens por página */}
            <div className="col-md-1 col-3">
              <select
                name="perPage"
                value={filters.perPage}
                onChange={handleChange}
                className="form-control"
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
            </div>

            {/* Data de nascimento (início e fim) */}
            <div className="col-md-2 col-6">
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleChange}
                className="form-control"
                placeholder="Data início"
              />
            </div>

            <div className="col-md-2 col-6">
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleChange}
                className="form-control"
                placeholder="Data fim"
              />
            </div>

            {/* Tipo de filtro */}
            <div className="col-md-2">
              <select
                name="keyFilter"
                value={filters.keyFilter}
                onChange={handleChange}
                className="form-control"
              >
                <option value="null">Filtrar por...</option>
                <option value="id">ID</option>
                <option value="nome">Nome</option>
                <option value="email">E-mail</option>
                <option value="telefone">Telefone</option>
                <option value="documento">Documento</option>
              </select>
            </div>

            {/* Campo de pesquisa */}
            <div className="col-md-3">
              <div className="position-relative">
                <input
                  type="text"
                  name="search"
                  value={filters.search}
                  onChange={handleChange}
                  placeholder="Pesquisar..."
                  className="form-control"
                />
                <i
                  className="fa fa-search position-absolute"
                  style={{
                    right: 10,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: 18,
                    color: '#777',
                  }}
                />
              </div>
            </div>

            {/* Ordenar por */}
            <div className="col-md-2">
              <select
                name="orderBy"
                value={filters.orderBy}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Ordenar por...</option>
                <option value="nome">Nome</option>
                <option value="createdAt">Data de Criação</option>
                <option value="data_nascimento">Data de Nascimento</option>
              </select>
            </div>

            {/* Status */}
            <div className="col-md-2">
              <select
                name="status"
                value={filters.status}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Status</option>
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
                <option value="Transferido">Transferido</option>
                <option value="Concluído">Concluído</option>
              </select>
            </div>

            {/* Sexo */}
            <div className="col-md-2">
              <select
                name="sexo"
                value={filters.sexo}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Sexo</option>
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </div>

            {/* Botões */}
            <div className="col-md-3 d-flex gap-2">
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleSubmit}
              >
                <i className="fa fa-search" /> Filtrar
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleReset}
              >
                <i className="fa fa-undo" /> Limpar
              </button>
              <button
                type="button"
                className="btn btn-success btn-sm"
                disabled={false}
              >
                <i className="fa fa-file-excel-o" /> Excel
              </button>
            </div>
          </div>
        </div>
      </div>
    </CCol>
  )
}

export default ModalFiltros
