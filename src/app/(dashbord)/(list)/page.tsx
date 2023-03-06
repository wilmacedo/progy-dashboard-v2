import Button from '@/components/Button';
import Options from '@/components/Options';
import { api } from '@/services/api/server';
import { DashboardInfo, Planning } from '@/types/request';
import { ct } from '@/utils/style';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';

import { IoRocketOutline } from 'react-icons/io5';
import { TbAlertCircle } from 'react-icons/tb';

async function getPlannings() {
  let { data: plannings } = await api<Planning[]>({
    route: '/plannings',
    method: 'GET',
  });
  plannings = plannings || [];

  const metrics = await Promise.all(
    plannings.map(async planning => {
      const { data: metrics } = await api<DashboardInfo>({
        route: `/plannings/${planning.id}/dashboard`,
        method: 'GET',
      });
      if (!metrics) return {} as DashboardInfo;

      return metrics;
    }),
  );

  return { plannings, metrics };
}

export default async function List() {
  const { plannings, metrics } = await getPlannings();

  const getPercent = ({ initiatives, doneInitiatives }: Planning) => {
    const total = typeof initiatives === 'number' ? initiatives : 1;
    const dones = typeof doneInitiatives === 'number' ? doneInitiatives : 0;

    const percent = (dones / total) * 100;
    if (percent > 100) return 100;

    return Number(percent.toFixed(0));
  };

  const getPercentColor = (planning: Planning) => {
    const percent = getPercent(planning);

    if (percent === 100) {
      return 'green';
    } else if (percent < 100 && percent > 40) {
      return 'orange';
    } else return 'red';
  };

  return (
    <div
      className={ct(
        'mt-4 grid grid-flow-row gap-6',
        'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6',
      )}
    >
      {plannings.map((planning, index) => (
        <div className="border border-gray-100 rounded-md gap-8" key={index}>
          <div className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="block max-w-[10rem] font-semibold text-sm truncate">
                  {planning.name}
                </span>
                <span className="mt-0.5 max-w-[8rem] block text-xs truncate text-gray-500">
                  {planning.institution.name}
                </span>
              </div>

              <Options />
            </div>

            <div className="mt-4 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <IoRocketOutline className="text-sm text-gray-500" />
                  <span className="text-xs text-gray-500">Progresso</span>
                </div>

                <span className="text-xs font-semibold">
                  {metrics[index].totalInitiativesDone}/
                  {metrics[index].totalInitiatives}
                </span>
              </div>

              <div className="relative h-2 bg-gray-100 rounded-md">
                <div
                  style={{ width: `${getPercent(planning)}%` }}
                  data-percent={getPercentColor(planning)}
                  className={ct(
                    `absolute h-2 left-0 bg-green-500 rounded-md`,
                    'data-[percent=red]:bg-red-500 data-[percent=orange]:bg-orange-300 data-[percent=green]:bg-green-500',
                  )}
                />
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100">
            <div className="py-2 px-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="px-2 py-0.5 bg-gray-100 rounded-md">
                  <span className="text-xs text-gray-500">
                    {format(new Date(planning.created_at), 'dd MMM yyyy', {
                      locale: ptBR,
                    })}
                  </span>
                </div>

                <div
                  data-count={metrics[index].totalDelayed > 0}
                  className={ct(
                    'group',
                    'p-1.5 flex items-center justify-center gap-1 bg-gray-100 rounded-full',
                    'data-[count=true]:bg-red-100',
                  )}
                >
                  <TbAlertCircle
                    className={ct(
                      'text-gray-500',
                      'group-data-[count=true]:text-red-500',
                    )}
                  />
                  <span
                    className={ct(
                      'text-xs text-gray-500',
                      'group-data-[count=true]:text-red-500',
                    )}
                  >
                    {metrics[index]?.totalDelayed}
                  </span>
                </div>
              </div>

              <Link href={`/dashboard/?id=${planning.id}`}>
                <Button className="py-0 text-xs">Acessar</Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
