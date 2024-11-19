import React, { useState } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Alert } from 'react-native';
import { getDatabase, ref, get, set, update } from 'firebase/database';
import { app } from '../FirebaseConfig';
import colors from '@/styles/colors';
import AntDesign from '@expo/vector-icons/AntDesign';

import CustomButton from './CustomButton';
import CustomText from './CustomText';

interface AddToCartProps {
    book: any;
    closeModal: () => void;
}

const AddToCart: React.FC<AddToCartProps> = ({ book, closeModal }) => {
    const [selectedAmount, setSelectedAmount] = useState(1)
    const userID = "test123" // mock user id for test

    const handleAddOrder = async () => {
        try {
            const db = getDatabase(app);
            const userCartRef = ref(db, `cart/${userID}`);

            // Retrieve current cart data
            const snapshot = await get(userCartRef);
            const currentOrders = snapshot.val();

            let orderUpdated = false;

            if (currentOrders) {
                // Check if the book already exists in the cart
                for (const orderID in currentOrders) {
                    if (currentOrders[orderID].bookID === book.id) {
                        const currentAmount = currentOrders[orderID].amount;
                        const updatedAmount = currentAmount + selectedAmount;

                        // Check if updated amount exceeds stock
                        if (updatedAmount > book.Amount) {
                            Alert.alert(
                                "Insufficient Stock",
                                `You can only add up to ${book.Amount - currentAmount} more copies of this book.`
                            );
                            return;
                        }

                        // Update the amount for the existing order
                        await update(ref(db, `cart/${userID}/${orderID}`), {
                            amount: updatedAmount,
                        });

                        orderUpdated = true;
                        break;
                    }
                }
            }

            // If no matching book was found, create a new order
            if (!orderUpdated) {
                // Find the next available order ID 
                const existingIDs = currentOrders
                    ? Object.keys(currentOrders).map(id => parseInt(id, 10))
                    : [];
                const nextOrderID = existingIDs.length > 0
                    ? Math.max(...existingIDs) + 1
                    : 1; 

                const newOrder = {
                    bookID: book.id,
                    amount: selectedAmount,
                };

                await set(ref(db, `cart/${userID}/${nextOrderID}`), newOrder);
            }

            Alert.alert("Success", "Item added to cart!");
            closeModal();
        } catch (error) {
            Alert.alert("Error", "Failed to add item to cart. Please try again.");
            console.error("Failed to add/update order:", error);
        }
    };


    if (!book) {
        return <CustomText style={{ color: 'red' }}>No book selected!</CustomText>;
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
                <CustomText fontSize={20} fontWeight='medium' style={{ textAlign: 'center' }}>Add to Cart</CustomText>
                <TouchableOpacity onPress={closeModal} style={{ marginLeft: 80, marginRight: 30 }}>
                    <AntDesign name="close" size={24} color={colors.black} />
                </TouchableOpacity>
            </View>
            <View style={styles.detailCon}>
                <Image
                    source={{ uri: book.Thumbnail }}
                    style={{ width: 92, height: 126, borderRadius: 10 }}
                />
                <View style={{ justifyContent: 'space-between', width: '65%' }}>
                    <View>
                        <CustomText fontSize={24} fontWeight='medium'>{book.Title}</CustomText>
                        <CustomText fontSize={24}>฿ {book.Price}</CustomText>
                        <CustomText fontSize={14} fontWeight='light'>Stock: {book.Amount}</CustomText>
                    </View>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            disabled={selectedAmount <= 1}
                            onPress={() => setSelectedAmount(selectedAmount - 1)}
                        >
                            {selectedAmount <= 1 ? (
                                <>
                                    <AntDesign name="minuscircle" size={24} color={colors.darkGray} />
                                </>
                            ) : (
                                <>
                                    <AntDesign name="minuscircle" size={24} color={colors.darkPurple} />
                                </>
                            )}

                        </TouchableOpacity>
                        <CustomText fontWeight="medium" fontSize={20} style={{ color: colors.darkPurple, marginHorizontal: 20 }}>{selectedAmount}</CustomText>
                        <TouchableOpacity
                            disabled={selectedAmount >= book.Amount}
                            onPress={() => setSelectedAmount(selectedAmount + 1)}
                        >
                            {selectedAmount >= book.Amount ? (
                                <>
                                    <AntDesign name="pluscircle" size={24} color={colors.darkGray} />
                                </>
                            ) : (
                                <>
                                    <AntDesign name="pluscircle" size={24} color={colors.darkPurple} />
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <CustomButton
                text='Add to Cart'
                onPress={() => handleAddOrder()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.white,
        width: '100%',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingBottom: 30,
        paddingTop: 20,
        shadowOffset: {
            width: 0,
            height: -4
        },
        shadowOpacity: 0.5,
        shadowRadius: 10
    },
    detailCon: {
        marginVertical: 20,
        paddingHorizontal: 35,
        flexDirection: 'row',
        gap: 20
    },
    quantityContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    }
});

export default AddToCart;
