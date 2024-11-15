import React, { useState } from 'react';
import { View, ScrollView, Image, StyleSheet, SafeAreaView } from 'react-native';
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
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header headerName="Checkout" previousPage="Landing" bgColor={colors.lightGray} />
      <ScrollView>
        <CustomText fontWeight="medium" fontSize={20} style={{ paddingBottom: 10 }}>Order Summary</CustomText>
        {fakeCartData.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image style={styles.image} source={{ uri: item.imageUrl }} />
            <View style={styles.itemDetails}>
              <CustomText fontWeight="medium" fontSize={18}>{item.title}</CustomText>
              <CustomText fontWeight="regular" fontSize={25}>฿ {item.price}</CustomText>
              <CustomText fontWeight="regular" fontSize={20}>x{item.quantity}</CustomText>
            </View>
          </View>
        ))}

        <CustomText fontWeight="medium" fontSize={20} style={styles.sectionTitle}>Customer Details</CustomText>
        <View style={styles.row}>
          <CustomText fontWeight="regular" fontSize={14} style={styles.label}>Email address</CustomText>
          <CustomText fontWeight="light" fontSize={14}>paza@gmail.com</CustomText>
        </View>
        <View style={styles.separator} />

        <CustomText fontWeight="medium" fontSize={20} style={styles.sectionTitle}>Payment</CustomText>
        <View style={styles.row}>
          <CustomText fontWeight="regular" fontSize={14} style={styles.label}>Method</CustomText>
          <CustomText fontWeight="light" fontSize={14}>Credit card</CustomText>
        </View>
        <View style={styles.separator} />

        <View style={styles.row}>
          <CustomText fontWeight="regular" fontSize={14} style={styles.label}>Subtotal</CustomText>
          <CustomText fontWeight="light" fontSize={14}>฿ 3897</CustomText>
        </View>
        <View style={styles.row}>
          <CustomText fontWeight="regular" fontSize={14} style={styles.label}>Shipping fee</CustomText>
          <CustomText fontWeight="light" fontSize={14}>Free</CustomText>
        </View>
        <View style={styles.row}>
          <CustomText fontWeight="medium" fontSize={20}>Total</CustomText>
          <CustomText fontWeight="medium" fontSize={25}>฿ 3897</CustomText>
        </View>
      </ScrollView>

      <View style={styles.footer}>
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
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    height: 111,
    width: 350,
    borderRadius: 10,
    backgroundColor: colors.white,
    padding: 7,
  },
  image: {
    height: 98,
    width: 79,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  sectionTitle: {
    paddingVertical: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  label: {
    color: '#9F9F9F',
  },
  separator: {
    borderBottomColor: '#9F9F9F',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 10,
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
});

export default CheckoutScreen;
