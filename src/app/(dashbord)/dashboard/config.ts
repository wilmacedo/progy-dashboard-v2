import { DashboardInfo } from '@/types/request';
import { IconType } from 'react-icons';
import { AiOutlineFileDone } from 'react-icons/ai';
import { BiErrorAlt } from 'react-icons/bi';
import { GiSupersonicArrow } from 'react-icons/gi';
import { IoIosPaper } from 'react-icons/io';

interface CardConfig {
  title: string;
  Icon: IconType;
  bgColor: string;
  textColor: string;
  key: keyof DashboardInfo;
  redirect?: string;
}

export const mockedMetrics: DashboardInfo = {
  title: 'Desconhecido',
  costIndicator: [0, 0],
  idp: [0, 0],
  stagesPerInitiative: [],
  statusPerActivity: [],
  totalDelayed: 0,
  totalGoals: 0,
  totalInitiatives: 0,
  totalInitiativesDone: 0,
};

export const cards: CardConfig[] = [
  {
    title: 'Objetivos totais',
    Icon: GiSupersonicArrow,
    bgColor: '#D6E8F1',
    textColor: '#34BBFF',
    key: 'totalGoals',
  },
  {
    title: 'Iniciativas totais',
    Icon: IoIosPaper,
    bgColor: '#c5f2f2',
    textColor: '#079698',
    key: 'totalInitiatives',
  },
  {
    title: 'Iniciativas Concluídas',
    Icon: AiOutlineFileDone,
    bgColor: '#d4ebdc',
    textColor: '#059669',
    key: 'totalInitiativesDone',
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
