import React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { FONTS, COLORS } from '@constants/index';

interface CustomTextProps extends TextProps {
  ftW?: keyof typeof FONTS;
}

export const CustomText: React.FC<CustomTextProps> = ({ ftW = 'Regular', style, ...props }) => {
  return (
    <RNText
      {...props}
      style={[{ fontFamily: FONTS[ftW] },{ color: COLORS.textBase }, style]}
    />
  );
};
