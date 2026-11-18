import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';

import { BrandHeader } from '@/components/BrandHeader';
import { tokens } from '@/theme/tokens';

export default function TrilhaRoute() {
  const scheme = useColorScheme();
  const colorScheme = scheme === 'dark' ? 'dark' : 'light';
  const colors = tokens.colors[colorScheme];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.container}>
        <BrandHeader
          title="Sua trilha"
          description="A aventura financeira está pronta para começar."
          colorScheme={colorScheme}
        />
        <Text style={[styles.placeholder, { color: colors.muted }]}>
          Conteúdo da trilha em construção.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  placeholder: {
    textAlign: 'center',
    fontSize: 15,
  },
});
