import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { tokens } from '@/theme/tokens';

type ChildBottomBarProps = {
  active: 'trilha' | 'cofrinho' | 'pais';
};

export function ChildBottomBar({ active }: ChildBottomBarProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme();
  const colorScheme = scheme === 'dark' ? 'dark' : 'light';
  const isDark = colorScheme === 'dark';
  const colors = tokens.colors[colorScheme];
  const activeBackground = isDark ? 'rgba(255, 180, 0, 0.2)' : '#FFF3CD';

  return (
    <View
      style={[
        styles.barContainer,
        {
          bottom: Math.max(insets.bottom, 16),
          backgroundColor: isDark ? '#261F19' : '#FFFFFF',
          borderColor: isDark ? '#382F27' : '#E6DCCF',
          shadowOpacity: isDark ? 0.3 : 0.08,
        },
      ]}
    >
      <View style={styles.content}>
        <Pressable
          accessibilityLabel="Ir para o início da trilha"
          accessibilityRole="button"
          onPress={() => router.push('/trilha')}
          style={[
            styles.item,
            active === 'trilha' && { backgroundColor: activeBackground },
          ]}
        >
          <Ionicons
            name={active === 'trilha' ? 'home' : 'home-outline'}
            size={22}
            color={active === 'trilha' ? colors.primary : colors.muted}
          />
          <Text
            style={[
              styles.label,
              { color: active === 'trilha' ? colors.primary : colors.muted },
            ]}
          >
            Início
          </Text>
        </Pressable>

        <Pressable
          accessibilityLabel="Abrir cofrinho"
          accessibilityRole="button"
          onPress={() => router.push('/cofrinho')}
          style={[
            styles.item,
            active === 'cofrinho' && { backgroundColor: activeBackground },
          ]}
        >
          <MaterialCommunityIcons
            name={active === 'cofrinho' ? 'piggy-bank' : 'piggy-bank-outline'}
            size={22}
            color={active === 'cofrinho' ? colors.primary : colors.muted}
          />
          <Text
            style={[
              styles.label,
              { color: active === 'cofrinho' ? colors.primary : colors.muted },
            ]}
          >
            Cofrinho
          </Text>
        </Pressable>

        <Pressable
          accessibilityLabel="Ir para a área dos pais"
          accessibilityRole="button"
          onPress={() => router.push('/pais')}
          style={[
            styles.item,
            active === 'pais' && { backgroundColor: activeBackground },
          ]}
        >
          <Ionicons
            name="shield-checkmark-outline"
            size={22}
            color={active === 'pais' ? colors.primary : colors.muted}
          />
          <Text
            style={[
              styles.label,
              { color: active === 'pais' ? colors.primary : colors.muted },
            ]}
          >
            Pais
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  barContainer: {
    position: 'absolute',
    width: '92%',
    maxWidth: 440,
    alignSelf: 'center',
    borderRadius: 28,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 16,
    elevation: 6,
  },
  content: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    gap: 6,
  },
  item: {
    flex: 1,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 22,
    gap: 3,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
  },
});
