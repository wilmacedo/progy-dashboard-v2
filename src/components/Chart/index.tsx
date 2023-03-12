interface ChartValue {
  id: number;
  value: number;
}

interface ChartProps {
  labels: string[];
  values: number[] | ChartValue[];
}

export interface BarChartProps extends ChartProps {
  route: string;
}

export enum PieChartType {
  CURRENCY,
  VALUE,
}

export interface PieChartProps extends ChartProps {
  type: PieChartType;
}
