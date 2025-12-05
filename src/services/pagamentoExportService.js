import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

/**
 * Gera relatório PDF das receitas
 * @param {Array} data Lista de receitas
 * @param {String} titulo Título do relatório
 */
export const exportarPDF = (data, titulo = 'Relatório de Pagamentos') => {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text(titulo, 14, 22);

  const tableColumn = ["Aluno / Material", "Categoria", "Valor", "Data Recebimento", "Status"];
  const tableRows = [];

  data.forEach(item => {
    tableRows.push([
      item.aluno_nome || item.material_titulo || '-',
      item.categoria,
      item.valor,
      item.data_recebimento,
      item.status
    ]);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30,
  });

  doc.save(`${titulo}.pdf`);
};

/**
 * Gera relatório Excel das receitas
 * @param {Array} data Lista de receitas
 * @param {String} fileName Nome do arquivo
 */
export const exportarExcel = (data, fileName = 'relatorio_pagamentos.xlsx') => {
  const wsData = data.map(item => ({
    'Aluno / Material': item.aluno_nome || item.material_titulo || '-',
    'Categoria': item.categoria,
    'Valor': item.valor,
    'Data Recebimento': item.data_recebimento,
    'Status': item.status,
  }));

  const worksheet = XLSX.utils.json_to_sheet(wsData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Pagamentos');
  XLSX.writeFile(workbook, fileName);
};
