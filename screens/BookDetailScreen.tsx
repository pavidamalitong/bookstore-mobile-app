import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

import Header from '../components/Header';
import CustomText from '../components/CustomText';
import colors from '@/styles/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'BookDetail'>;

const BookDetailScreen = ({ route, navigation }: Props) => {
  const { bookId } = route.params;

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <Header headerName="Book Detail" previousPage="Landing" bgColor={colors.white} />

      <CustomText>Book Detail Screen for Book ID: {bookId}</CustomText>
      <Button title="Add to Cart" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
};

export default BookDetailScreen;