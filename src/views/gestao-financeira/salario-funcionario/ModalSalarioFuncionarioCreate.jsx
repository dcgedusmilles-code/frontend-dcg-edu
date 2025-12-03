import React, { useEffect, useState } from "react";
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalTitle,
  CFormInput,
  CFormSelect,
  CButton,
} from "@coreui/react";

import salarioFuncionarioService from "../../../services/salarioFuncionarioService";

const ModalSalarioFuncionarioCreate = ({ visible, onClose, refresh }) => {
  const [form, setForm] = useState({
    funcionario_id: "",
    salario_base: "",
    beneficios: "",
    descontos: "",
    valor_liquido: "",
  });

  const [funcionarios, setFuncionarios] = useState([]);

  useEffect(() => {
    if (visible) {
      loadFuncionarios();
    }
  }, [visible]);

  const loadFuncionarios = async () => {
    try {
      const res = await salarioFuncionarioService.listarFuncionarios();
      setFuncionarios(res);
    } catch (e) {
      console.error("Erro ao carregar funcionários:", e);
    }
  };

  const calcularLiquido = () => {
    const base = parseFloat(form.salario_base || 0);
    const ben = parseFloat(form.beneficios || 0);
    const desc = parseFloat(form.descontos || 0);

    return base + ben - desc;
  };

  const handleSubmit = async () => {
    const payload = {
      ...form,
      valor_liquido: calcularLiquido(),
      data_pagamento: new Date(),
    };

    try {
      await salarioFuncionarioService.criar(payload);
      refresh();
      onClose();
    } catch (error) {
      console.error("Erro ao criar salário:", error);
    }
  };

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Registrar Pagamento de Salário</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <div className="mb-3">
          <label>Funcionário</label>
          <CFormSelect
            value={form.funcionario_id}
            onChange={(e) => setForm({ ...form, funcionario_id: e.target.value })}
          >
            <option>Selecione...</option>
            {funcionarios.map((f) => (
              <option key={f.id} value={f.id}>
                {f.nome}
              </option>
            ))}
          </CFormSelect>
        </div>

        <div className="mb-3">
          <label>Salário Base</label>
          <CFormInput
            type="number"
            value={form.salario_base}
            onChange={(e) =>
              setForm({ ...form, salario_base: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label>Benefícios</label>
          <CFormInput
            type="number"
            value={form.beneficios}
            onChange={(e) => setForm({ ...form, beneficios: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Descontos</label>
          <CFormInput
            type="number"
            value={form.descontos}
            onChange={(e) => setForm({ ...form, descontos: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Valor Líquido Calculado</label>
          <CFormInput disabled value={calcularLiquido()} />
        </div>

        <div className="text-end">
          <CButton color="secondary" className="me-2" onClick={onClose}>
            Cancelar
          </CButton>

          <CButton color="primary" onClick={handleSubmit}>
            Registrar Pagamento
          </CButton>
        </div>
      </CModalBody>
    </CModal>
  );
};

export default ModalSalarioFuncionarioCreate;
