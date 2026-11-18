import { type RefObject } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  type TextInputInstance,
  type TextInputProps,
  View,
} from 'react-native';

import { tokens } from '@/theme/tokens';

type FormFieldProps = TextInputProps & {
  label: string;
  error?: string;
  inputRef?: RefObject<TextInputInstance | null>;
  colorScheme?: 'light' | 'dark';
};

export function FormField({
  label,
  error,
  inputRef,
  colorScheme = 'light',
  style,
  ...textInputProps
}: FormFieldProps) {
  const colors = tokens.colors[colorScheme];

  return (
    <View style={styles.field}>
      <Text style={[styles.label, { color: colors.text }]}>{label}</Text>
      <TextInput
        {...textInputProps}
        ref={inputRef}
        accessibilityHint={error}
        accessibilityLabel={label}
        autoCorrect={textInputProps.keyboardType === 'email-address' ? false : undefined}
        placeholderTextColor={colors.muted}
        style={[
          styles.input,
          {
            color: colors.text,
            backgroundColor: colors.input,
            borderColor: error ? colors.error : colors.border,
          },
          style,
        ]}
      />
      <Text accessibilityLiveRegion="polite" style={[styles.error, { color: colors.error }]}>
        {error ?? ' '}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    width: '100%',
    marginBottom: tokens.spacing.small,
  },
  label: {
    marginBottom: 10,
    fontSize: tokens.fontSize.label,
    fontWeight: '700',
  },
  input: {
    width: '100%',
    height: 52,
    paddingHorizontal: tokens.spacing.medium,
    borderWidth: 2,
    borderRadius: tokens.radius.small,
    fontSize: 16,
  },
  error: {
    minHeight: 20,
    marginTop: 6,
    marginHorizontal: 2,
    fontSize: tokens.fontSize.small,
  },
});
