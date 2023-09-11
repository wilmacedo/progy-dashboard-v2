import { PieChartType } from '@/components/Chart';
import { TabConfig } from '@/components/content-navbar';
import { Role } from '@/constants/roles';
import { DashboardInfo } from '@/types/request';
import { IconType } from 'react-icons';
import { AiOutlineFileDone } from 'react-icons/ai';
import { BiErrorAlt } from 'react-icons/bi';
import { IoIosPaper } from 'react-icons/io';
import { IoWarningOutline } from 'react-icons/io5';

export const tabs: TabConfig[] = [
  { name: 'Visão Geral', path: '/', excludeRoles: [] },
  {
    name: 'Parametrizações',
    path: '/parametrization',
    excludeRoles: [Role.USER],
  },
  {
    name: 'Iniciativas',
    path: '/initiatives',
    excludeRoles: [Role.USER],
  },
  {
    name: 'Atividades',
    path: '/activities',
    excludeRoles: [Role.USER],
  },
];

interface CardConfig {
  title: string;
  Icon: IconType;
  bgColor: string;
  textColor: string;
  key: keyof DashboardInfo;
  redirect?: string;
}

interface ChartConfig {
  title: string;
  description: string;
  key: keyof DashboardInfo;
  route: string;
}

interface PieChartConfig {
  title: string;
  description: string[];
  labels: string[];
  key: keyof DashboardInfo;
  type: PieChartType;
}

export const cards: CardConfig[] = [
  {
    title: 'Iniciativas totais',
    Icon: IoIosPaper,
    bgColor: '#D6E8F1',
    textColor: '#34BBFF',
    key: 'totalInitiatives',
  },
  {
    title: 'Iniciativas concluídas',
    Icon: AiOutlineFileDone,
    bgColor: '#d4ebdc',
    textColor: '#059669',
    key: 'totalInitiativesDone',
  },
  {
    title: 'Iniciativas para atrasar',
    Icon: IoWarningOutline,
    bgColor: '#f9efc7',
    textColor: '#dc8420',
    key: 'totalDelayed',
    redirect: '/',
  },
  {
    title: 'Iniciativas em atraso',
    Icon: BiErrorAlt,
    bgColor: '#f8d7da',
    textColor: '#dc3545',
    key: 'totalDelayed',
    redirect: '/',
  },
];

export const charts: ChartConfig[] = [
  {
    title: 'Indicador de Iniciativas',
    description: 'Veja o total de estágios por iniciativa',
    key: 'stagesPerInitiative',
    route: '/initiatives',
  },
  {
    title: 'Indicador de Atividades',
    description: 'Veja o total de status por atividade',
    key: 'statusPerActivity',
    route: '/activities',
  },
];

export const pieCharts: PieChartConfig[] = [
  {
    title: 'Indicador de Custo',
    description: ['Custo total por executado'],
    labels: ['Custo Executado', 'Custo Projetado'],
    key: 'costIndicator',
    type: PieChartType.CURRENCY,
  },
  // {
  //   title: 'Índice IDP',
  //   description: [
  //     'Índice de desempenho de planejamento',
  //     'Considera ano vigente da data de término',
  //   ],
  //   labels: ['Atividades concluídas', 'Ativdades pendentes'],
  //   key: 'idp',
  //   type: PieChartType.VALUE,
  // },
];
