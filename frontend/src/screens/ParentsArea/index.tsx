import { Ionicons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChildBottomBar } from '@/components/ChildBottomBar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { tokens } from '@/theme/tokens';
import { styles } from './styles';

export default function ParentsAreaScreen() {
  const scheme = useColorScheme();
  const colorScheme = scheme === 'dark' ? 'dark' : 'light';
  const colors = tokens.colors[colorScheme];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <Ionicons name="shield-checkmark-outline" size={72} color={colors.primary} />
          <Text style={[styles.title, { color: colors.text }]}>
            Área dos Pais — Em trabalho
          </Text>
        </View>
      </ScrollView>
      <ChildBottomBar active="pais" />
    </SafeAreaView>
  );
}
