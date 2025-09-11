// 기본 텍스트 입력 컴포넌트
import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: any;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  containerStyle,
  style,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          isFocused && styles.focused,
          error && styles.error,
          style,
        ]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholderTextColor={COLORS.textSecondary}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.md,
  },
  label: {
    fontSize: 16,
    fontFamily: FONTS.medium,
    color: COLORS.text,
    marginBottom: SIZES.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.textSecondary,
    borderRadius: 8,
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
    fontSize: 16,
    fontFamily: FONTS.regular,
    color: COLORS.text,
    backgroundColor: COLORS.surface,
  },
  focused: {
    borderColor: COLORS.primary,
  },
  error: {
    borderColor: COLORS.error,
  },
  errorText: {
    fontSize: 14,
    color: COLORS.error,
    marginTop: SIZES.xs,
  },
});
