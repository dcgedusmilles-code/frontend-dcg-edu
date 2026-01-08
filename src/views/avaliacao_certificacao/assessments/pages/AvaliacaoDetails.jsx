import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CListGroup, CListGroupItem } from '@coreui/react'
import { AvaliacaoService } from '../services/avaliacaoService'

export default function AvaliacaoDetails() {
  const { id } = useParams()
  const [avaliacao, setAvaliacao] = useState(null)

  useEffect(() => {
    AvaliacaoService.obter(id).then(({ data }) => setAvaliacao(data))
  }, [id])

  if (!avaliacao) return null

  return (
    <CCard>
      <CCardBody>
        <h4>{avaliacao.titulo}</h4>
        <CListGroup>
          <CListGroupItem>Curso: {avaliacao.curso?.nome}</CListGroupItem>
          <CListGroupItem>Turma: {avaliacao.turma?.nome}</CListGroupItem>
          <CListGroupItem>Instrutor: {avaliacao.instrutor?.nome}</CListGroupItem>
          <CListGroupItem>
            Criado em: {new Date(avaliacao.createdAt).toLocaleString()}
          </CListGroupItem>
        </CListGroup>
      </CCardBody>
    </CCard>
  )
}
