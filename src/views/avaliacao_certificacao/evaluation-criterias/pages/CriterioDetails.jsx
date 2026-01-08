import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CCard, CCardBody, CListGroup, CListGroupItem } from '@coreui/react'
import { CriterioService } from '../services/criterioService'

export default function CriterioDetails() {
  const { id } = useParams()
  const [criterio, setCriterio] = useState(null)

  useEffect(() => {
    CriterioService.obter(id).then(({ data }) => setCriterio(data))
  }, [id])

  if (!criterio) return null

  return (
    <CCard>
      <CCardBody>
        <h4>Detalhes do Critério</h4>
        <CListGroup>
          <CListGroupItem>Descrição: {criterio.descricao}</CListGroupItem>
          <CListGroupItem>Peso: {criterio.peso}</CListGroupItem>
          <CListGroupItem>
            Avaliação: {criterio.avaliacao?.titulo}
          </CListGroupItem>
          <CListGroupItem>
            Criado em: {new Date(criterio.createdAt).toLocaleString()}
          </CListGroupItem>
        </CListGroup>
      </CCardBody>
    </CCard>
  )
}
