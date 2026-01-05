// components/Salary/SalaryPage.jsx
import React, { useState, useEffect } from 'react'
import {
  CContainer,
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CRow,
  CCol,
  CSpinner,
  CAlert,
} from '@coreui/react'
import { getSalaries } from '../../../services/salaryService'
import { getEmployees } from '../../../services/employeesService'
import { exportSalariesPDF, exportSalariesExcel } from '../../../services/Pdfs/SalaryExportService'
import SalaryFilters from './SalaryFilters'
import SalaryKPIs from './SalaryKPIs'
import SalaryTable from './SalaryTable'
import ModalAdjustDiscount from './ModalAdjustDiscount'
import ModalPaySalary from './ModalPaySalary'
import ModalEmployeeSelect from './ModalEmployeeSelect'
import ModalSalaryHistory from './ModalSalaryHistory'
import { isCaixaAbertoHoje } from '../../../services/cashMovementsService'

const SalaryPage = () => {
  const [filters, setFilters] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
    funcionario_id: '',
    status: '',
  })
  const [salaries, setSalaries] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(false)
  const [kpis, setKpis] = useState(null)
  const [error, setError] = useState('')
  const [modalAdjust, setModalAdjust] = useState({ open: false, item: null })
  const [modalPay, setModalPay] = useState({ open: false, item: null })
  const [modalSelectEmployee, setModalSelectEmployee] = useState(false)
  const [modalHistory, setModalHistory] = useState({ open: false, employee: null })
  const [caixaStatus, setCaixaStatus] = useState({ aberto: false, fechadoHoje: false })

  const loadEmployees = async () => {
    try {
      const data = await getEmployees()
      setEmployees(data)
    } catch (err) {
      console.error(err)
    }
  }

  const loadSalaries = async (f = filters) => {
    setLoading(true)
    setError('')
    try {
      const data = await getSalaries(f)
      setSalaries(data)
      computeKPIs(data)
    } catch (err) {
      setError('Erro ao carregar salários')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const computeKPIs = (items) => {
    const totalBruto = items.reduce((s, r) => s + Number(r.salario_base || 0), 0)
    const totalBeneficios = items.reduce((s, r) => s + Number(r.beneficios || 0), 0)
    const totalDescontos = items.reduce((s, r) => s + Number(r.descontos || 0), 0)
    const totalLiquido = items.reduce((s, r) => s + Number(r.valor_liquido || 0), 0)
    const pendentes = items.filter((r) => !r.data_pagamento).length
    setKpis({ totalBruto, totalBeneficios, totalDescontos, totalLiquido, pendentes })
  }

  useEffect(() => {
    loadEmployees()
    ;(async () => {
      const cs = await isCaixaAbertoHoje()
      setCaixaStatus({ aberto: !!cs.aberto, fechadoHoje: !!cs.fechadoHoje })
    })()
  }, [])

  useEffect(() => {
    loadSalaries()
  }, [filters])

  return (
    <CContainer className="py-4">
      <CCard className="mb-3">
        <CCardHeader>
          <h4>Salários — Recursos Humanos</h4>
        </CCardHeader>
        <CCardBody>
          <SalaryFilters filters={filters} setFilters={setFilters} employees={employees} />
          <div className="d-flex gap-2 mt-3">
            <CButton color="info" onClick={() => exportSalariesPDF(salaries)}>
              Exportar PDF
            </CButton>
            <CButton color="success" onClick={() => exportSalariesExcel(salaries)}>
              Exportar Excel
            </CButton>
            <CButton color="primary" onClick={() => setModalSelectEmployee(true)}>
              Novo Lançamento
            </CButton>
          </div>
          {error && (
            <CAlert color="danger" className="mt-3">
              {error}
            </CAlert>
          )}
        </CCardBody>
      </CCard>

      {loading ? (
        <CSpinner />
      ) : (
        <>
          <SalaryKPIs kpis={kpis} />
          <SalaryTable
            salaries={salaries}
            onAdjust={(item) => setModalAdjust({ open: true, item })}
            onPay={(item) => {
              // checar caixa antes de permitir pagamento
              if (!caixaStatus.aberto || !caixaStatus.fechadoHoje) {
                setError('Não é possível pagar: caixa não foi aberto e fechado na data correta.')
                return
              }
              setModalPay({ open: true, item })
            }}
            onHistory={(employee) => setModalHistory({ open: true, employee })}
          />
        </>
      )}

      <ModalAdjustDiscount
        isOpen={modalAdjust.open}
        salary={modalAdjust.item}
        onClose={() => setModalAdjust({ open: false, item: null })}
        onSaved={() => loadSalaries()}
      />

      <ModalPaySalary
        isOpen={modalPay.open}
        salary={modalPay.item}
        onClose={() => setModalPay({ open: false, item: null })}
        onPaid={() => loadSalaries()}
      />

      <ModalEmployeeSelect
        isOpen={modalSelectEmployee}
        onClose={() => setModalSelectEmployee(false)}
        onSelected={(employee) => {
          setModalSelectEmployee(false)
          setModalPay({
            open: true,
            item: {
              funcionario: employee,
              salario_base: employee.salario_base || 0,
              beneficios: employee.beneficios || 0,
            },
          })
        }}
      />

      <ModalSalaryHistory
        isOpen={modalHistory.open}
        employee={modalHistory.employee}
        onClose={() => setModalHistory({ open: false, employee: null })}
      />
    </CContainer>
  )
}

export default SalaryPage
