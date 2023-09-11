import { DatePickerWithRange } from '@/components/date-picker';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BarChart3, PieChart } from 'lucide-react';
import { twMerge } from 'tailwind-merge';
import { cards, charts, pieCharts } from './config';

export function DashboardSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex space-y-2 flex-col lg:space-y-0 lg:flex-row items-center justify-between">
        <div className="mt-0.5 h-[2rem] max-w-full w-[32rem] bg-border rounded-md animate-pulse" />

        <div className="w-full flex flex-col sm:w-auto sm:flex-row items-center gap-2">
          <DatePickerWithRange className="w-full sm:w-auto" />
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
                    <div className="mt-0.5 h-[1.75rem] w-[4rem] bg-border rounded-md animate-pulse" />

                    {card.redirect && (
                      <Button
                        disabled
                        className="h-4 text-xs px-0"
                        variant="link"
                      >
                        Visualizar
                      </Button>
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

                      <div className="py-24">
                        <div className="h-[1.75rem] w-[calc(100%-1rem)] bg-border rounded-md animate-pulse" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex bg-card flex-col space-x-4 p-4 border border-border rounded-md shadow-sm">
                <div className="w-full grid grid-cols-1 gap-2">
                  {pieCharts.map((chart, index) => (
                    <div key={index} className="space-y-2">
                      <div className="inline-flex items-center space-x-2">
                        <PieChart size={26} className="text-foreground" />
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

                      <div className="py-24">
                        <div className="h-[1.75rem] w-[calc(100%-1rem)] bg-border rounded-md animate-pulse" />
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
