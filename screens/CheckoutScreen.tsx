import React, { useState } from 'react';
import { View, ScrollView, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import CustomText from '@/components/CustomText';
import Header from '@/components/Header';
import colors from '@/styles/colors';
import ConfirmPopup from '@/components/ConfirmPopup';
import CustomButton from '@/components/CustomButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

const CheckoutScreen = ({ navigation }: Props) => {

  const [popupVisible, setPopupVisible] = useState(false);

  const fakeCartData = [
    {
      id: 2,
      title: 'Product 2',
      price: 1200,
      availability: 15,
      imageUrl: 'https://reactnative.dev/img/tiny_logo.png',
      quantity: 2,
      checked: true,
    },
    {
      id: 4,
      title: 'Product 4',
      price: 499,
      availability: 20,
      imageUrl: 'https://reactnative.dev/img/tiny_logo.png',
      quantity: 3,
      checked: true,
    }
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
      <Header headerName="Checkout" previousPage="Landing" bgColor={colors.lightGray} />
      <ScrollView>
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <CustomText fontWeight='medium' fontSize={20}>Order Summary</CustomText>
        {/* Cart Items List */}
        {fakeCartData.map((item) => (
          <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
            <View style={{ flexDirection: 'row', height: 111, width: 350, borderRadius: 10, backgroundColor: colors.white, paddingLeft: 7, alignItems: 'center' }}>
              <Image style={{ height: 98, width: 79, borderRadius: 10 }} source={{ uri: item.imageUrl }} />
              <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 7 }}>
                  <View style={{ flex: 1, justifyContent: 'flex-start', paddingLeft: 5 }}>
                    <CustomText fontWeight="medium" fontSize={18}>{item.title}</CustomText>
                    <CustomText fontWeight="regular" fontSize={25}>฿ {item.price}</CustomText>
                  </View>
                  <View style={{ alignItems: 'flex-end'}}>
                      <CustomText fontWeight="regular" fontSize={20}>x{item.quantity}</CustomText>
                    </View>
              </View>
            </View>
          </View>
        ))}
        <View style={{ paddingVertical: 10 }}>
          <CustomText fontWeight='medium' fontSize={20}>Customer details</CustomText>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <CustomText fontWeight="regular" fontSize={14} style={{ color: '#9F9F9F' }}>Email address</CustomText>
          <CustomText fontWeight="light" fontSize={14}>paza@gmail.com</CustomText>
        </View>
        <View style={{ borderBottomColor: '#9F9F9F', borderBottomWidth: StyleSheet.hairlineWidth, paddingVertical: 10 }}/>
        <View style={{ paddingVertical: 10 }}>
          <CustomText fontWeight='medium' fontSize={20}>Payment</CustomText>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <CustomText fontWeight="regular" fontSize={14} style={{ color: '#9F9F9F' }}>Method</CustomText>
          <CustomText fontWeight="light" fontSize={14}>Credit card</CustomText>
        </View>
        <View style={{ borderBottomColor: '#9F9F9F', borderBottomWidth: StyleSheet.hairlineWidth, paddingVertical: 10 }}/>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
          <CustomText fontWeight="regular" fontSize={14} style={{ color: '#9F9F9F' }}>Subtotal</CustomText>
          <CustomText fontWeight="light" fontSize={14}>฿ 3897</CustomText>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
          <CustomText fontWeight="regular" fontSize={14} style={{ color: '#9F9F9F' }}>Shipping fee</CustomText>
          <CustomText fontWeight="light" fontSize={14}>Free</CustomText>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', paddingTop: 10 }}>
          <CustomText fontWeight="medium" fontSize={20}>Total</CustomText>
          <CustomText fontWeight="medium" fontSize={25}>฿ 3897</CustomText>
        </View>
      </View>
      </ScrollView>
      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 40 }}>
        <CustomButton text="Place Order" onPress={() => setPopupVisible(true)} />
      </View>
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