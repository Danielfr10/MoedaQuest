import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppThemeProvider } from '@/contexts/AppThemeContext';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  return (
    <AppThemeProvider>
      <RootLayoutContent />
    </AppThemeProvider>
  );
}

function RootLayoutContent() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false }} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
