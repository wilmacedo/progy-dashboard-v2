import { THEME_DATA_KEY } from '@/config/theme';
import { cookies } from 'next/headers';
import { Theme } from './theme-context';

export function getTheme(): Theme {
  const theme = cookies().get(THEME_DATA_KEY);
  if (!theme || !['light', 'dark'].includes(theme.value)) return 'light';

  return theme.value as Theme;
}
