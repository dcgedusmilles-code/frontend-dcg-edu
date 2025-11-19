import React, { useState } from 'react';
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CForm, CFormLabel, CFormInput, CButton } from '@coreui/react';

const AddressFilterModal = ({ visible, onClose, onFilter }) => {
  const [filters, setFilters] = useState({ cidade: '', provincia: '', pais: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    onFilter(filters);
  };

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Filtrar Endereços</CModalTitle>
      </CModalHeader>
      <CForm onSubmit={handleApplyFilters}>
        <CModalBody>
          <div className="mb-3">
            <CFormLabel htmlFor="cidade">Cidade</CFormLabel>
            <CFormInput id="cidade" name="cidade" value={filters.cidade} onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="provincia">Província</CFormLabel>
            <CFormInput id="provincia" name="provincia" value={filters.provincia} onChange={handleInputChange} />
          </div>
          <div className="mb-3">
            <CFormLabel htmlFor="pais">País</CFormLabel>
            <CFormInput id="pais" name="pais" value={filters.pais} onChange={handleInputChange} />
          </div>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={onClose}>
            Cancelar
          </CButton>
          <CButton color="primary" type="submit">
            Aplicar Filtros
          </CButton>
        </CModalFooter>
      </CForm>
    </CModal>
  );
};

export default AddressFilterModal;