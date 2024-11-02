import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import CustomText from '@/components/CustomText';

type Props = NativeStackScreenProps<RootStackParamList, 'Success'>;

const SuccessScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Success Screen</CustomText>
      <Button title="Go to Landing" onPress={() => navigation.replace('Landing')} />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default SuccessScreen;