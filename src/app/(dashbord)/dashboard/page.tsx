import Button from '@/components/Button';
import BarChart from '@/components/Chart/Bar';
import PieChart from '@/components/Chart/Pie';
import { toast } from '@/components/ui/use-toast';
import { mockedMetrics } from '@/constants';
import roles from '@/constants/roles';
import { api } from '@/services/api/server';
import { ChartRelation, DashboardInfo } from '@/types/request';
import { getAuthCookieData } from '@/utils/auth';
import { ct } from '@/utils/style';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AiOutlineBarChart } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { cards, charts, pieCharts } from './config';

interface DashboardProps {
  searchParams?: {
    [key: string]: string | string[] | undefined;
  };
}

async function getMetrics({
  searchParams,
}: DashboardProps): Promise<DashboardInfo> {
  if (!searchParams || typeof searchParams !== 'object' || !searchParams.id) {
    notFound();
  }

  const id = Number(searchParams.id);
  if (isNaN(id)) {
    notFound();
  }

  let { data, error, code } = await api<DashboardInfo>({
    route: `/plannings/${id}/dashboard`,
    method: 'GET',
  });
  if (error) {
    toast({
      variant: 'destructive',
      title: `(${code}) Houve um erro ao carregar as métricas do dashboard`,
    });
    return mockedMetrics;
  }

  if (!data) data = mockedMetrics;

  return data;
}

export default async function Dashboard(props: DashboardProps) {
  const metrics = await getMetrics(props);
  const cookies = getAuthCookieData();
  const roleId = cookies?.role_id || 0;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {roles.high.includes(roleId) && (
            <Link href="/">
              <IoIosArrowBack
                className={ct(
                  'text-2xl duration-200 cursor-pointer',
                  'hover:opacity-70',
                )}
              />
            </Link>
          )}
          <h1 className="font-semibold text-3xl">{metrics.title}</h1>
        </div>

        <Button disabled>Relatórios Gerenciais</Button>
      </div>

      <div className={ct('flex', 'sm:flex-col md:flex-col lg:flex-row')}>
        <div className="flex-col w-full">
          <div
            className={ct(
              'mt-4 grid grid-flow-row gap-6',
              'sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-4',
            )}
          >
            {cards.map((card, index) => (
              <div
                className="p-4 border border-gray-100 rounded-md shadow-sm"
                key={index}
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold">
                    <div
                      style={{ backgroundColor: card.bgColor }}
                      className={ct(
                        'w-fit p-2 items-center justify-center gap-1 rounded-full',
                      )}
                    >
                      <card.Icon
                        style={{ color: card.textColor }}
                        className="text-lg"
                      />
                    </div>
                    <span>{card.title}</span>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <span className="text-2xl font-semibold">
                    {String(metrics[card.key])}
                  </span>

                  {card.redirect && (
                    <Link href={card.redirect}>
                      <span
                        className={ct(
                          'text-xs font-bold text-blue-300 duration-100 cursor-pointer text-end',
                          'hover:brightness-125',
                        )}
                      >
                        Visualizar
                      </span>
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div
            className={ct(
              'mt-5 p-4 flex justify-between border border-gray-100 rounded-md shadow-sm',
              'sm:flex-col',
              'lg:flex-row',
            )}
          >
            {charts.map((chart, index) => (
              <div className="flex-col" key={index}>
                <div className="mb-4 flex items-center gap-2">
                  <AiOutlineBarChart className="text-3xl" />
                  <div>
                    <h1 className="text-xl">{chart.title}</h1>
                    <span className="text-gray-500 text-sm">
                      {chart.description}
                    </span>
                  </div>
                </div>

                <BarChart
                  labels={(metrics[chart.key] as ChartRelation[]).map(
                    item => item.title,
                  )}
                  values={(metrics[chart.key] as ChartRelation[]).map(item => ({
                    id: item.id,
                    value: item.value,
                  }))}
                  route={chart.route}
                />
              </div>
            ))}
          </div>
        </div>

        <div
          className={ct(
            'ml-4 p-4 flex w-[20rem]',
            'sm:ml-0 sm:my-4 sm:flex-row sm:items-center sm:justify-around sm:w-full sm:border sm:border-gray-100 sm:shadow-sm sm:rounded-md',
            'lg:ml-4 lg:my-0 lg:flex-col lg:items-baseline lg:w-[20rem] lg:border-l lg:border-r-0 lg:border-t-0 lg:border-b-0 lg:border-gray-100 lg:shadow-none lg:rounded-none',
          )}
        >
          {pieCharts.map((chartDetail, index) => (
            <div className="last:mt-4" key={index}>
              <h1 className="text-md">{chartDetail.title}</h1>
              <div className="flex flex-col">
                {chartDetail.description.map((description, index) => (
                  <span className="text-gray-500 text-xs" key={index}>
                    {description}
                  </span>
                ))}
              </div>

              <div className="mt-4 ml-4">
                <PieChart
                  labels={chartDetail.labels}
                  values={metrics[chartDetail.key] as number[]}
                  type={chartDetail.type}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
