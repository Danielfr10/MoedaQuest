import { StyleSheet } from 'react-native';

import { tokens } from '@/theme/tokens';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: tokens.spacing.large,
  },
  backContainer: {
    position: 'absolute',
    top: 8,
    left: 12,
  },
  screen: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  help: {
    marginTop: 20,
    alignSelf: 'center',
    maxWidth: 280,
    textAlign: 'center',
    fontSize: tokens.fontSize.small,
    lineHeight: 20,
  },
});
