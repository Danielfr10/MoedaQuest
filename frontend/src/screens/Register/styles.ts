import { StyleSheet } from 'react-native';

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
    paddingVertical: 24,
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
});
