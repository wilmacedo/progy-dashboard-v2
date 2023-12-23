'use client';

import {
  CircleDotDashed,
  Clock3,
  Cuboid,
  Goal,
  Layers2,
  LucideIcon,
  Waypoints,
} from 'lucide-react';
import { IconType } from 'react-icons';
import { TbZoomMoney } from 'react-icons/tb';

export interface ParametrizationSection {
  Icon?: LucideIcon | IconType;
  name: string;
  href: string;
  enable: boolean;
}

export const links: ParametrizationSection[] = [
  {
    Icon: Layers2,
    name: 'Perspectivas',
    href: '',
    enable: true,
  },
  {
    Icon: CircleDotDashed,
    name: 'Estágio',
    href: 'stages',
    enable: true,
  },
  {
    Icon: Cuboid,
    name: 'Unidades',
    href: 'units',
    enable: true,
  },
  {
    Icon: TbZoomMoney,
    name: 'Fontes',
    href: 'fonts',
    enable: true,
  },
  {
    Icon: Goal,
    name: 'Objetivos',
    href: 'goals',
    enable: true,
  },
  {
    Icon: Clock3,
    name: 'Status',
    href: 'states',
    enable: true,
  },
  {
    Icon: Waypoints,
    name: 'Tipo de MAPP',
    href: 'mapps',
    enable: true,
  },
];
