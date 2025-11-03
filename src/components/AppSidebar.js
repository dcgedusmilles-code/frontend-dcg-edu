// import React from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import {
//   CCloseButton,
//   CSidebar,
//   CSidebarBrand,
//   CSidebarFooter,
//   CSidebarHeader,
//   CSidebarToggler,
// } from '@coreui/react'
// import CIcon from '@coreui/icons-react'

// import { AppSidebarNav } from './AppSidebarNav'
// import { logo2 } from '../assets'
// import { sygnet } from 'src/assets/brand/sygnet'

// import navigation from '../_nav'
// import { UserAuth } from '../context/AuthContext'

// const AppSidebar = () => {
//   const dispatch = useDispatch()
//   const unfoldable = useSelector((state) => state.sidebarUnfoldable)
//   const sidebarShow = useSelector((state) => state.sidebarShow)

//   const { usuario } = UserAuth() // 🔑 pega dados do usuário (com perfil)

//   // 🔹 Função recursiva que filtra menu baseado em roles
//   const filterNav = (items) => {
//     if (!usuario) return []
//     return items
//       .filter((item) => {
//         if (!item.roles) return true // se não tiver roles, libera geral
//         return item.roles.includes(usuario?.perfis?.nome)
//       })
//       .map((item) =>
//         item.items ? { ...item, items: filterNav(item.items) } : item
//       )
//   }

//   const filteredNavigation = filterNav(navigation)

//   return (
//     <CSidebar
//       className="border-end"
//       colorScheme="purple"
//       position="fixed"
//       unfoldable={unfoldable}
//       visible={sidebarShow}
//       onVisibleChange={(visible) => {
//         dispatch({ type: 'set', sidebarShow: visible })
//       }}
//     >
//       <CSidebarHeader className="border-bottom">
//         <CSidebarBrand to="/">
//           <img src={logo2} alt="logotipo" />
//           <CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />
//         </CSidebarBrand>
//         <CCloseButton
//           className="d-lg-none"
//           dark
//           onClick={() => dispatch({ type: 'set', sidebarShow: false })}
//         />
//       </CSidebarHeader>

//       {/* 👉 Passa apenas os menus filtrados */}
//       <AppSidebarNav items={filteredNavigation} />

//       <CSidebarFooter className="border-top d-none d-lg-flex">
//         <CSidebarToggler
//           onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
//         />
//       </CSidebarFooter>
//     </CSidebar>
//   )
// }

// export default React.memo(AppSidebar)

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import { AppSidebarNav } from "./AppSidebarNav";
import { logo2 } from "../assets";
import { sygnet } from "../assets/brand/sygnet";

import navigation from "../_nav";
import { UserAuth } from "../context/AuthContext";

const AppSidebar = () => {
  const dispatch = useDispatch();
  const unfoldable = useSelector((state) => state.sidebarUnfoldable);
  const sidebarShow = useSelector((state) => state.sidebarShow);

  // 🔑 Obtém dados do contexto de autenticação
  const { user, role, loading } = UserAuth();

  /**
   * 🔹 Filtra o menu de navegação com base nas roles permitidas
   * Se o item não tiver restrição (item.roles), é exibido para todos.
   */
  const filterNav = (items) => {
    if (loading) return []; // enquanto carrega o user, não renderiza nada
    if (!user) return []; // se não estiver autenticado, não mostra menu

    return items
      .filter((item) => {
        if (!item.roles) return true; // se não tiver roles, mostra sempre
        return item.roles.includes(role); // compara role do contexto
      })
      .map((item) =>
        item.items ? { ...item, items: filterNav(item.items) } : item
      );
  };

  const filteredNavigation = filterNav(navigation);

  return (
    <CSidebar
      className="border-end"
      colorScheme="light"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
    >
      {/* Cabeçalho da Sidebar */}
      <CSidebarHeader className="border-bottom d-flex align-items-center justify-content-between px-3">
        <CSidebarBrand to="/" className="d-flex align-items-center">
          <img
            src={logo2}
            alt="Logotipo"
            height={40}
            className="me-2 sidebar-logo"
          />
          <CIcon
            customClassName="sidebar-brand-narrow"
            icon={sygnet}
            height={32}
          />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: "set", sidebarShow: false })}
        />
      </CSidebarHeader>

      {/* 👉 Navegação filtrada por role */}
      <AppSidebarNav items={filteredNavigation} />

      {/* Rodapé da Sidebar */}
      <CSidebarFooter className="border-top d-none d-lg-flex justify-content-center">
        <CSidebarToggler
          onClick={() =>
            dispatch({ type: "set", sidebarUnfoldable: !unfoldable })
          }
        />
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
