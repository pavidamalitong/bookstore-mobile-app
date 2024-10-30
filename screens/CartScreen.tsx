import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

const CartScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Cart Screen</Text>
      <Button title="Proceed to Checkout" onPress={() => navigation.navigate('Checkout')} />
    </View>
  );
};

export default CartScreen;
