import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChildBottomBar } from '@/components/ChildBottomBar';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { tokens } from '@/theme/tokens';
import { styles } from './styles';

export default function PiggyBankScreen() {
  const scheme = useColorScheme();
  const colorScheme = scheme === 'dark' ? 'dark' : 'light';
  const colors = tokens.colors[colorScheme];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.content}>
          <MaterialCommunityIcons
            name="piggy-bank-outline"
            size={76}
            color={colors.primary}
          />
          <Text style={[styles.title, { color: colors.text }]}>Cofrinho</Text>
          <Text
            style={[
              styles.status,
              {
                color: colorScheme === 'dark' ? '#f5d477' : '#7A5200',
                backgroundColor: colorScheme === 'dark' ? '#4a3a18' : '#FFF3CD',
              },
            ]}
          >
            Em trabalho
          </Text>
          <Text style={[styles.description, { color: colors.muted }]}>
            Esta área está em construção. Em breve você poderá acompanhar suas
            moedas e objetivos por aqui.
          </Text>
        </View>
      </ScrollView>
      <ChildBottomBar active="cofrinho" />
    </SafeAreaView>
  );
}
