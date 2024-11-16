import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image, StyleSheet, SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import CustomText from '@/components/CustomText';
import Header from '@/components/Header';
import colors from '@/styles/colors';
import ConfirmPopup from '@/components/ConfirmPopup';
import CustomButton from '@/components/CustomButton';

import { getDatabase, ref, onValue, DataSnapshot, remove, set } from 'firebase/database';
import { app } from '../FirebaseConfig'

type Props = NativeStackScreenProps<RootStackParamList, 'Checkout'>;

const CheckoutScreen = ({ route, navigation }: Props) => {
  const { checkedOrderIDs, totalPrice } = route.params;
  const userID = 'userID';
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [popupVisible, setPopupVisible] = useState(false);

  const db = getDatabase(app);

  const fetchCartData = () => {
    const cartRef = ref(db, `cart/${userID}`);
  
    // Fetch cart data
    onValue(cartRef, async (snapshot) => {
      try {
        const userCartData = snapshot.val();
        if (!userCartData) {
          console.log('No cart data found.');
          setCartItems([]);
          return;
        }
  
        const items: any[] = [];
  
        // Iterate through each orderID under the current user
        for (const orderID of checkedOrderIDs) {
          try {
            const order = userCartData[orderID];
            if (!order || !order.bookID) {
              console.log(`Order ID ${orderID} not found in cart data.`);
              continue;
            }
  
            // Correct property name from 'orderbookID' to 'bookID'
            const bookId = order.bookID;
            if (!bookId) {
              console.log(`No book ID found for order ID ${orderID}.`);
              continue;
            }
  
            // Fetch book details
            const bookRef = ref(db, `books/${bookId}`);
            const bookSnapshot = await new Promise<DataSnapshot>((resolve, reject) => {
              onValue(
                bookRef,
                (snapshot) => resolve(snapshot),
                (error) => reject(error),
                { onlyOnce: true }
              );
            });
  
            const bookDetails = bookSnapshot.val();
            if (!bookDetails) {
              console.log(`No book details found for book ID ${bookId}.`);
              continue;
            }
  
            // Merge book details with cart item data
            items.push({
              id: orderID,
              bookID: bookId,
              quantity: order.amount,
              title: bookDetails.Title,
              price: bookDetails.Price,
              imageUrl: bookDetails.Thumbnail,
            });
          } catch (error) {
            console.error(`Error processing order ID ${orderID}:`, error);
          }
        }
  
        setCartItems(items);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    });
  };  

  const handleCheckout = async () => {
    try {
      for (const order of cartItems) {
        try {
          const bookId = order.bookID;
          if (!bookId) {
            console.log(`Missing bookID for order ID: ${order.id}`);
            continue;
          }
          const orderQuantity = order.quantity;
  
          // Fetch the current stock of the book
          const bookRef = ref(db, `books/${bookId}`);
          const bookSnapshot = await new Promise<DataSnapshot>((resolve, reject) => {
            onValue(
              bookRef,
              (snapshot) => resolve(snapshot),
              (error) => reject(error),
              { onlyOnce: true }
            );
          });
  
          const bookData = bookSnapshot.val();
          if (!bookData) {
            console.log(`No data found for book ID: ${bookId}`);
            continue;
          }
  
          const currentStock = Number(bookData.Amount);
          const orderQty = Number(orderQuantity);
  
          // Update the stock in the database
          const newStock = currentStock - orderQty;
          if (newStock < 0) {
            console.log(`Insufficient stock for book ID: ${bookId}`);
            continue;
          }
  
          const updatedBookData = {
            ...bookData,
            Amount: newStock,
            ...(newStock === 0 && { OutOfStock: "TRUE" }),
          };
  
          await set(bookRef, updatedBookData);
          console.log(`Updated stock for book ID: ${bookId} to ${newStock}`);
        } catch (error) {
          console.error(`Error updating stock for order:`, error);
        }
      }
  
      // Delete all checked orders from the cart
      for (const orderID of checkedOrderIDs) {
        try {
          const orderRef = ref(db, `cart/${userID}/${orderID}`);
          await remove(orderRef);
          console.log(`Deleted order ID: ${orderID}`);
        } catch (error) {
          console.error(`Error deleting order ID ${orderID}:`, error);
        }
      }
  
      navigation.navigate('Success');
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };  

    // Effect to Fetch Cart Data
    useEffect(() => {
      fetchCartData();
    }, []);  

  return (
    <SafeAreaView style={styles.container}>
      <Header headerName="Checkout" previousPage="Landing" bgColor={colors.lightGray} />
      <ScrollView>
        <CustomText fontWeight="medium" fontSize={20} style={{ paddingBottom: 10 }}>Order Summary</CustomText>
        {cartItems.map((item) => (
          <View key={item.id} style={styles.itemContainer}>
            <Image style={styles.image} source={{ uri: item.imageUrl }} />
            <View style={styles.itemDetails}>
              <CustomText fontWeight="medium" fontSize={18}>{item.title}</CustomText>
              <CustomText fontWeight="regular" fontSize={25}>฿ {item.price}</CustomText>
              <CustomText fontWeight="regular" fontSize={20} style={{ alignSelf: 'flex-end'}}>x{item.quantity}</CustomText>
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
          <CustomText fontWeight="light" fontSize={14}>฿ {totalPrice}</CustomText>
        </View>
        <View style={styles.row}>
          <CustomText fontWeight="regular" fontSize={14} style={styles.label}>Shipping fee</CustomText>
          <CustomText fontWeight="light" fontSize={14}>Free</CustomText>
        </View>
        <View style={styles.row}>
          <CustomText fontWeight="medium" fontSize={20}>Total</CustomText>
          <CustomText fontWeight="medium" fontSize={25}>฿ {totalPrice}</CustomText>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <CustomButton text="Place Order" onPress={() => setPopupVisible(true)} />
      </View>

      <ConfirmPopup
        visible={popupVisible}
        onCancel={() => setPopupVisible(false)}
        onConfirm={async () => {
          setPopupVisible(false);
          await handleCheckout();
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
    minHeight: 111,
    minWidth: 350,
    borderRadius: 10,
    backgroundColor: colors.white,
    padding: 7,
  },
  image: {
    height: '100%',
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
