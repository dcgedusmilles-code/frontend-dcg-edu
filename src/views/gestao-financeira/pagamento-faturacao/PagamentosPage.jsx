import React, { useEffect, useState } from 'react'
import {
  CButton,
  CContainer,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
} from '@coreui/react'

import { financeiroService } from '../../../services/financeiroService'
import { getStudents } from '../../../services/studentsService'
import ModalAbrirCaixa from './ModalAbrirCaixa'
import ModalPagamentoAvancado from './ModalPagamento'
import dayjs from 'dayjs'

const PagamentosPage = () => {
  const [alunos, setAlunos] = useState([])
  const [mensalidades, setMensalidades] = useState([])
  const [materiais, setMateriais] = useState([])

  const [modalAbrirCaixa, setModalAbrirCaixa] = useState(false)
  const [modalPagamento, setModalPagamento] = useState(false)

  const [caixaAberto, setCaixaAberto] = useState(null)
  const [alunoSelecionado, setAlunoSelecionado] = useState(null)

  useEffect(() => {
    buscarAluno()
    verificarEstadoDoCaixa()
  }, [])

  const buscarAluno = async () => {
    const getAlundo = await getStudents()
    setAlunos(getAlundo)
  }
  const verificarEstadoDoCaixa = async () => {
    const caixa = await financeiroService.getCaixaAbertoHoje()
    setCaixaAberto(caixa)
  }

  const podeReceberPagamento = () => {
    if (!caixaAberto) return false

    const hoje = dayjs().format('YYYY-MM-DD')
    const dataMov = dayjs(caixaAberto.data_movimento).format('YYYY-MM-DD')

    // Só pode receber se caixa foi aberto hoje
    return dataMov === hoje
  }

  const handlePagar = async (aluno) => {
    // Se caixa não está permitido para hoje
    if (!podeReceberPagamento()) {
      setModalAbrirCaixa(true)
      return
    }

    setAlunoSelecionado(aluno)

    const mensalidades = await financeiroService.getMensalidadesAluno(aluno.id)
    const materiais = await financeiroService.getMateriaisAluno(aluno.id)

    setMensalidades(mensalidades)
    setMateriais(materiais)

    setModalPagamento(true)
  }

  const handleCaixaAberto = (caixa) => {
    setCaixaAberto(caixa)
  }

  const handlePagamentoSucesso = () => {
    alert('Pagamento registrado com sucesso!')
    setModalPagamento(false)

    // Recarrega situação do caixa (valor atualizado)
    verificarEstadoDoCaixa()
  }

  return (
    <CContainer>
      <h2 className="mb-4">Pagamentos de Receitas</h2>

      <CTable hover responsive bordered>
        <CTableHead color="dark">
          <CTableRow>
            <CTableHeaderCell>Aluno</CTableHeaderCell>
            <CTableHeaderCell>Email</CTableHeaderCell>
            <CTableHeaderCell>Telefone</CTableHeaderCell>
            <CTableHeaderCell>Ações</CTableHeaderCell>
          </CTableRow>
        </CTableHead>

        <CTableBody>
          {alunos.map((aluno) => (
            <CTableRow key={aluno?.id}>
              <CTableDataCell>{aluno?.nome}</CTableDataCell>
              <CTableDataCell>{aluno?.email}</CTableDataCell>
              <CTableDataCell>{aluno?.telefone}</CTableDataCell>
              <CTableDataCell>
                <CButton color="primary" onClick={() => handlePagar(aluno)}>
                  Pagar
                </CButton>
              </CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>

      {/* Modal de abertura de caixa */}
      <ModalAbrirCaixa
        visible={modalAbrirCaixa}
        onClose={() => setModalAbrirCaixa(false)}
        onSuccess={handleCaixaAberto}
      />

      {/* Modal avançado de pagamento */}
      <ModalPagamentoAvancado
        visible={modalPagamento}
        onClose={() => setModalPagamento(false)}
        aluno={alunoSelecionado}
        mensalidades={mensalidades}
        materiais={materiais}
        onPagamentoSucesso={handlePagamentoSucesso}
      />
    </CContainer>
  )
}

export default PagamentosPage
