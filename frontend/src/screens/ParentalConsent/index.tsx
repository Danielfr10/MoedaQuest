import { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '@/components/BackButton';
import { PrimaryButton } from '@/components/PrimaryButton';
import { TextLink } from '@/components/TextLink';
import { useTrail } from '@/contexts/TrailContext';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { tokens } from '@/theme/tokens';
import { styles } from './styles';

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

const storedItems = [
  'Nome ou apelido da criança',
  'Progresso nas missões',
  'Metas e moedas virtuais',
];

export default function ParentalConsentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    name?: string;
    age?: string;
    email?: string;
  }>();
  const name = firstParam(params.name) ?? '';
  const age = firstParam(params.age) ?? '';
  const email = firstParam(params.email) ?? '';
  const scheme = useColorScheme();
  const colorScheme = scheme === 'dark' ? 'dark' : 'light';
  const colors = tokens.colors[colorScheme];
  const [authorized, setAuthorized] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');
  const { setChildName } = useTrail();

  function handleConfirm() {
    if (!authorized) {
      setValidationMessage('Marque a autorização antes de continuar.');
      return;
    }

    setValidationMessage('');
    setChildName(name);
    router.push({
      pathname: '/trilha',
      params: { name, age, email },
    });
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <View style={styles.backContainer}>
        <BackButton onPress={() => router.back()} colorScheme={colorScheme} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.screen}>
          <Text style={[styles.eyebrow, { color: colors.primary }]}>
            ÁREA DO RESPONSÁVEL
          </Text>
          <Text style={[styles.title, { color: colors.text }]}>Antes de começar</Text>
          <Text style={[styles.subtitle, { color: colors.muted }]}>
            Confira como o MoedaQuest usa os dados para personalizar a experiência
            financeira da criança.
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: colorScheme === 'dark' ? colors.input : '#ffffff',
                shadowColor: colorScheme === 'dark' ? '#000000' : '#6e6a66',
              },
            ]}
          >
            <Text style={[styles.cardTitle, { color: colors.text }]}>
              O MoedaQuest guarda:
            </Text>

            {storedItems.map((item) => (
              <View key={item} style={styles.listItem}>
                <View style={[styles.checkmarkCircle, { backgroundColor: colors.circle }]}>
                  <Text style={[styles.checkmark, { color: colors.primary }]}>✓</Text>
                </View>
                <Text style={[styles.listText, { color: colors.text }]}>{item}</Text>
              </View>
            ))}

            <Text style={[styles.privacy, { color: colors.muted }]}>
              Esses dados são usados apenas para salvar o progresso e podem ser
              revisados ou removidos pelo responsável.
            </Text>
          </View>

          <Pressable
            accessibilityLabel="Li e autorizo o uso desses dados."
            accessibilityRole="checkbox"
            accessibilityState={{ checked: authorized }}
            onPress={() => {
              setAuthorized((previous) => !previous);
              setValidationMessage('');
            }}
            style={styles.checkboxRow}
          >
            <View
              style={[
                styles.checkbox,
                {
                  borderColor: authorized ? colors.primary : colors.border,
                  backgroundColor: authorized ? colors.primary : colors.input,
                },
              ]}
            >
              {authorized ? (
                <Text style={[styles.checkboxMark, { color: colors.buttonText }]}>✓</Text>
              ) : null}
            </View>
            <Text style={[styles.checkboxLabel, { color: colors.text }]}>
              Li e autorizo o uso desses dados.
            </Text>
          </Pressable>

          <Text
            accessibilityLiveRegion="polite"
            style={[
              styles.validation,
              validationMessage ? { color: colors.error } : { color: 'transparent' },
            ]}
          >
            {validationMessage || ' '}
          </Text>

          <PrimaryButton
            label="Confirmar e liberar a trilha"
            onPress={handleConfirm}
            colorScheme={colorScheme}
          />

          <TextLink
            prefix=""
            label="Revisar depois"
            onPress={() => router.back()}
            colorScheme={colorScheme}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
