import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 120,
  },
  content: {
    alignItems: 'center',
  },
  title: {
    marginTop: 18,
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
  },
  status: {
    overflow: 'hidden',
    marginTop: 14,
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
    fontSize: 14,
    fontWeight: '800',
  },
  description: {
    maxWidth: 360,
    marginTop: 14,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
  },
});
