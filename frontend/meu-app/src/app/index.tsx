import { useEffect, useRef, useState, type RefObject } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  type TextInputInstance,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Screen = 'welcome' | 'age' | 'register' | 'login';
type ErrorKey =
  | 'name'
  | 'age'
  | 'email'
  | 'confirmEmail'
  | 'password'
  | 'confirmPassword'
  | 'loginEmail'
  | 'loginPassword';

const colors = {
  background: '#fff6ec',
  circle: '#ddf1e4',
  green: '#1f6b45',
  text: '#2a2a2a',
  muted: '#6e6a66',
  border: '#3a3a3a',
  input: '#ffffff',
  button: '#ffb400',
  buttonPressed: '#f2a900',
  error: '#b3261e',
};

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function HomeScreen() {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [errors, setErrors] = useState<Partial<Record<ErrorKey, string>>>({});
  const [notice, setNotice] = useState('');

  const nameInput = useRef<TextInputInstance>(null);
  const ageInput = useRef<TextInputInstance>(null);
  const emailInput = useRef<TextInputInstance>(null);
  const confirmEmailInput = useRef<TextInputInstance>(null);
  const passwordInput = useRef<TextInputInstance>(null);
  const confirmPasswordInput = useRef<TextInputInstance>(null);
  const loginEmailInput = useRef<TextInputInstance>(null);
  const loginPasswordInput = useRef<TextInputInstance>(null);

  useEffect(() => {
    const inputByScreen: Record<Screen, RefObject<TextInputInstance | null>> = {
      welcome: nameInput,
      age: ageInput,
      register: emailInput,
      login: loginEmailInput,
    };
    const focusTimer = setTimeout(() => inputByScreen[screen].current?.focus(), 250);
    return () => clearTimeout(focusTimer);
  }, [screen]);

  function clearError(key: ErrorKey) {
    setErrors((previous) => {
      const next = { ...previous };
      delete next[key];
      return next;
    });
  }

  function goTo(nextScreen: Screen) {
    setErrors({});
    setNotice('');
    setScreen(nextScreen);
  }

  function handleNameSubmit() {
    if (!name.trim()) {
      setErrors({ name: 'Escreva seu nome para continuar.' });
      return;
    }
    goTo('age');
  }

  function handleAgeSubmit() {
    const parsedAge = Number(age);
    if (!/^\d+$/.test(age) || parsedAge < 1 || parsedAge > 120) {
      setErrors({
        age: age
          ? 'Digite uma idade válida entre 1 e 120 anos.'
          : 'Digite sua idade para continuar.',
      });
      return;
    }
    goTo('register');
  }

  function handleRegisterSubmit() {
    const nextErrors: Partial<Record<ErrorKey, string>> = {};
    const normalizedEmail = email.trim();
    const normalizedConfirmation = confirmEmail.trim();

    if (!isValidEmail(normalizedEmail)) {
      nextErrors.email = 'Digite um e-mail válido.';
    }
    if (!normalizedConfirmation) {
      nextErrors.confirmEmail = 'Confirme seu e-mail.';
    } else if (
      normalizedEmail.toLowerCase() !== normalizedConfirmation.toLowerCase()
    ) {
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

    setLoginEmail(normalizedEmail);
    setPassword('');
    setConfirmPassword('');
    setScreen('login');
    setNotice(
      'Dados conferidos. Para criar uma conta de verdade, é necessário conectar um serviço de autenticação.',
    );
  }

  function handleLoginSubmit() {
    setNotice('');
    const nextErrors: Partial<Record<ErrorKey, string>> = {};
    if (!isValidEmail(loginEmail.trim())) {
      nextErrors.loginEmail = 'Digite um e-mail válido.';
    }
    if (!loginPassword) {
      nextErrors.loginPassword = 'Digite sua senha.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setNotice(
        'Os campos foram preenchidos. O login ainda precisa ser conectado a um serviço de autenticação.',
      );
    }
  }

  function renderHeader(title: string, description: string, backTo?: Screen) {
    return (
      <>
        {backTo && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Voltar"
            onPress={() => goTo(backTo)}
            style={({ pressed }) => [styles.backButton, pressed && styles.pressed]}
          >
            <Text style={styles.backArrow}>‹</Text>
          </Pressable>
        )}
        <View style={styles.brandBadge}>
          <View style={styles.leaf}>
            <View style={styles.leafStem} />
          </View>
        </View>
        <Text style={styles.brand}>MOEDAQUEST</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.lead}>{description}</Text>
      </>
    );
  }

  function renderError(message?: string) {
    return (
      <Text accessibilityLiveRegion="polite" style={styles.error}>
        {message ?? ' '}
      </Text>
    );
  }

  function renderField(
    label: string,
    value: string,
    onChangeText: (value: string) => void,
    options: {
      error?: string;
      inputRef?: RefObject<TextInputInstance | null>;
      keyboardType?: 'default' | 'email-address' | 'number-pad';
      maxLength?: number;
      onSubmitEditing?: () => void;
      placeholder: string;
      returnKeyType?: 'done' | 'next';
      secureTextEntry?: boolean;
      autoCapitalize?: 'none' | 'sentences';
    },
  ) {
    return (
      <View style={styles.field}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          ref={options.inputRef}
          accessibilityLabel={label}
          accessibilityHint={options.error}
          autoCapitalize={options.autoCapitalize ?? 'sentences'}
          autoCorrect={options.keyboardType === 'email-address' ? false : undefined}
          keyboardType={options.keyboardType ?? 'default'}
          maxLength={options.maxLength}
          onChangeText={onChangeText}
          onSubmitEditing={options.onSubmitEditing}
          placeholder={options.placeholder}
          placeholderTextColor={colors.muted}
          returnKeyType={options.returnKeyType ?? 'done'}
          secureTextEntry={options.secureTextEntry}
          style={[styles.input, options.error && styles.inputError]}
          value={value}
        />
        {renderError(options.error)}
      </View>
    );
  }

  function renderButton(label: string, onPress: () => void) {
    return (
      <Pressable
        accessibilityRole="button"
        onPress={onPress}
        style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
      >
        <Text style={styles.buttonText}>{label}</Text>
      </Pressable>
    );
  }

  function renderLink(prefix: string, label: string, destination: Screen) {
    return (
      <Text style={styles.help}>
        {prefix}{' '}
        <Text
          accessibilityRole="button"
          onPress={() => goTo(destination)}
          style={styles.textButton}
        >
          {label}
        </Text>
      </Text>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardAvoiding}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.screen}>
            {screen === 'welcome' && (
              <>
                {renderHeader(
                  'Aprender sobre dinheiro pode ser uma aventura!',
                  'Vamos começar com o seu nome. Assim, sua trilha fica só sua.',
                )}
                {renderField('Como você quer ser chamado?', name, (value) => {
                  setName(value);
                  clearError('name');
                }, {
                  error: errors.name,
                  inputRef: nameInput,
                  maxLength: 30,
                  onSubmitEditing: handleNameSubmit,
                  placeholder: 'Digite seu nome',
                  returnKeyType: 'next',
                })}
                {renderButton('Começar minha aventura', handleNameSubmit)}
                <Text style={styles.help}>
                  Você pode pedir ajuda a um adulto a qualquer momento.
                </Text>
              </>
            )}

            {screen === 'age' && (
              <>
                {renderHeader(
                  'Qual é a sua idade?',
                  'Conte sua idade para continuarmos a preparar sua aventura.',
                  'welcome',
                )}
                {renderField('Quantos anos você tem?', age, (value) => {
                  if (/^\d*$/.test(value)) {
                    setAge(value);
                    clearError('age');
                  } else {
                    setErrors({ age: 'Digite apenas números.' });
                  }
                }, {
                  error: errors.age,
                  inputRef: ageInput,
                  keyboardType: 'number-pad',
                  maxLength: 3,
                  onSubmitEditing: handleAgeSubmit,
                  placeholder: 'Digite sua idade',
                })}
                {renderButton('Continuar', handleAgeSubmit)}
                <Text style={styles.help}>
                  Você pode pedir ajuda a um adulto a qualquer momento.
                </Text>
              </>
            )}

            {screen === 'register' && (
              <>
                {renderHeader(
                  'Crie sua conta',
                  'Cadastre seus dados para continuar sua aventura.',
                  'age',
                )}
                {renderField('E-mail', email, (value) => {
                  setEmail(value);
                  clearError('email');
                }, {
                  error: errors.email,
                  inputRef: emailInput,
                  keyboardType: 'email-address',
                  onSubmitEditing: () => confirmEmailInput.current?.focus(),
                  placeholder: 'Digite seu e-mail',
                  autoCapitalize: 'none',
                  returnKeyType: 'next',
                })}
                {renderField('Confirme seu e-mail', confirmEmail, (value) => {
                  setConfirmEmail(value);
                  clearError('confirmEmail');
                }, {
                  error: errors.confirmEmail,
                  inputRef: confirmEmailInput,
                  keyboardType: 'email-address',
                  onSubmitEditing: () => passwordInput.current?.focus(),
                  placeholder: 'Digite seu e-mail novamente',
                  autoCapitalize: 'none',
                  returnKeyType: 'next',
                })}
                {renderField('Senha', password, (value) => {
                  setPassword(value);
                  clearError('password');
                }, {
                  error: errors.password,
                  inputRef: passwordInput,
                  onSubmitEditing: () => confirmPasswordInput.current?.focus(),
                  placeholder: 'Mínimo de 8 caracteres',
                  secureTextEntry: true,
                  returnKeyType: 'next',
                })}
                {renderField('Confirme sua senha', confirmPassword, (value) => {
                  setConfirmPassword(value);
                  clearError('confirmPassword');
                }, {
                  error: errors.confirmPassword,
                  inputRef: confirmPasswordInput,
                  onSubmitEditing: handleRegisterSubmit,
                  placeholder: 'Digite sua senha novamente',
                  secureTextEntry: true,
                })}
                {renderButton('Cadastrar', handleRegisterSubmit)}
                {renderLink('Já tem uma conta?', 'Fazer login', 'login')}
              </>
            )}

            {screen === 'login' && (
              <>
                {renderHeader(
                  'Que bom ter você de volta!',
                  'Entre com seu e-mail e sua senha.',
                  'register',
                )}
                {renderField('E-mail', loginEmail, (value) => {
                  setLoginEmail(value);
                  setNotice('');
                  clearError('loginEmail');
                }, {
                  error: errors.loginEmail,
                  inputRef: loginEmailInput,
                  keyboardType: 'email-address',
                  onSubmitEditing: () => loginPasswordInput.current?.focus(),
                  placeholder: 'Digite seu e-mail',
                  autoCapitalize: 'none',
                  returnKeyType: 'next',
                })}
                {renderField('Senha', loginPassword, (value) => {
                  setLoginPassword(value);
                  setNotice('');
                  clearError('loginPassword');
                }, {
                  error: errors.loginPassword,
                  inputRef: loginPasswordInput,
                  onSubmitEditing: handleLoginSubmit,
                  placeholder: 'Digite sua senha',
                  secureTextEntry: true,
                })}
                {renderButton('Entrar', handleLoginSubmit)}
                {notice ? (
                  <Text accessibilityLiveRegion="polite" style={styles.notice}>
                    {notice}
                  </Text>
                ) : null}
                {renderLink('Ainda não tem conta?', 'Cadastre-se', 'register')}
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
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
  screen: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    marginBottom: 8,
  },
  backArrow: {
    color: colors.green,
    fontSize: 38,
    lineHeight: 42,
  },
  brandBadge: {
    width: 96,
    height: 96,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderRadius: 48,
    backgroundColor: colors.circle,
  },
  leaf: {
    width: 42,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.green,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 28,
    borderBottomLeftRadius: 4,
    transform: [{ rotate: '-45deg' }],
  },
  leafStem: {
    width: 30,
    height: 2,
    backgroundColor: colors.green,
    transform: [{ rotate: '-30deg' }],
  },
  brand: {
    marginBottom: 10,
    color: colors.green,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.6,
    textAlign: 'center',
  },
  title: {
    marginBottom: 14,
    color: colors.text,
    fontSize: 32,
    fontWeight: '800',
    lineHeight: 36,
    textAlign: 'center',
  },
  lead: {
    marginBottom: 24,
    alignSelf: 'center',
    maxWidth: 320,
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
  },
  field: {
    marginBottom: 2,
  },
  label: {
    marginBottom: 8,
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
  },
  input: {
    minHeight: 52,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.input,
    color: colors.text,
    fontSize: 16,
  },
  inputError: {
    borderColor: colors.error,
  },
  error: {
    minHeight: 22,
    marginTop: 5,
    marginBottom: 5,
    color: colors.error,
    fontSize: 13,
  },
  button: {
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 6,
    borderRadius: 28,
    backgroundColor: colors.button,
  },
  buttonPressed: {
    backgroundColor: colors.buttonPressed,
    opacity: 0.85,
  },
  pressed: {
    opacity: 0.7,
  },
  buttonText: {
    paddingHorizontal: 16,
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
    textAlign: 'center',
  },
  help: {
    marginTop: 18,
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
  },
  textButton: {
    color: colors.green,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  notice: {
    marginTop: 14,
    padding: 12,
    borderRadius: 12,
    backgroundColor: colors.circle,
    color: colors.green,
    fontSize: 13,
    lineHeight: 19,
  },
});
