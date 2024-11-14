import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

import Header from '../components/Header';
import colors from '@/styles/colors';
import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

const CartScreen = ({ navigation }: Props) => {
  return (
    <View style={{ flex: 1, backgroundColor: colors.lightGray }}>
      <Header headerName="Cart" previousPage="Landing" bgColor={colors.lightGray} />
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox checked={true} checkedColor={colors.darkPurple} uncheckedColor={colors.darkPurple}></CheckBox>
          <CustomText fontWeight='medium' fontSize={16} style={{ color: colors.darkPurple }}>Select all</CustomText>
        </View>
        {/* cart items */}
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <CheckBox checked={true} checkedColor={colors.darkPurple} uncheckedColor={colors.darkPurple}></CheckBox>
          <View style={{ flexDirection: 'row', height: 139, width: 315, borderRadius: 10, backgroundColor: colors.white, paddingLeft: 7, alignItems: 'center' }}>
            <Image style={{ height: 126, width: 102, borderRadius: 10 }} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png'}} />
            <View style={{ flex: 1, paddingHorizontal: 10, paddingVertical: 7 }}>
              <View style={{ flex: 1, flexDirection: 'row'}}>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                  <CustomText fontWeight='medium' fontSize={16}>Title</CustomText>
                  <CustomText fontWeight='regular' fontSize={20}>฿ 650</CustomText>
                  <CustomText fontWeight='light' fontSize={13}>Availability: 30</CustomText>
                </View>
                <View style={{ justifyContent: 'flex-start' }}>
                  <Icon name='trash' size={24} color={colors.darkPurple} />
                </View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingBottom: 5 }}>
                <TouchableOpacity style={styles.circleButton}><Icon name="minus" size={12} color={colors.white}/></TouchableOpacity>
                <View style={{width: 40, alignItems: 'center'}}><CustomText fontWeight='medium' fontSize={15}>1</CustomText></View>
                <TouchableOpacity style={styles.circleButton}><Icon name="plus" size={12} color={colors.white}/></TouchableOpacity>
              </View>
            </View>
          </View>
          
        </View>
      </View>
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
    marginBottom: 10
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
