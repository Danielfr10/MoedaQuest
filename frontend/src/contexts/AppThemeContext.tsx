import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

export type AppColorScheme = 'light' | 'dark';

type AppThemeContextValue = {
  colorScheme: AppColorScheme;
  setColorScheme: (scheme: AppColorScheme) => void;
  toggleColorScheme: () => void;
};

const AppThemeContext = createContext<AppThemeContextValue>({
  colorScheme: 'light',
  setColorScheme: () => {},
  toggleColorScheme: () => {},
});

export function AppThemeProvider({ children }: PropsWithChildren) {
  const [colorScheme, setColorScheme] = useState<AppColorScheme>('light');

  const toggleColorScheme = useCallback(() => {
    setColorScheme((current) => (current === 'light' ? 'dark' : 'light'));
  }, []);

  const value = useMemo(
    () => ({
      colorScheme,
      setColorScheme,
      toggleColorScheme,
    }),
    [colorScheme, toggleColorScheme]
  );

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
}

export function useAppTheme() {
  return useContext(AppThemeContext);
}
