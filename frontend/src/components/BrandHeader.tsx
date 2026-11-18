import { StyleSheet, Text, View } from 'react-native';

import { tokens } from '@/theme/tokens';

type BrandHeaderProps = {
  title: string;
  description: string;
  colorScheme?: 'light' | 'dark';
};

export function BrandHeader({
  title,
  description,
  colorScheme = 'light',
}: BrandHeaderProps) {
  const colors = tokens.colors[colorScheme];

  return (
    <>
      <View style={[styles.badge, { backgroundColor: colors.circle }]}>
        <View style={[styles.leaf, { borderColor: colors.primary }]}>
          <View style={[styles.stem, { backgroundColor: colors.primary }]} />
        </View>
      </View>
      <Text style={[styles.brand, { color: colors.primary }]}>MOEDAQUEST</Text>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
      <Text style={[styles.description, { color: colors.muted }]}>{description}</Text>
    </>
  );
}

const styles = StyleSheet.create({
  badge: {
    width: 96,
    height: 96,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: tokens.spacing.medium,
    borderRadius: tokens.radius.large,
  },
  leaf: {
    width: 42,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 28,
    borderBottomLeftRadius: 4,
    transform: [{ rotate: '-45deg' }],
  },
  stem: {
    width: 30,
    height: 2,
    transform: [{ rotate: '-30deg' }],
  },
  brand: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: tokens.fontSize.small,
    fontWeight: '800',
  },
  title: {
    marginBottom: 18,
    textAlign: 'center',
    fontSize: tokens.fontSize.title,
    lineHeight: 38,
    fontWeight: '800',
  },
  description: {
    marginBottom: tokens.spacing.xLarge,
    maxWidth: 320,
    alignSelf: 'center',
    textAlign: 'center',
    fontSize: tokens.fontSize.body,
    lineHeight: 22,
  },
});
