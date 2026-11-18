import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ChildBottomBar } from '@/components/ChildBottomBar';
import { useTrail, type TrailMission } from '@/contexts/TrailContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { tokens } from '@/theme/tokens';
import { styles } from './styles';

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default function ChildTrailScreen() {
  const params = useLocalSearchParams<{ name?: string }>();
  const paramName = firstParam(params.name)?.trim();
  const { childName, coins, missions } = useTrail();
  const [selectedMission, setSelectedMission] = useState<TrailMission | null>(null);

  const scheme = useColorScheme();
  const colorScheme = scheme === 'dark' ? 'dark' : 'light';
  const colors = tokens.colors[colorScheme];
  const displayName = paramName || childName.trim() || 'Explorador';

  const completedCount = useMemo(
    () => missions.filter((mission) => mission.status === 'completed').length,
    [missions]
  );
  const percentage = Math.round((completedCount / 5) * 100);

  const motivation = useMemo(() => {
    if (completedCount === 0) {
      return `${displayName}, comece sua primeira missão para ganhar moedas!`;
    }
    if (completedCount === 4) {
      return `${displayName}, falta só uma missão para ganhar uma estrela!`;
    }
    if (completedCount === 5) {
      return `Parabéns, ${displayName}! Você completou toda a trilha!`;
    }
    return `${displayName}, continue sua trilha e conquiste novas moedas!`;
  }, [completedCount, displayName]);

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text style={[styles.greeting, { color: colors.muted }]}>
                Olá, {displayName}!
              </Text>
              <Text style={[styles.title, { color: colors.text }]}>Sua trilha</Text>
            </View>
            <View style={styles.coinBadge}>
              <Ionicons name="cash-outline" size={18} color="#7A5200" />
              <Text style={styles.coinText}>{coins} moedas</Text>
            </View>
          </View>

          <View style={styles.motivationRow}>
            <View style={[styles.leafCircle, { backgroundColor: colors.circle }]}>
              <Ionicons name="leaf-outline" size={38} color={colors.primary} />
            </View>
            <View
              style={[
                styles.balloon,
                {
                  backgroundColor: colorScheme === 'dark' ? '#1f3a2b' : '#E6F5EC',
                },
              ]}
            >
              <Text
                style={[
                  styles.motivationText,
                  { color: colorScheme === 'dark' ? colors.primary : '#1F6B45' },
                ]}
              >
                {motivation}
              </Text>
            </View>
          </View>

          <View style={styles.progressBlock}>
            <View style={styles.progressLabels}>
              <Text style={[styles.progressText, { color: colors.muted }]}>
                {completedCount} de 5 missões da trilha
              </Text>
              <Text style={[styles.progressPercentage, { color: colors.primary }]}>
                {percentage}%
              </Text>
            </View>
            <View
              style={[
                styles.progressTrack,
                { backgroundColor: colorScheme === 'dark' ? '#3d342c' : '#e8e1d7' },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  { width: `${percentage}%`, backgroundColor: '#38a169' },
                ]}
              />
            </View>
          </View>

          <View style={styles.missions}>
            {missions.map((mission, index) => {
              const completed = mission.status === 'completed';
              const active = mission.status === 'active';
              const locked = mission.status === 'locked';

              return (
                <Pressable
                  key={mission.id}
                  accessibilityRole="button"
                  accessibilityLabel={`${mission.title}, ${
                    completed ? 'concluída' : active ? 'em destaque' : 'bloqueada'
                  }`}
                  disabled={!active}
                  onPress={() => setSelectedMission(mission)}
                  style={[
                    styles.missionCard,
                    completed && {
                      backgroundColor: colorScheme === 'dark' ? '#261f19' : '#ffffff',
                    },
                    active && {
                      backgroundColor: '#FFF3CD',
                      borderColor: '#FFB400',
                      borderWidth: 2,
                    },
                    locked && {
                      backgroundColor: colorScheme === 'dark' ? '#261f19' : '#ffffff',
                      opacity: 0.58,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.missionIcon,
                      completed && { backgroundColor: colors.primary },
                      active && { backgroundColor: '#FFB400' },
                      locked && {
                        backgroundColor: colorScheme === 'dark' ? '#4d463f' : '#e7e0d7',
                      },
                    ]}
                  >
                    <Ionicons
                      name={completed ? 'checkmark' : active ? 'star' : 'lock-closed'}
                      size={22}
                      color={completed ? '#ffffff' : active ? '#7A5200' : colors.muted}
                    />
                  </View>

                  <View style={styles.missionText}>
                    <Text style={[styles.missionNumber, { color: colors.muted }]}>
                      MISSÃO {index + 1}
                    </Text>
                    <Text style={[styles.missionTitle, { color: colors.text }]}>
                      {mission.title}
                    </Text>
                    <Text
                      style={[
                        styles.missionSubtitle,
                        {
                          color: completed
                            ? colors.primary
                            : active
                              ? '#7A5200'
                              : colors.muted,
                        },
                      ]}
                    >
                      {completed
                        ? `Concluída • +${mission.reward} moedas`
                        : active
                          ? 'Em destaque • perguntas em breve'
                          : 'Bloqueada • conclua a missão anterior'}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>

      <ChildBottomBar active="trilha" />

      <Modal
        animationType="slide"
        transparent
        visible={selectedMission !== null}
        onRequestClose={() => setSelectedMission(null)}
      >
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.modalCard,
              { backgroundColor: colorScheme === 'dark' ? '#261f19' : '#ffffff' },
            ]}
          >
            <View style={[styles.workIconCircle, { backgroundColor: colors.circle }]}>
              <Ionicons name="construct-outline" size={40} color={colors.primary} />
            </View>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              {selectedMission?.title}
            </Text>
            <Text style={[styles.workTitle, { color: colors.primary }]}>
              Desafio em trabalho
            </Text>
            <Text style={[styles.workMessage, { color: colors.muted }]}>
              Esta etapa de perguntas está sendo preparada e será liberada em breve.
            </Text>
            <Pressable
              accessibilityRole="button"
              onPress={() => setSelectedMission(null)}
              style={[styles.backToTrailButton, { backgroundColor: colors.button }]}
            >
              <Text style={[styles.backToTrailText, { color: colors.buttonText }]}>
                Voltar para a trilha
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
