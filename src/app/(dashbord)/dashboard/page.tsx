import BarChart from '@/components/Chart/Bar';
import PieChart from '@/components/Chart/Pie';
import { DatePickerWithRange } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockedMetrics } from '@/constants';
import roles from '@/constants/roles';
import { getServerAuth } from '@/contexts/auth/get-server-auth';
import { api } from '@/services/api/server';
import { ChartRelation, DashboardInfo } from '@/types/request';
import { addDays } from 'date-fns';
import { BarChart3, ChevronLeft, PieChart as PieChartIcon } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
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
    notFound();
  }

  if (!data) data = mockedMetrics;

  return data;
}

export default async function Dashboard(props: DashboardProps) {
  const auth = getServerAuth();
  if (!auth) {
    notFound();
  }

  const metrics = await getMetrics(props);

  return (
    <div className="space-y-4">
      <div className="flex space-y-2 flex-col lg:space-y-0 lg:flex-row items-center justify-between">
        <div className="inline-flex items-center gap-2">
          {roles.high.includes(auth.role_id) && (
            <Link href="/">
              <ChevronLeft className="text-foreground duration-200 hover:opacity-70" />
            </Link>
          )}
          <h2 className="text-xl font-semibold max-w-full md:text-2xl lg:max-w-lg lg:truncate">
            {metrics.title}
          </h2>
        </div>

        <div className="w-full flex flex-col sm:w-auto sm:flex-row items-center gap-2">
          <DatePickerWithRange
            className="w-full sm:w-auto"
            range={{
              from: new Date(2022, 0, 20),
              to: addDays(new Date(2022, 0, 20), 20),
            }}
          />
          <Button disabled className="w-full sm:w-auto">
            Relatório
          </Button>
        </div>
      </div>
      <div>
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Geral</TabsTrigger>
            <TabsTrigger disabled value="indicators">
              Indicadores
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-flow-row gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="p-4 bg-card border border-border rounded-md shadow-sm space-y-2"
                >
                  <div className="inline-flex items-center gap-2 text-sm font-semibold">
                    <div
                      style={{ backgroundColor: card.bgColor }}
                      className={twMerge(
                        'w-fit p-2 items-center justify-center gap-1 rounded-full',
                      )}
                    >
                      <card.Icon className="text-lg" color={card.textColor} />
                    </div>
                    <p>{card.title}</p>
                  </div>
                  <div className="flex items-end justify-between">
                    <p className="text-2xl font-semibold">
                      {String(metrics[card.key])}
                    </p>

                    {card.redirect && (
                      <Link href={card.redirect}>
                        <Button className="h-4 text-xs px-0" variant="link">
                          Visualizar
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full grid gap-4 lg:grid-cols-[2fr_1fr]">
              <div className="flex bg-card flex-col md:flex-row items-center justify-between space-x-4 p-4 border border-border rounded-md shadow-sm">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2">
                  {charts.map((chart, index) => (
                    <div key={index} className="w-full space-y-2">
                      <div className="inline-flex items-center space-x-2">
                        <BarChart3 size={26} className="text-foreground" />
                        <div className="">
                          <h3 className="font-medium text-foreground">
                            {chart.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {chart.description}
                          </p>
                        </div>
                      </div>

                      <BarChart
                        labels={(metrics[chart.key] as ChartRelation[]).map(
                          item => item.title,
                        )}
                        values={(metrics[chart.key] as ChartRelation[]).map(
                          item => ({
                            id: item.id,
                            value: item.value,
                          }),
                        )}
                        route={chart.route}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex bg-card flex-col space-x-4 p-4 border border-border rounded-md shadow-sm">
                <div className="w-full grid grid-cols-1 gap-2">
                  {pieCharts.map((chart, index) => (
                    <div key={index} className="space-y-2">
                      <div className="inline-flex items-center space-x-2">
                        <PieChartIcon size={26} className="text-foreground" />
                        <div className="">
                          <h3 className="font-medium text-foreground">
                            {chart.title}
                          </h3>
                          {chart.description.map((description, index) => (
                            <p
                              key={index}
                              className="text-sm text-muted-foreground odd:text-xs"
                            >
                              {description}
                            </p>
                          ))}
                        </div>
                      </div>

                      <div className="w-full flex items-center justify-center">
                        <PieChart
                          className="max-h-56"
                          labels={chart.labels}
                          values={metrics[chart.key] as number[]}
                          type={chart.type}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
