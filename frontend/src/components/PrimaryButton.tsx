import { Pressable, StyleSheet, Text } from 'react-native';

import { tokens } from '@/theme/tokens';

type PrimaryButtonProps = {
  label: string;
  onPress: () => void;
  colorScheme?: 'light' | 'dark';
};

export function PrimaryButton({
  label,
  onPress,
  colorScheme = 'light',
}: PrimaryButtonProps) {
  const colors = tokens.colors[colorScheme];

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        { backgroundColor: pressed ? colors.buttonPressed : colors.button },
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, { color: colors.buttonText }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.radius.pill,
  },
  pressed: {
    transform: [{ scale: 0.98 }],
  },
  text: {
    fontSize: tokens.fontSize.body,
    fontWeight: '700',
  },
});
