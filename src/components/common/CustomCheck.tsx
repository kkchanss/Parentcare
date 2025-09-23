import React, { useState } from 'react';
import { Pressable, Image, StyleSheet } from 'react-native';

import checkOn from '@assets/icons/checkOn.png';
import checkOff from '@assets/icons/checkOff.png';
import { SIZES } from '@constants/index';

export const CustomCheck: React.FC<{
  checked?: boolean;
  onChange?: (v: boolean) => void;
}> = ({ checked = false, onChange }) => {
  const [isChecked, setIsChecked] = useState(checked);

  const toggle = () => {
    const next = !isChecked;
    setIsChecked(next);
    onChange?.(next);
  };

  return (
    <Pressable style={styles.container} onPress={toggle} hitSlop={10}>
      <Image
        source={isChecked ? checkOn : checkOff}
        style={styles.icon}
        resizeMode="contain"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.iconS,
    height: SIZES.iconS,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: '100%',
    height: '100%',
  },
});