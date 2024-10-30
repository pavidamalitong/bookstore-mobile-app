import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

const CheckoutScreen = ({ navigation }: Props) => {
  return (
    <View>
      <Text>Checkout Screen</Text>
      <Button title="Place Order" onPress={() => alert('Order placed!')} />
    </View>
  );
};

export default CheckoutScreen;