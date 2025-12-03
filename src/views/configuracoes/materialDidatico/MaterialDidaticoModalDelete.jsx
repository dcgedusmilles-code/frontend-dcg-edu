// src/views/MaterialDidatico/MaterialDidaticoModalDelete.jsx
import React from "react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from "@coreui/react";
import MaterialDidaticoService from "../../../services/MaterialDidaticoService";

const MaterialDidaticoModalDelete = ({ visible, onClose, item, reload }) => {
  const apagar = () => {
    MaterialDidaticoService.remover(item.id).then(() => {
      reload();
      onClose();
    });
  };

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Apagar Material</CModalTitle>
      </CModalHeader>

      <CModalBody>
        Tem certeza que deseja apagar o material:
        <br />
        <strong>{item?.titulo}</strong>?
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="danger" onClick={apagar}>
          Apagar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default MaterialDidaticoModalDelete;
