import React, { useState, useEffect } from "react";
import {
  CModal,
  CModalBody,
  CModalHeader,
  CModalTitle,
  CFormInput,
  CFormSelect,
  CButton,
} from "@coreui/react";
import inadimplenciaService from "../../../services/inadimplenciaService";

const ModalInadimplenciaCreate = ({ visible, onClose, refresh }) => {
  const [form, setForm] = useState({
    aluno_id: "",
    mensalidade_id: "",
    dias_atraso: "",
    valor_em_aberto: "",
    status_negociacao: "pendente",
  });

  const [alunos, setAlunos] = useState([]);
  const [mensalidades, setMensalidades] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const a = await inadimplenciaService.listarAlunos();
        const m = await inadimplenciaService.listarMensalidades();
        setAlunos(a);
        setMensalidades(m);
      } catch (e) {
        console.error("Erro ao carregar dependências:", e);
      }
    })();
  }, []);

  const handleCreate = async () => {
    try {
      await inadimplenciaService.criar(form);
      refresh();
      onClose();
    } catch (error) {
      console.error("Erro ao criar registro:", error);
    }
  };

  return (
    <CModal visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Registrar Inadimplência</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <div className="mb-3">
          <label>Aluno</label>
          <CFormSelect
            value={form.aluno_id}
            onChange={(e) => setForm({ ...form, aluno_id: e.target.value })}
          >
            <option>Selecionar...</option>
            {alunos.map((a) => (
              <option key={a.id} value={a.id}>
                {a.nome}
              </option>
            ))}
          </CFormSelect>
        </div>

        <div className="mb-3">
          <label>Mensalidade</label>
          <CFormSelect
            value={form.mensalidade_id}
            onChange={(e) =>
              setForm({ ...form, mensalidade_id: e.target.value })
            }
          >
            <option>Selecionar...</option>
            {mensalidades.map((m) => (
              <option key={m.id} value={m.id}>
                {m.mes} / {m.ano}
              </option>
            ))}
          </CFormSelect>
        </div>

        <div className="mb-3">
          <label>Dias de Atraso</label>
          <CFormInput
            type="number"
            value={form.dias_atraso}
            onChange={(e) => setForm({ ...form, dias_atraso: e.target.value })}
          />
        </div>

        <div className="mb-3">
          <label>Valor em Aberto</label>
          <CFormInput
            type="number"
            value={form.valor_em_aberto}
            onChange={(e) =>
              setForm({ ...form, valor_em_aberto: e.target.value })
            }
          />
        </div>

        <div className="mb-3">
          <label>Status da Negociação</label>
          <CFormSelect
            value={form.status_negociacao}
            onChange={(e) =>
              setForm({ ...form, status_negociacao: e.target.value })
            }
          >
            <option value="pendente">Pendente</option>
            <option value="em_negociacao">Em Negociação</option>
            <option value="resolvido">Resolvido</option>
          </CFormSelect>
        </div>

        <div className="text-end">
          <CButton color="secondary" className="me-2" onClick={onClose}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={handleCreate}>
            Salvar
          </CButton>
        </div>
      </CModalBody>
    </CModal>
  );
};

export default ModalInadimplenciaCreate;
