import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'
import { logo2 } from '../assets'
import { sygnet } from 'src/assets/brand/sygnet'

import navigation from '../_nav'
import { UserAuth } from '../context/AuthContext'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const { usuario } = UserAuth() // 🔑 pega dados do usuário (com perfil)

  // 🔹 Função recursiva que filtra menu baseado em roles
  const filterNav = (items) => {
    if (!usuario) return []
    return items
      .filter((item) => {
        if (!item.roles) return true // se não tiver roles, libera geral
        return item.roles.includes(usuario?.perfis?.nome)
      })
      .map((item) =>
        item.items ? { ...item, items: filterNav(item.items) } : item
      )
  }

  const filteredNavigation = filterNav(navigation)

  return (
    <CSidebar
      className="border-end"
      colorScheme="purple"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <img src={logo2} alt="logotipo" />
          <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>

      {/* 👉 Passa apenas os menus filtrados */}
      <AppSidebarNav items={filteredNavigation} />

      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
