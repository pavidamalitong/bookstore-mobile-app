import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
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
  { id: 1, title: 'Product 1', price: 650, availability: 30, imageUrl: 'https://reactnative.dev/img/tiny_logo.png', quantity: 1, checked: false },
  { id: 2, title: 'Product 2', price: 1200, availability: 0, imageUrl: 'https://reactnative.dev/img/tiny_logo.png', quantity: 2, checked: true },
  { id: 3, title: 'Product 3', price: 850, availability: 50, imageUrl: 'https://reactnative.dev/img/tiny_logo.png', quantity: 1, checked: false },
  { id: 4, title: 'Product 4', price: 499, availability: 20, imageUrl: 'https://reactnative.dev/img/tiny_logo.png', quantity: 3, checked: true },
  { id: 5, title: 'Product 5', price: 999, availability: 10, imageUrl: 'https://reactnative.dev/img/tiny_logo.png', quantity: 1, checked: false },
];

const CartScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header headerName="Cart" previousPage="Landing" bgColor={colors.lightGray} />
      <ScrollView>
        <View style={styles.cartContainer}>
          <View style={styles.selectAllContainer}>
            <CheckBox checked={true} checkedColor={colors.darkPurple} uncheckedColor={colors.darkPurple} containerStyle={styles.checkBox} />
            <CustomText fontWeight="medium" fontSize={16} style={styles.selectAllText}>Select all</CustomText>
          </View>

          {/* Cart Items List */}
          {fakeCartData.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              {item.availability > 0 ?
              <CheckBox
                checked={item.checked}
                checkedColor={colors.darkPurple}
                uncheckedColor={colors.darkGray}
                containerStyle={styles.checkBox}
              />
              : <View style={{width: 44}} />}
              <View style={styles.itemContainer}>
                <Image style={styles.itemImage} source={{ uri: item.imageUrl }} />
                <View style={styles.itemDetails}>
                  <View style={styles.itemHeader}>
                    <View style={styles.itemInfo}>
                      <CustomText fontWeight="medium" fontSize={16}>{item.title}</CustomText>
                      <CustomText fontWeight="regular" fontSize={20}>฿ {item.price}</CustomText>
                      {item.availability > 0 && <CustomText fontWeight="light" fontSize={13}>Availability: {item.availability}</CustomText>}
                    </View>
                    <TouchableOpacity>
                      <Icon name="trash" size={24} color={colors.darkPurple} />
                    </TouchableOpacity>
                  </View>
                  <View style={styles.quantityContainer}>
                    {item.availability > 0 ?
                    <>
                      <TouchableOpacity style={styles.circleButton}>
                        <Icon name="minus" size={12} color={colors.white} />
                      </TouchableOpacity>
                      <View style={styles.quantityText}>
                        <CustomText fontWeight="medium" fontSize={15}>{item.quantity}</CustomText>
                      </View>
                      <TouchableOpacity style={styles.circleButton}>
                          <Icon name="plus" size={12} color={colors.white} />
                      </TouchableOpacity>
                    </> :
                    <CustomText fontWeight='regular' fontSize={15} style={{ color: '#F71212'}}>Out of stock</CustomText>}
                  </View>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalContainer}>
          <CustomText fontWeight="medium" fontSize={20}>Total</CustomText>
          <CustomText fontWeight="semiBold" fontSize={25}>฿ 650</CustomText>
        </View>
        <CustomButton text="Checkout" onPress={() => navigation.navigate('Checkout')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGray,
    flex: 1,
    alignItems: 'center',
  },
  cartContainer: {
    flex: 1,
  },
  selectAllContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.lightGray,
    paddingVertical: 5,
  },
  checkBox: {
    padding: 0,
  },
  selectAllText: {
    color: colors.darkPurple,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  itemContainer: {
    flexDirection: 'row',
    height: 139,
    width: 315,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingLeft: 7,
    alignItems: 'center',
  },
  itemImage: {
    height: 126,
    width: 102,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 7,
  },
  itemHeader: {
    flexDirection: 'row',
    flex: 1,
  },
  itemInfo: {
    flex: 1,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingBottom: 5,
  },
  circleButton: {
    width: 22.5,
    height: 22.5,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.darkPurple,
  },
  quantityText: {
    width: 40,
    alignItems: 'center',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 40,
  },
  totalContainer: {
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
    backgroundColor: colors.white,
  },
});

export default CartScreen;
