import { Pressable, Text, StyleSheet } from 'react-native';

import { tokens } from '@/theme/tokens';

type BackButtonProps = {
  onPress: () => void;
  colorScheme?: 'light' | 'dark';
};

export function BackButton({ onPress, colorScheme = 'light' }: BackButtonProps) {
  const colors = tokens.colors[colorScheme];

  return (
    <Pressable
      accessibilityLabel="Voltar"
      accessibilityRole="button"
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.arrow, { color: colors.primary }]}>‹</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.7,
  },
  arrow: {
    fontSize: 38,
    lineHeight: 42,
  },
});
