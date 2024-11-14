import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent } from 'react-native';
import CustomText from './CustomText';
import colors from '@/styles/colors';

interface CustomButtonProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ text, onPress }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <CustomText fontWeight='semiBold' fontSize={20} style={{color: colors.white}}>{text}</CustomText>
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
    borderRadius: 10, // Rounded corners
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default CustomButton;
