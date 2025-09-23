import React from 'react';
import { TextInput, TextInputProps, StyleSheet } from 'react-native';
import { FONTS, COLORS } from '@constants/index';

type FontWeight =
  | 'Thin'
  | 'ExtraLight'
  | 'Light'
  | 'Regular'
  | 'Medium'
  | 'SemiBold'
  | 'Bold'
  | 'ExtraBold'
  | 'Black';

interface CustomTextInputProps extends TextInputProps {
  ftW?: FontWeight;
}

export const CustomTextInput: React.FC<CustomTextInputProps> = ({
  ftW = 'Regular',
  style,
  placeholderTextColor,
  ...props
}) => {
  return (
    <TextInput
      {...props}
      placeholderTextColor={placeholderTextColor ?? COLORS.text77}
      style={[{ fontFamily: FONTS[ftW] }, style]}
    />
  );
};
