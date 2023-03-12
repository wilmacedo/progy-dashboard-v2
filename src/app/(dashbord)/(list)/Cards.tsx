'use client';

import Button from '@/components/Button';
import Options from '@/components/Options';
import { mockedMetrics } from '@/constants';
import { APIResponse } from '@/services/api/types';
import { DashboardInfo, Planning } from '@/types/request';
import { ct } from '@/utils/style';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Link from 'next/link';
import { useEffect } from 'react';
import { IoRocketOutline } from 'react-icons/io5';
import { TbAlertCircle } from 'react-icons/tb';
import { toast, ToastContainer } from 'react-toastify';

interface CardProps {
  planningData: APIResponse<Planning[]>;
  metricsData?: APIResponse<DashboardInfo>[];
}

interface DataResponse {
  plannings: Planning[];
  metrics: DashboardInfo[];
}

function getData({ planningData, metricsData }: CardProps): DataResponse {
  const plannings = planningData.data || [];
  if (!metricsData) return { plannings, metrics: [] };

  const metrics = metricsData.map(metric => metric.data || mockedMetrics);

  return { plannings, metrics };
}

export function Cards({ planningData, metricsData }: CardProps) {
  const { plannings, metrics } = getData({ planningData, metricsData });

  useEffect(() => {
    if (planningData.error) {
      toast.error(
        `(${planningData.status}) Houve um erro ao carregar os planejamentos disponíveis`,
      );
      return;
    }

    if (!metricsData) {
      toast.error(
        'Houve um erro ao carregar as métricas de um ou mais planejamentos',
      );
      return;
    }

    const haveEmpty = metricsData.find(metric => metric.error);
    if (!haveEmpty) return;

    toast.error(
      `(${haveEmpty.status}) Houve um erro ao carregar as metricas de um ou mais planejamentos`,
    );
  }, [planningData, metricsData]);

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
    <div>
      <ToastContainer autoClose={3500} />
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
                    {metrics[index]?.totalInitiativesDone}/
                    {metrics[index]?.totalInitiatives}
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
                    data-count={metrics[index]?.totalDelayed > 0}
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
    </div>
  );
}
