import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  type TextInputInstance,
  useColorScheme,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BrandHeader } from '@/components/BrandHeader';
import { FormField } from '@/components/FormField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { tokens } from '@/theme/tokens';
import { styles } from './styles';

export default function WelcomeScreen() {
  const router = useRouter();
  const scheme = useColorScheme();
  const colorScheme = scheme === 'dark' ? 'dark' : 'light';
  const colors = tokens.colors[colorScheme];
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const nameInput = useRef<TextInputInstance>(null);

  useEffect(() => {
    const timer = setTimeout(() => nameInput.current?.focus(), 250);
    return () => clearTimeout(timer);
  }, []);

  function handleSubmit() {
    const trimmedName = name.trim();

    if (!trimmedName) {
      setError('Escreva seu nome para continuar.');
      nameInput.current?.focus();
      return;
    }

    setError('');
    router.push({ pathname: '/idade', params: { name: trimmedName } });
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
          <View style={styles.screen}>
            <BrandHeader
              title="Aprender sobre dinheiro pode ser uma aventura!"
              description="Vamos começar com o seu nome. Assim, sua trilha fica só sua."
              colorScheme={colorScheme}
            />
            <FormField
              label="Como você quer ser chamado?"
              value={name}
              error={error}
              inputRef={nameInput}
              maxLength={30}
              onChangeText={(value) => {
                setName(value);
                setError('');
              }}
              onSubmitEditing={handleSubmit}
              placeholder="Digite seu nome"
              returnKeyType="next"
              colorScheme={colorScheme}
            />
            <PrimaryButton
              label="Começar minha aventura"
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
