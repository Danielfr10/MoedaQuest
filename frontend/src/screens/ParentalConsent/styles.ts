import { StyleSheet } from 'react-native';

import { tokens } from '@/theme/tokens';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backContainer: {
    position: 'absolute',
    zIndex: 10,
    top: 16,
    left: 12,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 32,
    paddingBottom: tokens.spacing.large,
  },
  screen: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  eyebrow: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: tokens.fontSize.small,
    lineHeight: 18,
    fontWeight: '800',
  },
  title: {
    marginBottom: 10,
    textAlign: 'center',
    fontSize: tokens.fontSize.title,
    lineHeight: 38,
    fontWeight: '800',
  },
  subtitle: {
    marginBottom: tokens.spacing.large,
    textAlign: 'center',
    fontSize: tokens.fontSize.body,
    lineHeight: 22,
  },
  card: {
    width: '100%',
    marginBottom: tokens.spacing.large,
    paddingHorizontal: tokens.spacing.large,
    paddingVertical: tokens.spacing.large,
    borderRadius: tokens.radius.medium,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 5,
  },
  cardTitle: {
    marginBottom: 14,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '800',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkmarkCircle: {
    width: 26,
    height: 26,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 13,
  },
  checkmark: {
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '800',
  },
  listText: {
    flex: 1,
    fontSize: tokens.fontSize.body,
    lineHeight: 20,
  },
  privacy: {
    marginTop: 6,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e4ded7',
    fontSize: 12,
    lineHeight: 18,
  },
  checkboxRow: {
    minHeight: 44,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 24,
    height: 24,
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 6,
  },
  checkboxMark: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '800',
  },
  checkboxLabel: {
    flex: 1,
    fontSize: tokens.fontSize.body,
    lineHeight: 20,
  },
  validation: {
    minHeight: 20,
    marginTop: 4,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: tokens.fontSize.small,
    lineHeight: 20,
  },
});
