// src/views/MaterialDidatico/MaterialDidaticoForm.jsx
import React, { useEffect, useState } from "react";
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CModalTitle,
  CForm,
  CFormLabel,
  CFormInput,
  CFormSelect,
  CButton,
} from "@coreui/react";
import { atualizar, criar,listar, obterPorId, remover} from "../../../services/MaterialDidaticoService";
import api from '../../../api'

const MaterialDidaticoForm = ({ visible, onClose, item, reload }) => {
  const [data, setData] = useState({
    titulo: "",
    descricao: "",
    nivel: "",
    tipo: "",
    autor: "",
    editora: "",
    idioma: "",
    ano_publicacao: "",
    url_download: "",
    unidade_id: "",
    preco_id: "",
    curso_id: "",
    ativo: true,
  });

  const [unidades, setUnidades] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [precos, setPrecos] = useState([]);

  useEffect(() => {
    api.get("/units/address").then((r) => setUnidades(r.data));
    api.get("/training-coordinators/courses").then((r) => setCursos(r.data));
    api.get("/pedagogico/precos").then((r) => setPrecos(r.data));
  }, []);

  useEffect(() => {
    if (visible && item) setData(item);
    if (visible && !item)
      setData({
        titulo: "",
        descricao: "",
        nivel: "",
        tipo: "",
        autor: "",
        editora: "",
        idioma: "",
        ano_publicacao: "",
        url_download: "",
        unidade_id: "",
        preco_id: "",
        curso_id: "",
        ativo: true,
      });
  }, [visible, item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const salvar = () => {
    if (item) {
      atualizar(item.id, data).then(() => {
        reload();
        onClose();
      });
    } else {
      criar(data).then(() => {
        reload();
        onClose();
      });
    }
  };

  return (
    <CModal visible={visible} onClose={onClose} size="lg">
      <CModalHeader>
        <CModalTitle>
          {item ? "Editar Material Didático" : "Novo Material Didático"}
        </CModalTitle>
      </CModalHeader>

      <CModalBody>
        <CForm>
          <CFormLabel>Título</CFormLabel>
          <CFormInput name="titulo" value={data.titulo} onChange={handleChange} />

          <CFormLabel className="mt-2">Descrição</CFormLabel>
          <CFormInput
            name="descricao"
            value={data.descricao}
            onChange={handleChange}
          />

          <CFormLabel className="mt-2">Nível</CFormLabel>
          <CFormSelect name="nivel" value={data.nivel} onChange={handleChange}>
            <option value="">Selecionar</option>
            <option value="iniciante">Iniciante</option>
            <option value="elementar">Elementar</option>
            <option value="intermedio">Intermédio</option>
            <option value="avancado">Avançado</option>
          </CFormSelect>

          <div className="row mt-2">
            <div className="col">
              <CFormLabel>Tipo</CFormLabel>
              <CFormInput name="tipo" value={data.tipo} onChange={handleChange} />
            </div>
            <div className="col">
              <CFormLabel>Autor</CFormLabel>
              <CFormInput name="autor" value={data.autor} onChange={handleChange} />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col">
              <CFormLabel>Editora</CFormLabel>
              <CFormInput
                name="editora"
                value={data.editora}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <CFormLabel>Idioma</CFormLabel>
              <CFormInput name="idioma" value={data.idioma} onChange={handleChange} />
            </div>
          </div>

          <div className="row mt-2">
            <div className="col">
              <CFormLabel>Ano Publicação</CFormLabel>
              <CFormInput
                type="number"
                name="ano_publicacao"
                value={data.ano_publicacao}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <CFormLabel>URL Download</CFormLabel>
              <CFormInput
                name="url_download"
                value={data.url_download}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mt-3">
            <div className="col">
              <CFormLabel>Unidade</CFormLabel>
              <CFormSelect
                name="unidade_id"
                value={data.unidade_id}
                onChange={handleChange}
              >
                <option value="">Selecionar</option>
                {unidades.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.nome}
                  </option>
                ))}
              </CFormSelect>
            </div>

            <div className="col">
              <CFormLabel>Curso</CFormLabel>
              <CFormSelect
                name="curso_id"
                value={data.curso_id}
                onChange={handleChange}
              >
                <option value="">Selecionar</option>
                {cursos.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.nome}
                  </option>
                ))}
              </CFormSelect>
            </div>

            <div className="col">
              <CFormLabel>Preço</CFormLabel>
              <CFormSelect
                name="preco_id"
                value={data.preco_id}
                onChange={handleChange}
              >
                <option value="">Selecionar</option>
                {precos.map((p) => (
                  <option key={p.id} value={p.id}>
                    ID {p.id} – {p.preco_individual} AOA
                  </option>
                ))}
              </CFormSelect>
            </div>
          </div>

          <CFormLabel className="mt-3">Status</CFormLabel>
          <CFormSelect name="ativo" value={data.ativo} onChange={handleChange}>
            <option value={true}>Ativo</option>
            <option value={false}>Inativo</option>
          </CFormSelect>
        </CForm>
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={salvar}>
          Salvar
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

export default MaterialDidaticoForm;
