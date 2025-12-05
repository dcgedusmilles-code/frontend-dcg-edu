import * as XLSX from 'xlsx'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export const exportToExcel = (data, filename = 'relatorio.xlsx') => {
  const worksheet = XLSX.utils.json_to_sheet(data)
  const workbook = XLSX.utils.book_new()
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório')
  XLSX.writeFile(workbook, filename)
}

export const exportToPDF = (data, filename = 'relatorio.pdf') => {
  const doc = new jsPDF()
  const columns = data.length ? Object.keys(data[0]) : []
  const rows = data.map((row) => columns.map((col) => row[col]))
  doc.autoTable({ head: [columns], body: rows })
  doc.save(filename)
}
