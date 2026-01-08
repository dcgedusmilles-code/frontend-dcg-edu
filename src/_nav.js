import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilChartPie,
  cilCursor,
  cilNotes,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilBook,
  cilSchool,
  cilClipboard,
  cilTask,
  cilSpreadsheet,
  cilLibrary,
  cilFolderOpen,
  cilCheckCircle,
  cilDollar,
  cilMoney,
  cilBank,
  cilChartLine,
  cilFile,
  cilGift,
  cilUser,
  cilFactory,
  cilPeople,
  cilUserFollow,
  cilListRich,
  cilBriefcase,
  cilChart,
  cilWarning,
  cilCalendar,
  cilEducation,
  cilBuilding,
  cilGroup,
  cilHandshake,
  cilHeart,
  cilCommentSquare,
  cilTags,
  cilShieldAlt,
  cilStorage,
  cilTruck,
  cilList,
  cilBookmark,
  cilSettings,
  cilCloud,
  cilCode,
  cilBug,
  cilDevices,
  cilBullhorn,
  cilNewspaper,
  cilLink,
  cilGlobeAlt,
  cilBarChart,
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

  /*
   *
   *
   *
   *
   *
   *
   *
   */

  {
    component: CNavGroup,
    name: 'Gestão Acadêmica',
    to: '/dashboard/gestao-academica',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
    roles: ['admin', 'secretaria', 'coordenador'],
    items: [
      // =======================
      // 📘 PEDAGÓGICO
      // =======================
      {
        component: CNavGroup,
        name: 'Pedagógico',
        icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
        roles: ['admin', 'pedagogico'],
        items: [
          {
            component: CNavItem,
            name: 'Calendário Acadêmico',
            to: '/dashboard/pedagogico/academic-calendar',
            // roles: ['admin'], // só admins
          },
          {
            component: CNavItem,
            name: 'Professores',
            to: '/dashboard/pedagogico/teachers',
            roles: ['admin'],
          },
          {
            component: CNavItem,
            name: 'Planos de Aula',
            to: '/dashboard/pedagogico/lesson-plan',
          },
        ],
      },

      // =======================
      // 🧾 SECRETARIA ACADÊMICA
      // =======================
      {
        component: CNavGroup,
        name: 'Secretaria Acadêmica',
        icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
        roles: ['admin', 'secretaria'],
        items: [
          {
            component: CNavItem,
            name: 'Alunos',
            to: '/dashboard/secretaria-academica/students',
          },
          {
            component: CNavItem,
            name: 'Matrículas',
            to: '/dashboard/secretaria-academica/enrollment',
            roles: ['admin'],
          },
          {
            component: CNavItem,
            name: 'Registos Acadêmicos',
            to: '/dashboard/secretaria-academica/academic-records',
            roles: ['admin'],
          },
          {
            component: CNavItem,
            name: 'Transferências',
            to: '/dashboard/secretaria-academica/transfers',
            roles: ['admin'],
          },
          {
            component: CNavItem,
            name: 'Documentos',
            to: '/dashboard/secretaria-academica/academic-documents',
          },
          {
            component: CNavItem,
            name: 'Protocolos',
            to: '/dashboard/secretaria-academica/protocol',
          },
        ],
      },

      // =======================
      // 🧭 COORDENAÇÃO E FORMAÇÃO
      // =======================
      {
        component: CNavGroup,
        name: 'Coordenação e Formação',
        icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
        roles: ['admin', 'coordenador'],
        items: [
          {
            component: CNavItem,
            name: 'Cursos',
            to: '/dashboard/training-coordinators/courses',
          },
          {
            component: CNavItem,
            name: 'Coordenadores',
            to: '/dashboard/training-coordinators/training-coordinators',
          },
          {
            component: CNavItem,
            name: 'Instrutores',
            to: '/dashboard/training-coordinators/instructors',
          },
          {
            component: CNavItem,
            name: 'Plano de Formação',
            to: '/dashboard/training-coordinators/training-plan',
          },
          {
            component: CNavItem,
            name: 'Registo de Participantes',
            to: '/dashboard/training-coordinators/perticipants',
          },
          {
            component: CNavItem,
            name: 'Registo de Turmas',
            to: '/dashboard/training-coordinators/registration',
          },
        ],
      },
    ],
  },

  /** Avaliação e Certificação */

  {
    component: CNavGroup,
    name: 'Avaliação e Certificação',
    to: '/dashboard/avaliacao-certificacao',
    icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" />,
    roles: ['admin', 'pedagogico', 'avaliador', 'coordenador'],
    items: [
      {
        component: CNavItem,
        name: 'Avaliações',
        to: '/dashboard/avaliacao-certicacao/assessments',
        icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
      },
      // {
      //   component: CNavItem,
      //   name: 'Avaliações',
      //   to: '/dashboard/avaliacao-certicacao/assessments/nova',
      //   icon: <CIcon icon={cilTask} customClassName="nav-icon" />,
      // },
      {
        component: CNavItem,
        name: 'Critérios de Avaliação',
        to: '/dashboard/avaliacao-certicacao/evaluation-criterias',
        icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Resultados',
        to: '/dashboard/avaliacao-certicacao/assessment-results',
        icon: <CIcon icon={cilSpreadsheet} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Feedbacks',
        to: '/dashboard/avaliacao-certicacao/feedbacks',
        icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Certificados',
        to: '/dashboard/avaliacao-certicacao/certificates',
        icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Históricos de Certificação',
        to: '/dashboard/avaliacao-certicacao/certificate-histories',
        icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Bancas Examinadoras',
        to: '/dashboard/avaliacao-certicacao/examining-boards',
        icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Recursos de Avaliação',
        to: '/dashboard/avaliacao-certicacao/assessment-resources',
        icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Gestão Financeira',
    to: '/dashboard/financeiro',
    icon: <CIcon icon={cilDollar} customClassName="nav-icon" />,
    roles: ['admin', 'financeiro', 'contabil', 'gestor'],
    items: [
      {
        component: CNavItem,
        name: 'Contas a Pagar',
        to: '/dashboard/financeiro/accounts-payable',
        icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Contas a Receber',
        to: '/dashboard/financeiro/accounts-receivable',
        icon: <CIcon icon={cilBank} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Movimentos de Caixa',
        to: '/dashboard/financeiro/cash-movements',
        icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Relatórios Financeiros',
        to: '/dashboard/financeiro/financial-reports',
        icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Mensalidades',
        to: '/dashboard/financeiro/monthly-fees',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Bolsas e Descontos',
        to: '/dashboard/financeiro/scholarships-and-discounts',
        icon: <CIcon icon={cilGift} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Salários',
        to: '/dashboard/financeiro/employee-salaries',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Fornecedores',
        to: '/dashboard/financeiro/suppliers',
        icon: <CIcon icon={cilFactory} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Relatório Padrão',
        to: '/dashboard/financeiro/default-report',
        icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Gestão Comercial',
    to: '/dashboard/comercial',
    icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
    roles: ['admin', 'comercial', 'gestor'],
    items: [
      {
        component: CNavItem,
        name: 'Clientes',
        to: '/dashboard/comercial/clients',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Leads',
        to: '/dashboard/comercial/leads',
        icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Oportunidades',
        to: '/dashboard/comercial/opportunities',
        icon: <CIcon icon={cilHandshake} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Contratos',
        to: '/dashboard/comercial/contracts',
        icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Propostas',
        to: '/dashboard/comercial/commercial-proposals',
        icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Produtos e Serviços',
        to: '/dashboard/comercial/products-services',
        icon: <CIcon icon={cilTags} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Relatórios Comerciais',
        to: '/dashboard/comercial/commercial-reports',
        icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Metas Comerciais',
        to: '/dashboard/comercial/commercial-goals',
        icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Comissões',
        to: '/dashboard/comercial/commissions',
        icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Gestão de Pessoas (RH)',
    to: '/dashboard/human-resources',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    roles: ['admin', 'rh', 'gestor'],
    items: [
      {
        component: CNavItem,
        name: 'Colaboradores',
        to: '/dashboard/human-resources/employees',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Candidatos',
        to: '/dashboard/human-resources/candidates',
        icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Processos Seletivos',
        to: '/dashboard/human-resources/selection-process',
        icon: <CIcon icon={cilListRich} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Contratos de Trabalho',
        to: '/dashboard/human-resources/employment-contracts',
        icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Cargos e Posições',
        to: '/dashboard/human-resources/positions',
        icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Avaliação de Desempenho',
        to: '/dashboard/human-resources/performance-evaluations',
        icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Folha de Pagamento',
        to: '/dashboard/human-resources/payroll',
        icon: <CIcon icon={cilMoney} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Benefícios',
        to: '/dashboard/human-resources/benefits',
        icon: <CIcon icon={cilGift} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Treinamentos',
        to: '/dashboard/human-resources/trainings',
        icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Advertências',
        to: '/dashboard/human-resources/disciplinary-warnings',
        icon: <CIcon icon={cilWarning} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Férias',
        to: '/dashboard/human-resources/vacation',
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Gestão de Estágio e Empregabilidade',
    to: '/dashboard/internship-and-professional-integration-office',
    icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
    roles: ['admin', 'coordenador', 'estagio'],
    items: [
      {
        component: CNavItem,
        name: 'Estágios',
        to: '/internship-and-professional-integration-office/internships',
        icon: <CIcon icon={cilEducation} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Candidaturas',
        to: '/internship-and-professional-integration-office/applications-internships',
        icon: <CIcon icon={cilUserFollow} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Relatórios',
        to: '/internship-and-professional-integration-office/internship-reports',
        icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Empresas Parceiras',
        to: '/internship-and-professional-integration-office/partner-companies',
        icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Supervisores',
        to: '/internship-and-professional-integration-office/company-supervisors',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Egressos',
        to: '/internship-and-professional-integration-office/former-students',
        icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Programas de Empregabilidade',
        to: '/internship-and-professional-integration-office/employability-programs',
        icon: <CIcon icon={cilChart} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Relações Empresariais',
        to: '/internship-and-professional-integration-office/business-relationships',
        icon: <CIcon icon={cilHandshake} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Vagas de Estágio',
        to: '/internship-and-professional-integration-office/vacancies-internship',
        icon: <CIcon icon={cilBriefcase} customClassName="nav-icon" />,
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Gestão de Apoio ao Estudante',
    to: '/dashboard/student-support-office',
    icon: <CIcon icon={cilHeart} customClassName="nav-icon" />,
    roles: ['admin', 'apoio_estudante', 'coordenador'],
    items: [
      {
        component: CNavItem,
        name: 'Acompanhamento Acadêmico',
        to: '/student-support-office/academic-monitoring',
        icon: <CIcon icon={cilEducation} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Serviços ao Estudante',
        to: '/student-support-office/student-services',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Programas de Carreira',
        to: '/student-support-office/career-programs',
        icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Instituições Parceiras',
        to: '/student-support-office/partner-institutions',
        icon: <CIcon icon={cilHandshake} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Reclamações e Sugestões',
        to: '/student-support-office/complaints-suggestions',
        icon: <CIcon icon={cilCommentSquare} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Benefícios',
        to: '/student-support-office/student-benefits',
        icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Bolsas',
        to: '/student-support-office/student-scholarships',
        icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Eventos e Apoio',
        to: '/student-support-office/events-support',
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Orientadores',
        to: '/student-support-office/advisors',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Infraestrutura e Logística',
    to: '/dashboard/infrastructure-and-logistics',
    icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
    roles: ['admin', 'infraestrutura', 'logistica'],
    items: [
      {
        component: CNavItem,
        name: 'Patrimônio',
        to: '/infrastructure-and-logistics/heritage-routes',
        icon: <CIcon icon={cilFactory} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Manutenção',
        to: '/infrastructure-and-logistics/maintenance-routes',
        icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Transporte',
        to: '/infrastructure-and-logistics/transportation-routes',
        icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Logística de Estoque',
        to: '/infrastructure-and-logistics/stock-logistics-routes',
        icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Movimentação de Estoque',
        to: '/infrastructure-and-logistics/stock-movements-routes',
        icon: <CIcon icon={cilStorage} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Fornecedores',
        to: '/infrastructure-and-logistics/suppliers-routes',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Segurança Patrimonial',
        to: '/infrastructure-and-logistics/asset-security-routes',
        icon: <CIcon icon={cilShieldAlt} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Obras e Infraestrutura',
        to: '/infrastructure-and-logistics/infrastructure-works-routes',
        icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Agendamentos e Transporte',
        to: '/infrastructure-and-logistics/appointments-transportation-routes',
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Biblioteca e Recursos de Informação',
    to: '/dashboard/library-resource-center',
    icon: <CIcon icon={cilLibrary} customClassName="nav-icon" />,
    roles: ['admin', 'biblioteca', 'gestor'],
    items: [
      {
        component: CNavItem,
        name: 'Catálogo Digital',
        to: '/library-resource-center/digital-catalog',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Acervo',
        to: '/library-resource-center/collection',
        icon: <CIcon icon={cilFolderOpen} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Empréstimos',
        to: '/library-resource-center/loans',
        icon: <CIcon icon={cilBook} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Reservas',
        to: '/library-resource-center/reservations',
        icon: <CIcon icon={cilBookmark} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Multas',
        to: '/library-resource-center/fines',
        icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Usuários',
        to: '/library-resource-center/users-library',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Sugestões de Aquisição',
        to: '/library-resource-center/acquisition-suggestions',
        icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Eventos',
        to: '/library-resource-center/library-events',
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Sessões de Estudo',
        to: '/library-resource-center/study-session',
        icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Tecnologia da Informação',
    to: '/dashboard/it-department',
    icon: <CIcon icon={cilSettings} customClassName="nav-icon" />,
    roles: ['admin', 'ti', 'gestor'],
    items: [
      {
        component: CNavItem,
        name: 'Usuários de Sistema',
        to: '/it-department/it-users',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Contas e Sistemas',
        to: '/it-department/accounts-systems',
        icon: <CIcon icon={cilCloud} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Projetos de TI',
        to: '/it-department/it-projects',
        icon: <CIcon icon={cilCode} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Suporte',
        to: '/it-department/it-support',
        icon: <CIcon icon={cilBug} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Técnicos',
        to: '/it-department/it-technicians',
        icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Ativos de TI',
        to: '/it-department/it-asset',
        icon: <CIcon icon={cilDevices} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Licenças de Software',
        to: '/it-department/software-licenses',
        icon: <CIcon icon={cilFile} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Segurança da Informação',
        to: '/it-department/it-security',
        icon: <CIcon icon={cilShieldAlt} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Rede e Infraestrutura',
        to: '/it-department/infrastructure-network',
        icon: <CIcon icon={cilShieldAlt} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Logs de Acesso',
        to: '/it-department/logs-access',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Comunicação e Marketing',
    to: '/dashboard/communication-and-marketing',
    icon: <CIcon icon={cilBullhorn} customClassName="nav-icon" />,
    roles: ['admin', 'marketing', 'gestor'],
    items: [
      {
        component: CNavItem,
        name: 'Campanhas',
        to: '/communication-and-marketing/campaign',
        icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Canais de Divulgação',
        to: '/communication-and-marketing/campaign-disclosure',
        icon: <CIcon icon={cilLink} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Conteúdos',
        to: '/communication-and-marketing/contents',
        icon: <CIcon icon={cilGlobeAlt} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Eventos',
        to: '/communication-and-marketing/events',
        icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Parcerias',
        to: '/communication-and-marketing/partnerships',
        icon: <CIcon icon={cilHandshake} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Pesquisas de Mercado',
        to: '/communication-and-marketing/market-research',
        icon: <CIcon icon={cilChartLine} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Relações Públicas',
        to: '/communication-and-marketing/public-relations',
        icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Métricas de Marketing',
        to: '/communication-and-marketing/marketing-metrics',
        icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Canais e Mídias',
        to: '/communication-and-marketing/campaign-channel',
        icon: <CIcon icon={cilLink} customClassName="nav-icon" />,
      },
    ],
  },

  {
    component: CNavGroup,
    name: 'Blog e Conteúdos',
    to: '/dashboard/blog',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
    roles: ['admin', 'editor', 'comunicacao'], // ajustar conforme perfis
    items: [
      {
        component: CNavItem,
        name: 'Postagens',
        to: '/blog/blog-posts',
        icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
      },
      {
        component: CNavItem,
        name: 'Categorias',
        to: '/blog/categories',
        icon: <CIcon icon={cilList} customClassName="nav-icon" />,
      },
    ],
  },

  {
    component: CNavTitle,
    name: 'Configurações do Sistema',
  },

  // =======================
  // 🧭 CCONFIGURAÇÕES DO MENU
  // =======================

  {
    component: CNavGroup,
    name: 'Configurações',
    icon: <CIcon icon={cilSchool} customClassName="nav-icon" />,
    roles: ['admin', 'coordenador'],
    items: [
      {
        component: CNavItem,
        name: 'Departamentos',
        to: '/dashboard/config/internal-departments',
                roles: ['admin', 'rh'],
      },
      {
        component: CNavItem,
        name: 'Coordenadores',
        to: '/dashboard/config/coordenadores',
                roles: ['admin'],

      },
      {
        component: CNavItem,
        name: 'Cursos',
        to: '/dashboard/config/cursos',
                roles: ['admin'],

      },
      {
        component: CNavItem,
        name: 'Turma',
        to: '/dashboard/config/turma',
                roles: ['admin'],

      },
      {
        component: CNavItem,
        name: 'Unidade',
        to: '/dashboard/config/unidades',
                roles: ['admin'],

      },
      {
        component: CNavItem,
        name: 'Endereço',
        to: '/dashboard/config/enderecos',
                roles: ['admin'],

      },
      {
        component: CNavItem,
        name: 'Disciplinas',
        to: '/dashboard/pedagogico/disciplines',
        roles: ['admin'],
      },
      {
        component: CNavItem,
        name: 'Informação Bancária',
        to: '/dashboard/gestao-financeira/informacao-bancaria',
        roles: ['admin', 'financas'],
      },

      {
        component: CNavItem,
        name: 'Gestão de Preços',
        to: '/dashboard/gestao-financeira/precos-produts',
        roles: ['admin'],
      },

      {
        component: CNavItem,
        name: 'Material Didático',
        to: '/dashboard/pedagogico/material-didatico',
        roles: ['admin'],
      },

      {
        component: CNavItem,
        name: 'Gestão de Horários',
        to: '/dashboard/pedagogico/horario',
        roles: ['admin'],
      },
    ],
  },

  /**
   *
   *
   *
   *
   *
   *
   *
   */

  // {
  //   component: CNavTitle,
  //   name: 'Principal',
  // },

  // {
  //   component: CNavGroup,
  //   name: 'Secretaria Acadêmica',
  //   to: '/dashboard/base',
  //   icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  //   roles: ['admin'], // só admins
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Gestão de Alunos',
  //       to: '/dashboard/base/accordion',
  //       roles: ['admin'], // só admins
  //     },
  //     {
  //       name: 'Matrícula e Rematrícula',
  //       component: CNavItem,
  //       to: '/dashboard/base/carousels',
  //       roles: ['admin'], // só admins
  //     },
  //     {
  //       name: 'Gestão de Turma',
  //       component: CNavItem,
  //       to: '/dashboard/base/list-groups',
  //       roles: ['admin'], // só admins
  //     },
  //     {
  //       name: 'Gestão de Cursos',
  //       component: CNavItem,
  //       to: '/dashboard/base/cursos-groups',
  //       roles: ['admin'], // só admins
  //     },

  //     {
  //       component: CNavItem,
  //       name: 'Atribuição de Disciplinas a Professores',
  //       to: '/dashboard/buttons/dropdowns',
  //       roles: ['admin'], // só admins
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Histórico Escolar e Boletins',
  //       to: '/dashboard/base/cards',
  //       roles: ['admin'], // só admins
  //     },
  //     {
  //       component: CNavItem,
  //       to: '/dashboard/base/collapses',
  //       name: 'Emissão de Documentos',
  //       roles: ['admin'], // só admins
  //     },
  //     {
  //       component: CNavItem,
  //       to: '/dashboard/base/navs',
  //       name: 'Gestão de Notas',
  //       roles: ['admin'], // só admins
  //     },
  //     {
  //       name: 'Gestão de Frequência',
  //       component: CNavItem,
  //       to: '/dashboard/base/paginations',
  //       roles: ['admin'], // só admins
  //     },
  //   ],
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Gestão Escolar/Administração',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   roles: ['admin'], // ✅ só administradores veem o grupo
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Gestão de Unidade Escolares',
  //       to: '/dashboard/notifications/alerts',
  //       roles: ['admin'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Parâmetos e Regras Acadêmicas',
  //       to: '/dashboard/notifications/badges',
  //       roles: ['admin'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Cadastro de Feriados e Datas letivas',
  //       to: '/dashboard/notifications/modals',
  //       roles: ['admin'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Relatórios Gerenciais e Estatísticos',
  //       to: '/dashboard/notifications/relatorio-gerais',
  //       roles: ['admin'],
  //     },
  //   ],
  // },

  // {
  //   component: CNavGroup,
  //   name: 'Gestão de Perfis',
  //   to: '/dashboard/buttons',
  //   icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  //   roles: ['admin'], // ✅ grupo só aparece para admins
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Gestão de Equipe Administrativa',
  //       to: '/dashboard/buttons/button-groups',
  //       roles: ['admin'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Transferência interna e externa de alunos',
  //       to: '/dashboard/base/progress',
  //       roles: ['admin'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Controle de Carga horária',
  //       to: '/dashboard/buttons/time-controler',
  //       roles: ['admin'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Desempenho do Docente',
  //       to: '/dashboard/buttons/look-teatcher',
  //       roles: ['admin'],
  //     },
  //   ],
  // },

  // {
  //   component: CNavGroup,
  //   name: 'Portal',
  //   icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  //   roles: ['admin', 'Aluno', 'Professor'], // ✅ grupo aparece para todos
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Visualização de Notas e Faltas',
  //       to: '/dashboard/forms/checks-radios',
  //       roles: ['admin', 'Aluno', 'Professor'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Acesso a Boletins e Documentos',
  //       to: '/dashboard/forms/floating-labels',
  //       roles: ['admin', 'Aluno'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Download de Materiais e Tarefas',
  //       to: '/dashboard/forms/form-control',
  //       roles: ['admin', 'Aluno'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Matrícula e Rematrícula',
  //       to: '/dashboard/forms/input-group',
  //       roles: ['admin', 'Aluno'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Cronograma do Aluno',
  //       to: '/dashboard/forms/range',
  //       roles: ['admin', 'Aluno'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Portal do Professor',
  //       to: '/dashboard/buttons/teatcher-portal',
  //       roles: ['admin', 'Professor'],
  //     },
  //   ],
  // },

  // {
  //   component: CNavGroup,
  //   name: 'Portal dos Pais/Responsáveis',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   roles: ['admin', 'Aluno'],
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Desempenho do Aluno',
  //       to: '/dashboard/icons/coreui-icons',
  //       roles: ['admin', 'Aluno'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Notificações e cominicados da escola',
  //       to: '/dashboard/icons/notification',
  //       roles: ['admin', 'Aluno'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Soliocitação de Documentos e Matrícula',
  //       to: '/dashboard/icons/flags',
  //       roles: ['admin', 'Aluno'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Contato com Professors e Direção',
  //       to: '/dashboard/icons/brands',
  //       roles: ['admin', 'Aluno'],
  //     },
  //   ],
  // },

  // {
  //   component: CNavGroup,
  //   name: 'Gestão Financeira',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   roles: ['admin', 'financeiro'], // ✅ Apenas perfis autorizados
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Controle de Mensalidades e Cobranças',
  //       to: '/dashboard/gestao-financeira/controle-mensalidades',
  //       roles: ['admin', 'financeiro'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Regras de Pagamento e Faturação',
  //       to: '/dashboard/gestao-financeira/parametros-regras-academicas',
  //       roles: ['admin', 'financeiro'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Emissão de Faturas e Recibos',
  //       to: '/dashboard/gestao-financeira/emissao-faturas-recibos',
  //       roles: ['admin', 'financeiro'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Controle de inadimplência',
  //       to: '/dashboard/gestao-financeira/controle-inadimplencia',
  //       roles: ['admin', 'financeiro'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Relatório Financeiro',
  //       to: '/dashboard/gestao-financeira/relatorio-financeiro',
  //       roles: ['admin', 'financeiro'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Descontos e Bolsas',
  //       to: '/dashboard/gestao-financeira/descontos-bolsas',
  //       roles: ['admin', 'financeiro'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Pagamentos e Faturação',
  //       to: '/dashboard/gestao-financeira/pagamento-faturacao',
  //       roles: ['admin', 'financeiro'],
  //     },
  //   ],
  // },

  // {
  //   component: CNavGroup,
  //   name: 'Gestão de Avaliação',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   roles: ['admin', 'coordenador', 'Professor'], // ✅ Perfis com acesso
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Registro de Provas e Trabalhos',
  //       to: '/dashboard/gestao-avaliacao/registro-provas',
  //       roles: ['admin', 'coordenador', 'Professor'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Peso das Avaliações',
  //       to: '/dashboard/gestao-avaliacao/peso-avaliacoes',
  //       roles: ['admin', 'coordenador'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Recuperação e Avaliação Final',
  //       to: '/dashboard/gestao-avaliacao/recuperacao-final',
  //       roles: ['admin', 'coordenador', 'Professor'],
  //     },
  //   ],
  // },

  // {
  //   component: CNavGroup,
  //   name: 'Vendas e Comercial',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   roles: ['admin', 'gestor_comercial', 'equipe_comercial'], // ✅ Perfis com acesso
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Gestão de Leads e Oportunidades',
  //       to: '/dashboard/comercial/gestao-leads',
  //       roles: ['admin', 'gestor_comercial', 'equipe_comercial'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Funil de Vendas',
  //       to: '/dashboard/comercial/funil-vendas',
  //       roles: ['admin', 'gestor_comercial'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Propostas Comerciais e Ofertas',
  //       to: '/dashboard/comercial/propostas-ofertas',
  //       roles: ['admin', 'gestor_comercial'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Relatórios Comerciais',
  //       to: '/dashboard/comercial/relatorios-comercial',
  //       roles: ['admin', 'gestor_comercial'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Equipe Comercial',
  //       to: '/dashboard/comercial/equipe-comercial',
  //       roles: ['admin', 'gestor_comercial'],
  //     },
  //   ],
  // },

  // {
  //   component: CNavGroup,
  //   name: 'Recursos Humanos',
  //   icon: <CIcon icon={cilBell} customClassName="nav-icon" />,
  //   roles: ['admin', 'gestor_rh', 'equipe_rh', 'gestor_unidade'], // quem pode acessar o grupo
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Cargos e Funções',
  //       to: '/dashboard/rh/cargos',
  //       roles: ['admin', 'gestor_rh'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Departamentos',
  //       to: '/dashboard/rh/departamentos',
  //       roles: ['admin', 'gestor_rh'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Funcionários',
  //       to: '/dashboard/rh/funcionarios',
  //       roles: ['admin', 'gestor_rh', 'equipe_rh'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Folha de Pagamento',
  //       to: '/dashboard/rh/folha-pagamento',
  //       roles: ['admin', 'gestor_rh'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Recibo de Pagamento',
  //       to: '/dashboard/rh/recibos-pagamento',
  //       roles: ['admin', 'gestor_rh', 'equipe_rh'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Presenças e Faltas',
  //       to: '/dashboard/rh/presencas',
  //       roles: ['admin', 'gestor_rh', 'equipe_rh'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Relatório de Presenças',
  //       to: '/dashboard/rh/relatorio-presencas',
  //       roles: ['admin', 'gestor_rh', 'gestor_unidade'],
  //     },
  //   ],
  // },
  // {
  //   component: CNavTitle,
  //   name: 'Extras',
  // },
  // {
  //   component: CNavGroup,
  //   name: 'Configurações e Integrações',
  //   icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
  //   roles: ['admin', 'gestor_ti', 'user'], // quem vê o grupo
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'Configurações Gerais',
  //       to: '/dashboard/config/config-geral',
  //       roles: ['admin', 'gestor_ti'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Integrações',
  //       to: '/dashboard/config/integracoes',
  //       roles: ['admin', 'gestor_ti'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Parâmetro Acadêmico',
  //       to: '/dashboard/config/parametros-academico',
  //       roles: ['admin', 'gestor_ti'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Parâmetro Financeiro',
  //       to: '/dashboard/config/parametros-finaceiros',
  //       roles: ['admin', 'gestor_ti'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Personalização',
  //       to: '/dashboard/config/personalizacao',
  //       roles: ['admin', 'gestor_ti'],
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Perfil do Usuário',
  //       to: '/dashboard/config/user-profile',
  //       roles: ['admin', 'gestor_ti', 'user'],
  //     },
  //   ],
  // },
]

export default _nav
