import { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
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

import { BackButton } from '@/components/BackButton';
import { BrandHeader } from '@/components/BrandHeader';
import { FormField } from '@/components/FormField';
import { PrimaryButton } from '@/components/PrimaryButton';
import { TextLink } from '@/components/TextLink';
import { tokens } from '@/theme/tokens';
import { styles } from './styles';

type LoginErrors = Partial<Record<'email' | 'password', string>>;

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function LoginScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ name?: string; age?: string; email?: string }>();
  const initialEmail = firstParam(params.email) ?? '';
  const name = firstParam(params.name) ?? '';
  const age = firstParam(params.age) ?? '';
  const scheme = useColorScheme();
  const colorScheme = scheme === 'dark' ? 'dark' : 'light';
  const colors = tokens.colors[colorScheme];
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [notice, setNotice] = useState('');
  const emailInput = useRef<TextInputInstance>(null);
  const passwordInput = useRef<TextInputInstance>(null);

  useEffect(() => {
    const timer = setTimeout(() => emailInput.current?.focus(), 250);
    return () => clearTimeout(timer);
  }, []);

  function clearError(key: keyof LoginErrors) {
    setErrors((previous) => {
      const next = { ...previous };
      delete next[key];
      return next;
    });
  }

  function handleSubmit() {
    setNotice('');
    const nextErrors: LoginErrors = {};

    if (!isValidEmail(email.trim())) {
      nextErrors.email = 'Digite um e-mail válido.';
    }
    if (!password) {
      nextErrors.password = 'Digite sua senha.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setNotice(
        'Os campos foram preenchidos. O login ainda precisa ser conectado a um serviço de autenticação.',
      );
    }
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
              title="Que bom ter você de volta!"
              description="Entre com seu e-mail e sua senha."
              colorScheme={colorScheme}
            />
            <FormField
              label="E-mail"
              value={email}
              error={errors.email}
              inputRef={emailInput}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(value) => {
                setEmail(value);
                setNotice('');
                clearError('email');
              }}
              onSubmitEditing={() => passwordInput.current?.focus()}
              placeholder="Digite seu e-mail"
              returnKeyType="next"
              colorScheme={colorScheme}
            />
            <FormField
              label="Senha"
              value={password}
              error={errors.password}
              inputRef={passwordInput}
              secureTextEntry
              onChangeText={(value) => {
                setPassword(value);
                setNotice('');
                clearError('password');
              }}
              onSubmitEditing={handleSubmit}
              placeholder="Digite sua senha"
              colorScheme={colorScheme}
            />
            <PrimaryButton
              label="Entrar"
              onPress={handleSubmit}
              colorScheme={colorScheme}
            />
            {notice ? (
              <Text
                accessibilityLiveRegion="polite"
                style={[styles.notice, { color: colors.primary }]}
              >
                {notice}
              </Text>
            ) : null}
            <TextLink
              prefix="Ainda não tem conta?"
              label="Cadastre-se"
              onPress={() =>
                router.push({
                  pathname: '/cadastro',
                  params: { name, age, email },
                })
              }
              colorScheme={colorScheme}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
