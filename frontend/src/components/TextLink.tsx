import { Pressable, StyleSheet, Text } from 'react-native';

import { tokens } from '@/theme/tokens';

type TextLinkProps = {
  prefix: string;
  label: string;
  onPress: () => void;
  colorScheme?: 'light' | 'dark';
};

export function TextLink({
  prefix,
  label,
  onPress,
  colorScheme = 'light',
}: TextLinkProps) {
  const colors = tokens.colors[colorScheme];

  return (
    <Pressable accessibilityRole="link" onPress={onPress} style={styles.container}>
      <Text style={[styles.text, { color: colors.muted }]}>
        {prefix}{' '}
        <Text style={[styles.link, { color: colors.primary }]}>{label}</Text>
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  text: {
    fontSize: tokens.fontSize.body,
  },
  link: {
    fontWeight: '700',
  },
});
