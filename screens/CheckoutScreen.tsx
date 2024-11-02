import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import CustomText from '@/components/CustomText';
import Header from '@/components/Header';
import colors from '@/styles/colors';
import ConfirmPopup from '@/components/ConfirmPopup';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

const CheckoutScreen = ({ navigation }: Props) => {

  const [popupVisible, setPopupVisible] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
      <Header headerName="Checkout" previousPage="Landing" bgColor={colors.lightGray} />
      <Button title="Place Order" onPress={() => setPopupVisible(true)} />
      <ConfirmPopup
        visible={popupVisible}
        onCancel={() => setPopupVisible(false)}
        onConfirm={() => {
          setPopupVisible(false);
          navigation.navigate('Success');
        }}
      />
    </View>
  );
};

export default CheckoutScreen;