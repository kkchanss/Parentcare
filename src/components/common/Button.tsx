// 기본 버튼 컴포넌트
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, TouchableOpacityProps } from 'react-native';
import { COLORS, SIZES, FONTS } from '../../constants';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
}

export const Button: React.FC<ButtonProps> = ({
  title,
  variant = 'primary',
  size = 'medium',
  style,
  ...props
}) => {
  const buttonStyle = [
    styles.button,
    styles[variant],
    styles[size],
    style,
  ];

  const textStyle = [
    styles.text,
    styles[`${variant}Text`],
    styles[`${size}Text`],
  ];

  return (
    <TouchableOpacity style={buttonStyle} {...props}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: COLORS.primary,
  },
  secondary: {
    backgroundColor: COLORS.secondary,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  small: {
    paddingHorizontal: SIZES.sm,
    paddingVertical: SIZES.xs,
  },
  medium: {
    paddingHorizontal: SIZES.md,
    paddingVertical: SIZES.sm,
  },
  large: {
    paddingHorizontal: SIZES.lg,
    paddingVertical: SIZES.md,
  },
  text: {
    fontFamily: FONTS.medium,
    fontWeight: '600',
  },
  primaryText: {
    color: COLORS.surface,
  },
  secondaryText: {
    color: COLORS.surface,
  },
  outlineText: {
    color: COLORS.primary,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});
