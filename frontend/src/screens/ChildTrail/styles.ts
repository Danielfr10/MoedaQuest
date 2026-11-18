import { StyleSheet } from 'react-native';

import { tokens } from '@/theme/tokens';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 120,
  },
  content: {
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  headerText: {
    flex: 1,
  },
  greeting: {
    marginBottom: 2,
    fontSize: 14,
    fontWeight: '600',
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '800',
  },
  coinBadge: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderRadius: 20,
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 12,
  },
  coinText: {
    color: '#7A5200',
    fontSize: 13,
    fontWeight: '800',
  },
  motivationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  leafCircle: {
    width: 72,
    height: 72,
    flexShrink: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 36,
  },
  balloon: {
    flex: 1,
    minHeight: 72,
    justifyContent: 'center',
    marginLeft: 12,
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  motivationText: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: '700',
  },
  progressBlock: {
    marginBottom: 18,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 13,
    fontWeight: '600',
  },
  progressPercentage: {
    fontSize: 13,
    fontWeight: '800',
  },
  progressTrack: {
    height: 12,
    overflow: 'hidden',
    borderRadius: 6,
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  missions: {
    gap: 12,
  },
  missionCard: {
    minHeight: 106,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 18,
    padding: 14,
  },
  missionIcon: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    marginRight: 12,
  },
  missionText: {
    flex: 1,
  },
  missionNumber: {
    marginBottom: 2,
    fontSize: 11,
    fontWeight: '800',
  },
  missionTitle: {
    marginBottom: 4,
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '800',
  },
  missionSubtitle: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: '700',
  },
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    borderRadius: 24,
    padding: 24,
  },
  workIconCircle: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 40,
    marginBottom: 16,
  },
  modalTitle: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 20,
    lineHeight: 26,
    fontWeight: '800',
  },
  workTitle: {
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
  },
  workMessage: {
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 22,
  },
  backToTrailButton: {
    width: '100%',
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: tokens.radius.pill,
  },
  backToTrailText: {
    fontSize: 15,
    fontWeight: '800',
  },
});
