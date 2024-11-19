import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

import Header from '../components/Header';
import colors from '@/styles/colors';
import CustomButton from '@/components/CustomButton';
import CustomText from '@/components/CustomText';

import { getDatabase, ref, remove, set, get } from 'firebase/database';
import { app } from '../FirebaseConfig'
import { AntDesign } from '@expo/vector-icons';

type Props = NativeStackScreenProps<RootStackParamList, 'Cart'>;

const CartScreen = ({ navigation }: Props) => {

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const userID = 'test123';

  const db = getDatabase(app);

  const fetchCartData = async () => {
    const cartRef = ref(db, `cart/${userID}`);

    try {
      const snapshot = await get(cartRef);
      const userCartData = snapshot.val();

      if (userCartData) {
        const items: any[] = [];

        for (const orderID of Object.keys(userCartData)) {
          const order = userCartData[orderID];
          const bookId = order.bookID;

          // Fetch book details
          const bookRef = ref(db, `books/${bookId}`);
          const bookSnapshot = await get(bookRef);
          const bookDetails = bookSnapshot.val();

          if (bookDetails) {
            items.push({
              id: orderID,
              bookId: bookId,
              quantity: order.amount,
              checked: false,
              title: bookDetails.Title,
              price: bookDetails.Price,
              availability: bookDetails.Amount,
              imageUrl: bookDetails.Thumbnail,
            });
          }
        }

        setCartItems(items);
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart data:', error);
    }
  };

  const increaseQuantity = async (orderID: string, currentQuantity: number, availability: number) => {
    if (currentQuantity < availability) {
      const orderRef = ref(db, `cart/${userID}/${orderID}/amount`);
      try {
        await set(orderRef, currentQuantity + 1);

        // Update the local state manually
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === orderID ? { ...item, quantity: item.quantity + 1 } : item
          )
        );
      } catch (error) {
        console.error('Error increasing quantity:', error);
      }
    }
  };

  const decreaseQuantity = async (orderID: string, currentQuantity: number, availability: number) => {
    if (currentQuantity > 1) {
      const orderRef = ref(db, `cart/${userID}/${orderID}/amount`);
      try {
        await set(orderRef, currentQuantity - 1);

        // Update the local state manually
        setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.id === orderID ? { ...item, quantity: item.quantity - 1 } : item
          )
        );
      } catch (error) {
        console.error('Error increasing quantity:', error);
      }
    }
  };

  const deleteItem = async (orderID: string) => {
    const orderRef = ref(db, `cart/${userID}/${orderID}`);
    try {
      // Delete from the backend first
      await remove(orderRef);

      // Remove the item from the front-end cartItems state
      const updatedCartItems = cartItems.filter(item => item.id !== orderID);
      setCartItems(updatedCartItems);

      // Check if all items are checked, and update selectAll if needed
      const allChecked = updatedCartItems.every(item => item.checked);
      setSelectAll(allChecked);

    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const toggleChecked = async (orderID: string) => {
    const updatedItems = cartItems.map((item) =>
      item.id === orderID && item.availability > 0
        ? { ...item, checked: !item.checked }
        : item
    );

    // Check if all items are checked
    const allChecked = updatedItems.every(item => item.availability <= 0 || item.checked);

    // Update state
    setCartItems(updatedItems);
    setSelectAll(allChecked);
  };

  const toggleSelectAll = async (isSelected: boolean) => {
    const updatedItems = cartItems.map((item) =>
      item.availability > 0 ? { ...item, checked: isSelected } : item
    );
    setSelectAll(isSelected);
    setCartItems(updatedItems);
  };

  const calculateTotalPrice = () => {
    return cartItems
      .filter((item) => item.checked)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Effect to Fetch Cart Data
  useEffect(() => {
    fetchCartData();
  }, [userID]);

  return (
    <SafeAreaView style={styles.container}>
      <Header headerName="Cart" previousPage="Landing" bgColor={colors.lightGray} />
      {cartItems.length > 0 ?
        <>
          <ScrollView>
            <View style={styles.cartContainer}>
              <View style={styles.selectAllContainer}>
                <CheckBox
                  checked={selectAll}
                  checkedColor={colors.darkPurple}
                  uncheckedColor={colors.darkPurple}
                  containerStyle={styles.checkBox}
                  onPress={() => {
                    toggleSelectAll(!selectAll);
                  }} />
                <CustomText fontWeight="medium" fontSize={16} style={styles.selectAllText}>Select all</CustomText>
              </View>

              {/* Cart Items List */}
              {cartItems.map((item) => (
                <View key={item.id} style={styles.cartItem}>
                  {item.availability > 0 ? (
                    <CheckBox
                      checked={item.checked}
                      checkedColor={colors.darkPurple}
                      uncheckedColor={colors.darkGray}
                      containerStyle={styles.checkBox}
                      onPress={() => toggleChecked(item.id)}
                    />
                  ) : (
                    <View style={{ width: 44 }} />
                  )}
                  <View style={styles.itemContainer}>
                    <Image style={styles.itemImage} source={{ uri: item.imageUrl }} />
                    <View style={styles.itemDetails}>
                      <View style={styles.itemHeader}>
                        <View style={styles.itemInfo}>
                          <CustomText fontWeight="medium" fontSize={16}>{item.title}</CustomText>
                          <CustomText fontWeight="regular" fontSize={20}>฿ {item.price}</CustomText>
                          {item.availability > 0 && <CustomText fontWeight="light" fontSize={13}>Availability: {item.availability}</CustomText>}
                        </View>
                        <TouchableOpacity onPress={() => deleteItem(item.id)}>
                          <Icon name="trash" size={24} color={colors.darkPurple} />
                        </TouchableOpacity>
                      </View>
                      <View style={styles.quantityContainer}>
                        {item.availability > 0 ? (
                          <>
                            <TouchableOpacity
                              disabled={item.quantity <= 1}
                              onPress={() => decreaseQuantity(item.id, item.quantity, item.availability)}
                            >
                              {item.quantity <= 1 ? (
                                <>
                                  <AntDesign name="minuscircle" size={22} color={colors.darkGray} />
                                </>
                              ) : (
                                <>
                                  <AntDesign name="minuscircle" size={22} color={colors.darkPurple} />
                                </>
                              )}
                            </TouchableOpacity>
                            <View style={styles.quantityText}>
                              <CustomText fontWeight="medium" fontSize={18} style={{ color: colors.darkPurple }}>{item.quantity}</CustomText>
                            </View>
                            <TouchableOpacity
                              disabled={item.quantity >= item.availability}
                              onPress={() => increaseQuantity(item.id, item.quantity, item.availability)}
                            >
                              {item.quantity >= item.availability ? (
                                <>
                                  <AntDesign name="pluscircle" size={24} color={colors.darkGray} />
                                </>
                              ) : (
                                <>
                                  <AntDesign name="pluscircle" size={24} color={colors.darkPurple} />
                                </>
                              )}
                            </TouchableOpacity>
                          </>
                        ) : (
                          <CustomText fontWeight="regular" fontSize={15} style={{ color: colors.red }}>Out of stock</CustomText>
                        )}
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
              <CustomText fontWeight="semiBold" fontSize={25}>฿ {calculateTotalPrice()}</CustomText>
            </View>
            <CustomButton
              text="Checkout"
              onPress={() => {
                const checkedItems = cartItems.filter(item => item.checked);
                const checkedOrderIDs = checkedItems.map(item => item.id);
                const totalPrice = calculateTotalPrice();

                // Navigate to CheckoutScreen and pass the checkedOrderIDs and totalPrice
                navigation.navigate('Checkout', {
                  checkedOrderIDs,
                  totalPrice,
                });
              }}
              disabled={cartItems.filter(item => item.checked).length === 0}
            />
          </View>
        </>
        :
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <CustomText fontWeight='semiBold' fontSize={26}>Your cart is empty</CustomText>
          <Icon name="shopping-cart" size={99} color={colors.black} style={{ paddingVertical: 30 }} />
          <TouchableOpacity
            style={styles.exploreBookContainer}
            onPress={() => navigation.navigate('Landing')}
          >
            <CustomText fontWeight="semiBold" fontSize={20} style={{ color: colors.black }}>Explore books</CustomText>
          </TouchableOpacity>
        </View>
      }
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
    height: '100%',
    width: 315,
    borderRadius: 10,
    backgroundColor: colors.white,
    paddingVertical: 7,
    paddingLeft: 7,
    alignItems: 'center',
  },
  itemImage: {
    height: '100%',
    width: 102,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    paddingHorizontal: 7,
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
  exploreBookContainer: {
    width: 186,
    height: 51,
    backgroundColor: colors.white,
    borderWidth: 3,
    borderColor: colors.black,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default CartScreen;
