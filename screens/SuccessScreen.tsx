import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type Props = NativeStackScreenProps<RootStackParamList, 'Success'>;

const SuccessScreen: React.FC<Props> = ({ navigation }) => {
  const handleBackToHome = () => {
    navigation.navigate('Landing');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Successfully purchased</Text>
      <Text style={styles.message}>
        Your order has been placed.{"\n"}Thank you for shopping with us!
      </Text>
      <TouchableOpacity style={styles.button} onPress={handleBackToHome}>
        <Text style={styles.buttonText}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 40,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    borderWidth: 2,
    borderColor: '#333',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});

export default SuccessScreen;
