// services/exportService.js
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';

export const exportSalariesPDF = (data = [], title = 'Relatório de Salários') => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(title, 14, 18);

  const columns = ['Funcionário', 'Salário Base', 'Benefícios', 'Descontos', 'Valor Líquido', 'Data Pagamento', 'Status'];
  const rows = data.map((r) => [
    r.funcionario_nome || r.funcionario?.nome || '-',
    r.salario_base ?? 0,
    r.beneficios ?? 0,
    r.descontos ?? 0,
    r.valor_liquido ?? 0,
    r.data_pagamento ? new Date(r.data_pagamento).toLocaleDateString() : '-',
    r.data_pagamento ? 'Pago' : 'Pendente',
  ]);

  doc.autoTable({
    head: [columns],
    body: rows,
    startY: 24,
    styles: { fontSize: 10 },
  });

  doc.save(`${title}.pdf`);
};

export const exportSalariesExcel = (data = [], fileName = 'salarios.xlsx') => {
  const wsData = data.map((r) => ({
    Funcionario: r.funcionario_nome || r.funcionario?.nome || '-',
    SalarioBase: r.salario_base ?? 0,
    Beneficios: r.beneficios ?? 0,
    Descontos: r.descontos ?? 0,
    ValorLiquido: r.valor_liquido ?? 0,
    DataPagamento: r.data_pagamento ? new Date(r.data_pagamento).toLocaleDateString() : '-',
    Status: r.data_pagamento ? 'Pago' : 'Pendente',
  }));

  const ws = XLSX.utils.json_to_sheet(wsData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Salários');
  XLSX.writeFile(wb, fileName);
};
