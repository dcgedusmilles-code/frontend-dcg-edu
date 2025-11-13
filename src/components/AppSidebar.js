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
  const { user, role, loading } = UserAuth();

  const filterNav = (items) => {
    if (loading) return []; 
    if (!user) return []; 

    return items
      .filter((item) => {
        if (!item.roles) return true; 
        return item.roles.includes(role);
      })
      .map((item) =>
        item.items ? { ...item, items: filterNav(item.items) } : item
      );
  };

  const filteredNavigation = filterNav(navigation);

  return (
    <CSidebar
      className="sidebar sidebar-unfoldable border-end"
      colorScheme="light"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: "set", sidebarShow: visible });
      }}
    >
      
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
