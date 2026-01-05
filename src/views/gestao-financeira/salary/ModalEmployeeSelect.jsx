// ModalEmployeeSelect.jsx
import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CButton,
  CListGroup,
  CListGroupItem,
} from '@coreui/react'
import { getEmployees } from '../../../services/employeesService'

const ModalEmployeeSelect = ({ isOpen, onClose, onSelected }) => {
  const [employees, setEmployees] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!isOpen) return
    ;(async () => {
      const data = await getEmployees()
      setEmployees(data)
    })()
  }, [isOpen])

  if (!isOpen) return null

  const filtered = employees.filter((e) => e.nome.toLowerCase().includes(query.toLowerCase()))

  return (
    <CModal visible={isOpen} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Selecionar Funcionário</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormInput
          placeholder="Buscar por nome"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <CListGroup className="mt-3">
          {filtered.map((emp) => (
            <CListGroupItem
              key={emp.id}
              onClick={() => onSelected(emp)}
              style={{ cursor: 'pointer' }}
            >
              {emp.nome} — {emp.cargo?.nome || ''}
            </CListGroupItem>
          ))}
        </CListGroup>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Fechar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalEmployeeSelect
