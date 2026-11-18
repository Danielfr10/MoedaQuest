import { useAppTheme } from '@/contexts/AppThemeContext';

export function useColorScheme() {
  const { colorScheme } = useAppTheme();
  return colorScheme ?? 'light';
}
