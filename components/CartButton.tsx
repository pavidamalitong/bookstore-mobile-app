import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import colors from '@/styles/colors';

interface CartButtonProps {
    bg_color: string;
    border_color: string;
    onPress: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({ bg_color, border_color, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.iconBtn, { backgroundColor: bg_color, borderColor: border_color }]}
            onPress={onPress}
        >
            <Feather name="shopping-cart" size={20} color={border_color} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    iconBtn: {
        width: 40,
        height: 40,
        borderWidth: 1,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default CartButton;
