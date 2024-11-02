import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import CustomText from '@/components/CustomText';
import colors from '@/styles/colors';

type Props = NativeStackScreenProps<RootStackParamList, 'Signup'>;

const SignupScreen = ({ navigation }: Props) => {
  return (
    <View style={styles.container}>
      <CustomText style={styles.title}>Signup Screen</CustomText>
      <Button title="Go to Login" onPress={() => navigation.navigate('Login')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.lightPurple,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default SignupScreen;
