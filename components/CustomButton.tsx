import React from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent } from 'react-native';
import CustomText from './CustomText';
import colors from '@/styles/colors';

type CustomButtonProps = {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onPress, disabled = false }) => {
  return (
    <TouchableOpacity
      style={[styles.button, disabled && styles.disabledButton]}
      onPress={onPress}
      disabled={disabled}
    >
      <CustomText fontWeight="semiBold" fontSize={20} style={{ color: colors.white }}>
        {text}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 320,
    height: 56,
    alignSelf: 'center',
    backgroundColor: colors.black,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: colors.darkGray,
    opacity: 0.6,
  },
});

export default CustomButton;
