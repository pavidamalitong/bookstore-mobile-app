import React from 'react';
import { View, Text, Button } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'BookDetail'>;

const BookDetailScreen = ({ route, navigation }: Props) => {
  const { bookId } = route.params;

  return (
    <View>
      <Text>Book Detail Screen for Book ID: {bookId}</Text>
      <Button title="Add to Cart" onPress={() => navigation.navigate('Cart')} />
    </View>
  );
};

export default BookDetailScreen;