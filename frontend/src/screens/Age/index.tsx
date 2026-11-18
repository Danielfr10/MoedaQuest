import { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  type TextInputInstance,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BackButton } from '@/components/BackButton';
import { BrandHeader } from '@/components/BrandHeader';
import { FormField } from '@/components/FormField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { tokens } from '@/theme/tokens';
import { styles } from './styles';

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default function AgeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ name?: string }>();
  const name = firstParam(params.name) ?? '';
  const scheme = useColorScheme();
  const colorScheme = scheme === 'dark' ? 'dark' : 'light';
  const colors = tokens.colors[colorScheme];
  const [age, setAge] = useState('');
  const [error, setError] = useState('');
  const ageInput = useRef<TextInputInstance>(null);

  useEffect(() => {
    const timer = setTimeout(() => ageInput.current?.focus(), 250);
    return () => clearTimeout(timer);
  }, []);

  function handleSubmit() {
    const parsedAge = Number(age);

    if (!/^\d+$/.test(age) || parsedAge < 1 || parsedAge > 120) {
      setError(
        age
          ? 'Digite uma idade válida entre 1 e 120 anos.'
          : 'Digite sua idade para continuar.',
      );
      ageInput.current?.focus();
      return;
    }

    setError('');
    router.push({
      pathname: '/cadastro',
      params: { name, age },
    });
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoiding}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.backContainer}>
            <BackButton
              onPress={() => router.back()}
              colorScheme={colorScheme}
            />
          </View>
          <View style={styles.screen}>
            <BrandHeader
              title="Qual é a sua idade?"
              description="Conte sua idade para continuarmos a preparar sua aventura."
              colorScheme={colorScheme}
            />
            <FormField
              label="Quantos anos você tem?"
              value={age}
              error={error}
              inputRef={ageInput}
              keyboardType="number-pad"
              maxLength={3}
              onChangeText={(value) => {
                if (/^\d*$/.test(value)) {
                  setAge(value);
                  setError('');
                } else {
                  setError('Digite apenas números.');
                }
              }}
              onSubmitEditing={handleSubmit}
              placeholder="Digite sua idade"
              colorScheme={colorScheme}
            />
            <PrimaryButton
              label="Continuar"
              onPress={handleSubmit}
              colorScheme={colorScheme}
            />
            <Text style={[styles.help, { color: colors.muted }]}>
              Você pode pedir ajuda a um adulto a qualquer momento.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
