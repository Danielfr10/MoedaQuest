import { useEffect, useRef, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
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

type RegisterErrors = Partial<
  Record<'email' | 'confirmEmail' | 'password' | 'confirmPassword', string>
>;

function firstParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function RegisterScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    name?: string;
    age?: string;
    email?: string;
  }>();
  const name = firstParam(params.name) ?? '';
  const age = firstParam(params.age) ?? '';
  const initialEmail = firstParam(params.email) ?? '';
  const scheme = useColorScheme();
  const colorScheme = scheme === 'dark' ? 'dark' : 'light';
  const colors = tokens.colors[colorScheme];
  const [email, setEmail] = useState(initialEmail);
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<RegisterErrors>({});
  const emailInput = useRef<TextInputInstance>(null);
  const confirmEmailInput = useRef<TextInputInstance>(null);
  const passwordInput = useRef<TextInputInstance>(null);
  const confirmPasswordInput = useRef<TextInputInstance>(null);

  useEffect(() => {
    const timer = setTimeout(() => emailInput.current?.focus(), 250);
    return () => clearTimeout(timer);
  }, []);

  function clearError(key: keyof RegisterErrors) {
    setErrors((previous) => {
      const next = { ...previous };
      delete next[key];
      return next;
    });
  }

  function normalizedEmailForLink() {
    return email.trim();
  }

  function handleSubmit() {
    const nextErrors: RegisterErrors = {};
    const normalizedEmail = email.trim();
    const normalizedConfirmation = confirmEmail.trim();

    if (!isValidEmail(normalizedEmail)) {
      nextErrors.email = 'Digite um e-mail válido.';
    }
    if (!normalizedConfirmation) {
      nextErrors.confirmEmail = 'Confirme seu e-mail.';
    } else if (normalizedEmail.toLowerCase() !== normalizedConfirmation.toLowerCase()) {
      nextErrors.confirmEmail = 'Os e-mails não coincidem.';
    }
    if (password.length < 8) {
      nextErrors.password = 'A senha deve ter pelo menos 8 caracteres.';
    }
    if (!confirmPassword) {
      nextErrors.confirmPassword = 'Confirme sua senha.';
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = 'As senhas não coincidem.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    router.push({
      pathname: '/login',
      params: { name, age, email: normalizedEmail },
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
              title="Crie sua conta"
              description="Cadastre seus dados para continuar sua aventura."
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
                clearError('email');
              }}
              onSubmitEditing={() => confirmEmailInput.current?.focus()}
              placeholder="Digite seu e-mail"
              returnKeyType="next"
              colorScheme={colorScheme}
            />
            <FormField
              label="Confirme seu e-mail"
              value={confirmEmail}
              error={errors.confirmEmail}
              inputRef={confirmEmailInput}
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={(value) => {
                setConfirmEmail(value);
                clearError('confirmEmail');
              }}
              onSubmitEditing={() => passwordInput.current?.focus()}
              placeholder="Digite seu e-mail novamente"
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
                clearError('password');
              }}
              onSubmitEditing={() => confirmPasswordInput.current?.focus()}
              placeholder="Mínimo de 8 caracteres"
              returnKeyType="next"
              colorScheme={colorScheme}
            />
            <FormField
              label="Confirme sua senha"
              value={confirmPassword}
              error={errors.confirmPassword}
              inputRef={confirmPasswordInput}
              secureTextEntry
              onChangeText={(value) => {
                setConfirmPassword(value);
                clearError('confirmPassword');
              }}
              onSubmitEditing={handleSubmit}
              placeholder="Digite sua senha novamente"
              colorScheme={colorScheme}
            />
            <PrimaryButton
              label="Cadastrar"
              onPress={handleSubmit}
              colorScheme={colorScheme}
            />
            <TextLink
              prefix="Já tem uma conta?"
              label="Fazer login"
              onPress={() =>
                router.push({
                  pathname: '/login',
                  params: { name, age, email: normalizedEmailForLink() },
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
