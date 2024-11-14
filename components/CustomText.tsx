// CustomText.tsx
import React from 'react';
import { Text, TextStyle } from 'react-native';
import { useFonts, Poppins_300Light, Poppins_400Regular, Poppins_500Medium, Poppins_500Medium_Italic, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

interface CustomTextProps {
  children: React.ReactNode; // Text content to display
  fontWeight?: 'light' | 'regular' | 'medium' | 'mediumItalic' | 'semiBold'; // Font weight options
  fontSize?: number; // Font size prop
  style?: TextStyle; // Additional style prop
}

// CustomText component
const CustomText: React.FC<CustomTextProps> = ({
  children,
  fontWeight = 'regular',
  fontSize = 16,
  style,
}) => {
  // Load fonts
  const [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
  });

  // Determine font family based on weight
  const fontFamilyMap: Record<string, string> = {
    light: 'Poppins_300Light',
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    mediumItalic: 'Poppins_500Medium_Italic',
    semiBold: 'Poppins_600SemiBold',
  };

  const fontFamily = fontFamilyMap[fontWeight];

  if (!fontsLoaded) {
    return null; // Optionally return a placeholder or null until fonts are loaded
  }

  return (
    <Text style={[{ fontFamily, fontSize }, style]}>
      {children}
    </Text>
  );
};

export default CustomText;