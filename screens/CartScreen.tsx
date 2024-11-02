import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

import Header from '../components/Header';
import colors from '@/styles/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

const CartScreen = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
      <Header headerName="Cart" previousPage="Landing" bgColor={colors.lightGray} />
      <Button title="Proceed to Checkout" onPress={() => navigation.navigate('Checkout')} />
    </View>
  );
};

export default CartScreen;
