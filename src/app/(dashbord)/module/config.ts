import { FileSpreadsheet, LucideIcon, Unplug } from 'lucide-react';

interface ModuleProps {
  name: string;
  description: string;
  Icon: LucideIcon;
  path: string;
}

export const modules: ModuleProps[] = [
  {
    name: 'Planejamento',
    description: 'Defina suas parametrizações',
    Icon: FileSpreadsheet,
    path: '/module/planning',
  },
  {
    name: 'Encaminhamento',
    description: 'Define os planejamentos',
    Icon: Unplug,
    path: '/module/forwarding',
  },
];
