import React, { useState } from 'react'
import { CCol } from '@coreui/react'

const ModalFiltros = ({ onFiltrar, alunos = [], cursos = [] }) => {
  const [filters, setFilters] = useState({
    perPage: 5,
    startDate: '',
    endDate: '',
    keyFilter: 'null',
    search: '',
    orderBy: '',
    estado: '',
    aluno_id: 'null',
    curso_id: 'null',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onFiltrar?.(filters)
  }

  const handleReset = () => {
    const resetFilters = {
      perPage: 5,
      startDate: '',
      endDate: '',
      keyFilter: 'null',
      search: '',
      orderBy: '',
      estado: '',
      aluno_id: 'null',
      curso_id: 'null',
    }
    setFilters(resetFilters)
    onFiltrar?.(resetFilters)
  }

  return (
    <CCol xs={12}>
      <form className="filter-modal" onSubmit={handleSubmit}>
        <div className="modal-body">
          <div className="row g-2 align-items-end">
            {/* Itens por página */}
            <div className="col-md-1 col-3">
              <label className="visually-hidden">Itens por página</label>
              <select
                name="perPage"
                value={filters.perPage}
                onChange={handleChange}
                className="form-control"
              >
                {[5, 10, 25, 50, 100].map((n) => (
                  <option key={n} value={n}>{n}</option>
                ))}
              </select>
            </div>

            {/* Datas */}
            <div className="col-md-2 col-6">
              <label className="visually-hidden">Data inicial</label>
              <input
                type="date"
                name="startDate"
                value={filters.startDate}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="col-md-2 col-6">
              <label className="visually-hidden">Data final</label>
              <input
                type="date"
                name="endDate"
                value={filters.endDate}
                onChange={handleChange}
                className="form-control"
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
                <option value="null">Tipo de filtro</option>
                <option value="id">ID Matrícula</option>
                <option value="aluno">Aluno</option>
                <option value="curso">Curso</option>
              </select>
            </div>

            {/* Campo de pesquisa */}
            <div className="col-md-3 position-relative">
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
                  color: '#777',
                }}
              />
            </div>

            {/* Ordenação */}
            <div className="col-md-2">
              <select
                name="orderBy"
                value={filters.orderBy}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Ordenar por</option>
                <option value="aluno">Aluno</option>
                <option value="curso">Curso</option>
                <option value="data_matricula">Data Matrícula</option>
              </select>
            </div>

            {/* Status */}
            <div className="col-md-2">
              <select
                name="estado"
                value={filters.estado}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Status</option>
                <option value="1">Ativa</option>
                <option value="0">Cancelada</option>
              </select>
            </div>

            {/* Aluno */}
            <div className="col-md-3">
              <select
                name="aluno_id"
                value={filters.aluno_id}
                onChange={handleChange}
                className="form-control"
              >
                <option value="null">Todos os alunos</option>
                {alunos.map((a) => (
                  <option key={a.id} value={a.id}>{a.nome}</option>
                ))}
              </select>
            </div>

            {/* Curso */}
            <div className="col-md-3">
              <select
                name="curso_id"
                value={filters.curso_id}
                onChange={handleChange}
                className="form-control"
              >
                <option value="null">Todos os cursos</option>
                {cursos.map((c) => (
                  <option key={c.id} value={c.id}>{c.nome}</option>
                ))}
              </select>
            </div>

            {/* Botões */}
            <div className="col-md-3 d-flex gap-2">
              <button type="submit" className="btn btn-primary btn-sm">
                <i className="fa fa-search" /> Filtrar
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleReset}
              >
                <i className="fa fa-eraser" /> Limpar
              </button>
              <button type="button" className="btn btn-success btn-sm">
                <i className="fa fa-file-excel-o" /> Excel
              </button>
            </div>
          </div>
        </div>
      </form>
    </CCol>
  )
}

export default ModalFiltros
