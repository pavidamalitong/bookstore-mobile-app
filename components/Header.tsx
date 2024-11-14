import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation, NavigationProp } from '@react-navigation/native';

import CustomText from './CustomText';
import { RootStackParamList } from '../App'; // Adjust the import path as needed
import colors from '@/styles/colors';

interface HeaderProps {
  headerName: string;
  previousPage: keyof RootStackParamList; // Define previousPage as a key of RootStackParamList
  bgColor?: string;
}

const Header: React.FC<HeaderProps> = ({ headerName, previousPage, bgColor = '#fff' }) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate(previousPage as any)}>
        <Icon name="arrow-left" size={24} color={colors.black} />
      </TouchableOpacity>
      <CustomText fontWeight='medium' fontSize={20} style={styles.title}>{headerName}</CustomText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20
  },
  backButton: {
    position: 'absolute',
    left: 0,
    bottom: 10,
    padding: 10,
  },
  title: {
    textAlign: 'center',
    flex: 1,
  },
});

export default Header;