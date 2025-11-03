import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilCursor,
  cilDescription,
  cilDrop,
  cilExternalLink,
  cilNotes,
  cilPencil,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    roles: ['admin', 'rh', 'comercial'], // ✅ só quem tiver esse role vê

  },
  {
    component: CNavItem,
    name: 'Analises',
    to: '/dashboard/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
    roles: ['admin', 'rh', 'comercial'],

  },
  {
    component: CNavTitle,
    name: 'Principal',
  },
  {
    component: CNavGroup,
    name: 'Secretaria Acadêmica',
    to: '/dashboard/base',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    roles: ['admin'], // só admins
    items: [
      {
        component: CNavItem,
        name: 'Gestão de Alunos',
        to: '/dashboard/base/accordion',
        roles: ['admin'], // só admins
      },
      {
        name: 'Matrícula e Rematrícula',
        component: CNavItem,
        to: '/dashboard/base/carousels',
        roles: ['admin'], // só admins
      },
      {
        name: 'Gestão de Turma',
        component: CNavItem,
        to: '/dashboard/base/list-groups',
        roles: ['admin'], // só admins
      },
      {
        name: 'Gestão de Cursos',
        component: CNavItem,
        to: '/dashboard/base/cursos-groups',
        roles: ['admin'], // só admins

      },
      {
        component: CNavItem,
        to: '/dashboard/base/popovers',
        name: 'Gestão de Aulas',
        roles: ['admin'], // só admins
      },
      
      {
        component: CNavItem,
        name: 'Gestão de Professores',
        to: '/dashboard/buttons/buttons',
        roles: ['admin'], // só admins
      },
      {
        component: CNavItem,
        name: 'Atribuição de Disciplinas a Professores',
        to: '/dashboard/buttons/dropdowns',
        roles: ['admin'], // só admins

      },
      {
        component: CNavItem,
        name: 'Histórico Escolar e Boletins',
        to: '/dashboard/base/cards',
        roles: ['admin'], // só admins

      },
      {
        component: CNavItem,
        to: '/dashboard/base/collapses',
        name: 'Emissão de Documentos',
        roles: ['admin'], // só admins

      },
      {
        component: CNavItem,
        to: '/dashboard/base/navs',
        name: 'Gestão de Notas',
        roles: ['admin'], // só admins

      },
      {
        name: 'Gestão de Frequência',
        component: CNavItem,
        to: '/dashboard/base/paginations',
        roles: ['admin'], // só admins

      },
      {
        component: CNavItem,
        to: '/dashboard/base/placeholders',
        name: 'Gestão de Calendário Acadêmico',
        roles: ['admin'], // só admins

      },

    ],
  },
  {
    component: CNavGroup,
    name: 'Gestão Escolar/Administração',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    roles: ['admin'], // ✅ só administradores veem o grupo
    items: [
      {
        component: CNavItem,
        name: 'Gestão de Unidade Escolares',
        to: '/dashboard/notifications/alerts',
        roles: ['admin'],
      },
      {
        component: CNavItem,
        name: 'Parâmetos e Regras Acadêmicas',
        to: '/dashboard/notifications/badges',
        roles: ['admin'],
      },
      {
        component: CNavItem,
        name: 'Cadastro de Feriados e Datas letivas',
        to: '/dashboard/notifications/modals',
        roles: ['admin'],
      },
      {
        component: CNavItem,
        name: 'Controle de Disciplinas',
        to: '/dashboard/notifications/toasts',
        roles: ['admin'],
      },
      {
        component: CNavItem,
        name: 'Relatórios Gerenciais e Estatísticos',
        to: '/dashboard/notifications/relatorio-gerais',
        roles: ['admin'],
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Gestão de Perfis',
    to: '/dashboard/buttons',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
    roles: ['admin'], // ✅ grupo só aparece para admins
    items: [
      {
        component: CNavItem,
        name: 'Gestão de Equipe Administrativa',
        to: '/dashboard/buttons/button-groups',
        roles: ['admin'],
      },
      {
        component: CNavItem,
        name: 'Transferência interna e externa de alunos',
        to: '/dashboard/base/progress',
        roles: ['admin'],
      },
      {
        component: CNavItem,
        name: 'Controle de Carga horária',
        to: '/dashboard/buttons/time-controler',
        roles: ['admin'],
      },
      {
        component: CNavItem,
        name: 'Desempenho do Docente',
        to: '/dashboard/buttons/look-teatcher',
        roles: ['admin'],
      },
    ],
  },


  {
    component: CNavGroup,
    name: 'Portal',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
    roles: ['admin', 'Aluno', 'Professor'], // ✅ grupo aparece para todos
    items: [
      {
        component: CNavItem,
        name: 'Visualização de Notas e Faltas',
        to: '/dashboard/forms/checks-radios',
        roles: ['admin', 'Aluno', 'Professor'],
      },
      {
        component: CNavItem,
        name: 'Acesso a Boletins e Documentos',
        to: '/dashboard/forms/floating-labels',
        roles: ['admin', 'Aluno'],
      },
      {
        component: CNavItem,
        name: 'Download de Materiais e Tarefas',
        to: '/dashboard/forms/form-control',
        roles: ['admin', 'Aluno'],
      },
      {
        component: CNavItem,
        name: 'Matrícula e Rematrícula',
        to: '/dashboard/forms/input-group',
        roles: ['admin', 'Aluno'],
      },
      {
        component: CNavItem,
        name: 'Cronograma do Aluno',
        to: '/dashboard/forms/range',
        roles: ['admin', 'Aluno'],
      },
      {
        component: CNavItem,
        name: 'Portal do Professor',
        to: '/dashboard/buttons/teatcher-portal',
        roles: ['admin', 'Professor'],
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Portal dos Pais/Responsáveis',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    roles: ['admin', 'Aluno'],
    items: [
      {
        component: CNavItem,
        name: 'Desempenho do Aluno',
        to: '/dashboard/icons/coreui-icons',
        roles: ['admin', 'Aluno'],
      },
      {
        component: CNavItem,
        name: 'Notificações e cominicados da escola',
        to: '/dashboard/icons/notification',
        roles: ['admin', 'Aluno'],
      },
      {
        component: CNavItem,
        name: 'Soliocitação de Documentos e Matrícula',
        to: '/dashboard/icons/flags',
        roles: ['admin', 'Aluno'],

      },
      {
        component: CNavItem,
        name: 'Contato com Professors e Direção',
        to: '/dashboard/icons/brands',
        roles: ['admin', 'Aluno'],

      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Gestão Financeira',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    roles: ['admin', 'financeiro'], // ✅ Apenas perfis autorizados
    items: [
      {
        component: CNavItem,
        name: 'Controle de Mensalidades e Cobranças',
        to: '/dashboard/gestao-financeira/controle-mensalidades',
        roles: ['admin', 'financeiro'],
      },
      {
        component: CNavItem,
        name: 'Regras de Pagamento e Faturação',
        to: '/dashboard/gestao-financeira/parametros-regras-academicas',
        roles: ['admin', 'financeiro'],
      },
      {
        component: CNavItem,
        name: 'Emissão de Faturas e Recibos',
        to: '/dashboard/gestao-financeira/emissao-faturas-recibos',
        roles: ['admin', 'financeiro'],
      },
      {
        component: CNavItem,
        name: 'Controle de inadimplência',
        to: '/dashboard/gestao-financeira/controle-inadimplencia',
        roles: ['admin', 'financeiro'],
      },
      {
        component: CNavItem,
        name: 'Relatório Financeiro',
        to: '/dashboard/gestao-financeira/relatorio-financeiro',
        roles: ['admin', 'financeiro'],
      },
      {
        component: CNavItem,
        name: 'Descontos e Bolsas',
        to: '/dashboard/gestao-financeira/descontos-bolsas',
        roles: ['admin', 'financeiro'],
      },
      {
        component: CNavItem,
        name: 'Pagamentos e Faturação',
        to: '/dashboard/gestao-financeira/pagamento-faturacao',
        roles: ['admin', 'financeiro'],
      },
    ],
  },


  {
    component: CNavGroup,
    name: 'Gestão de Avaliação',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    roles: ['admin', 'coordenador', 'Professor'], // ✅ Perfis com acesso
    items: [
      {
        component: CNavItem,
        name: 'Registro de Provas e Trabalhos',
        to: '/dashboard/gestao-avaliacao/registro-provas',
        roles: ['admin', 'coordenador', 'Professor'],
      },
      {
        component: CNavItem,
        name: 'Peso das Avaliações',
        to: '/dashboard/gestao-avaliacao/peso-avaliacoes',
        roles: ['admin', 'coordenador'],
      },
      {
        component: CNavItem,
        name: 'Recuperação e Avaliação Final',
        to: '/dashboard/gestao-avaliacao/recuperacao-final',
        roles: ['admin', 'coordenador', 'Professor'],
      },
    ],
  },


  {
    component: CNavGroup,
    name: 'Vendas e Comercial',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    roles: ['admin', 'gestor_comercial', 'equipe_comercial'], // ✅ Perfis com acesso
    items: [
      {
        component: CNavItem,
        name: 'Gestão de Leads e Oportunidades',
        to: '/dashboard/comercial/gestao-leads',
        roles: ['admin', 'gestor_comercial', 'equipe_comercial'],
      },
      {
        component: CNavItem,
        name: 'Funil de Vendas',
        to: '/dashboard/comercial/funil-vendas',
        roles: ['admin', 'gestor_comercial'],
      },
      {
        component: CNavItem,
        name: 'Propostas Comerciais e Ofertas',
        to: '/dashboard/comercial/propostas-ofertas',
        roles: ['admin', 'gestor_comercial'],
      },
      {
        component: CNavItem,
        name: 'Relatórios Comerciais',
        to: '/dashboard/comercial/relatorios-comercial',
        roles: ['admin', 'gestor_comercial'],
      },
      {
        component: CNavItem,
        name: 'Equipe Comercial',
        to: '/dashboard/comercial/equipe-comercial',
        roles: ['admin', 'gestor_comercial'],
      },
    ],
  },


  {
    component: CNavGroup,
    name: 'Recursos Humanos',
    icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
    roles: ['admin', 'gestor_rh', 'equipe_rh', 'gestor_unidade'], // quem pode acessar o grupo
    items: [
      {
        component: CNavItem,
        name: 'Cargos e Funções',
        to: '/dashboard/rh/cargos',
        roles: ['admin', 'gestor_rh'],
      },
      {
        component: CNavItem,
        name: 'Departamentos',
        to: '/dashboard/rh/departamentos',
        roles: ['admin', 'gestor_rh'],
      },
      {
        component: CNavItem,
        name: 'Funcionários',
        to: '/dashboard/rh/funcionarios',
        roles: ['admin', 'gestor_rh', 'equipe_rh'],
      },
      {
        component: CNavItem,
        name: 'Folha de Pagamento',
        to: '/dashboard/rh/folha-pagamento',
        roles: ['admin', 'gestor_rh'],
      },
      {
        component: CNavItem,
        name: 'Recibo de Pagamento',
        to: '/dashboard/rh/recibos-pagamento',
        roles: ['admin', 'gestor_rh', 'equipe_rh'],
      },
      {
        component: CNavItem,
        name: 'Presenças e Faltas',
        to: '/dashboard/rh/presencas',
        roles: ['admin', 'gestor_rh', 'equipe_rh'],
      },
      {
        component: CNavItem,
        name: 'Relatório de Presenças',
        to: '/dashboard/rh/relatorio-presencas',
        roles: ['admin', 'gestor_rh', 'gestor_unidade'],
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Extras',
  },
  {
    component: CNavGroup,
    name: 'Configurações e Integrações',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    roles: ['admin', 'gestor_ti', 'user'], // quem vê o grupo
    items: [
      {
        component: CNavItem,
        name: 'Configurações Gerais',
        to: '/dashboard/config/config-geral',
        roles: ['admin', 'gestor_ti'],
      },
      {
        component: CNavItem,
        name: 'Integrações',
        to: '/dashboard/config/integracoes',
        roles: ['admin', 'gestor_ti'],
      },
      {
        component: CNavItem,
        name: 'Parâmetro Acadêmico',
        to: '/dashboard/config/parametros-academico',
        roles: ['admin', 'gestor_ti'],
      },
      {
        component: CNavItem,
        name: 'Parâmetro Financeiro',
        to: '/dashboard/config/parametros-finaceiros',
        roles: ['admin', 'gestor_ti'],
      },
      {
        component: CNavItem,
        name: 'Personalização',
        to: '/dashboard/config/personalizacao',
        roles: ['admin', 'gestor_ti'],
      },
      {
        component: CNavItem,
        name: 'Perfil do Usuário',
        to: '/dashboard/config/user-profile',
        roles: ['admin', 'gestor_ti', 'user'],
      },
    ],
  }

]

export default _nav
