import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react'

const ModalInadimplenciaFiltro = ({ visible, onClose, filters, setFilters }) => {
  const applyFilter = () => onClose()

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Filtrar Inadimplência</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <div className="mb-3">
          <label>Aluno</label>
          <CFormInput
            value={filters.aluno}
            onChange={(e) => setFilters({ ...filters, aluno: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Status da Negociação</label>
          <CFormSelect
            value={filters.status_negociacao}
            onChange={(e) => setFilters({ ...filters, status_negociacao: e.target.value })}
          >
            <option value="">Todos</option>
            <option value="pendente">Pendente</option>
            <option value="em_negociacao">Em Negociação</option>
            <option value="resolvido">Resolvido</option>
          </CFormSelect>
        </div>

        <div className="mb-3">
          <label>Dias Mínimos de Atraso</label>
          <CFormInput
            type="number"
            value={filters.dias_min}
            onChange={(e) => setFilters({ ...filters, dias_min: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Dias Máximos de Atraso</label>
          <CFormInput
            type="number"
            value={filters.dias_max}
            onChange={(e) => setFilters({ ...filters, dias_max: e.target.value })}
          />
        </div>

        <div className="text-end">
          <CButton color="secondary" className="me-2" onClick={onClose}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={applyFilter}>
            Aplicar
          </CButton>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default ModalInadimplenciaFiltro
