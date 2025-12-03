import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CFormSelect,
  CButton,
} from "@coreui/react";

const ModalSalarioFuncionarioFiltro = ({ visible, onClose, filters, setFilters }) => {
  const apply = () => onClose();

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Filtrar Salários</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <div className="mb-3">
          <label>Funcionário</label>
          <CFormInput
            value={filters.funcionario}
            onChange={(e) =>
              setFilters({ ...filters, funcionario: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label>Mês</label>
          <CFormSelect
            value={filters.mes}
            onChange={(e) => setFilters({ ...filters, mes: e.target.value })}
          >
            <option value="">Todos</option>
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </CFormSelect>
        </div>

        <div className="mb-3">
          <label>Ano</label>
          <CFormInput
            type="number"
            value={filters.ano}
            onChange={(e) => setFilters({ ...filters, ano: e.target.value })}
          />
        </div>

        <div className="text-end">
          <CButton color="secondary" className="me-2" onClick={onClose}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={apply}>
            Aplicar Filtro
          </CButton>
        </div>
      </CModalBody>
    </CModal>
  );
};

export default ModalSalarioFuncionarioFiltro;
