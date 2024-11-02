import React from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

import CustomText from '@/components/CustomText';
import colors from '@/styles/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Landing'>;

const LandingScreen = ({ navigation }: Props) => {
  const books = [{ id: 1, title: 'Sample Book' }]; // Replace with real book data

  return (
    <View style={{ flex: 1, backgroundColor: colors.white }}>
      <CustomText>Landing Screen</CustomText>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Button
            title={item.title}
            onPress={() => navigation.navigate('BookDetail', { bookId: item.id })}
          />
        )}
      />
    </View>
  );
};

export default LandingScreen;