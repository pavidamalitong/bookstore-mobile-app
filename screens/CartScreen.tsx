import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

import Header from '../components/Header';
import colors from '@/styles/colors';
import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

const fakeCartData = [
  {
    id: 1,
    title: 'Product 1',
    price: 650,
    availability: 30,
    imageUrl: 'https://reactnative.dev/img/tiny_logo.png',
    quantity: 1,
    checked: false,
  },
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
    id: 3,
    title: 'Product 3',
    price: 850,
    availability: 50,
    imageUrl: 'https://reactnative.dev/img/tiny_logo.png',
    quantity: 1,
    checked: false,
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
  {
    id: 5,
    title: 'Product 5',
    price: 999,
    availability: 10,
    imageUrl: 'https://reactnative.dev/img/tiny_logo.png',
    quantity: 1,
    checked: false,
  },
];

const CartScreen = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
      <Header headerName="Cart" previousPage="Landing" bgColor={colors.lightGray} />
      <ScrollView>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox checked={true} checkedColor={colors.darkPurple} uncheckedColor={colors.darkPurple} containerStyle={{ paddingRight: 0 }}></CheckBox>
          <CustomText fontWeight='medium' fontSize={16} style={{ color: colors.darkPurple }}>Select all</CustomText>
        </View>
        {/* Cart Items List */}
        {fakeCartData.map((item) => (
          <View key={item.id} style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 5 }}>
            <CheckBox
              checked={item.checked}
              checkedColor={colors.darkPurple}
              uncheckedColor={colors.darkGray}
              containerStyle={{ paddingRight: 0 }}
            />
            <View style={{ flexDirection: 'row', height: 139, width: 315, borderRadius: 10, backgroundColor: colors.white, paddingLeft: 7, alignItems: 'center' }}>
              <Image style={{ height: 126, width: 102, borderRadius: 10 }} source={{ uri: item.imageUrl }} />
              <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 7 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                    <CustomText fontWeight="medium" fontSize={16}>{item.title}</CustomText>
                    <CustomText fontWeight="regular" fontSize={20}>฿ {item.price}</CustomText>
                    <CustomText fontWeight="light" fontSize={13}>Availability: {item.availability}</CustomText>
                  </View>
                  <TouchableOpacity>
                    <Icon name="trash" size={24} color={colors.darkPurple} />
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 5 }}>
                  <TouchableOpacity style={styles.circleButton}><Icon name="minus" size={12} color={colors.white} /></TouchableOpacity>
                  <View style={{ width: 40, alignItems: 'center' }}><CustomText fontWeight="medium" fontSize={15}>{item.quantity}</CustomText></View>
                  <TouchableOpacity style={styles.circleButton}><Icon name="plus" size={12} color={colors.white} /></TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        ))}
      </View>
      </ScrollView>
      <View style={{ flex: 1, justifyContent: 'flex-end', paddingBottom: 40 }}>
        <View style={styles.total}>
          <CustomText fontWeight='medium' fontSize={20}>Total</CustomText>
          <CustomText fontWeight='semiBold' fontSize={25}>฿ 650</CustomText>
        </View>
        <CustomButton text="Checkout" onPress={() => navigation.navigate('Checkout')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  total: {
    flexDirection: 'row',
    width: 320,
    height: 43,
    alignSelf: 'center',
    borderWidth: 2,
    borderColor: colors.black,
    borderRadius: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: colors.white
  },
  circleButton: {
    width: 22.5,
    height: 22.5,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkPurple,
  },
});

export default CartScreen;
