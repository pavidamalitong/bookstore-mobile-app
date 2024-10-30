import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import Screens
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import LandingScreen from './screens/LandingScreen';
import BookDetailScreen from './screens/BookDetailScreen';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';

export type RootStackParamList = {
  Signup: undefined;
  Login: undefined;
  Landing: undefined;
  BookDetail: { bookId: number };
  Cart: undefined;
  Checkout: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signup">
        {/* Auth Screens */}
        <Stack.Screen name="Signup" component={SignupScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        
        {/* Main Screens */}
        <Stack.Screen name="Landing" component={LandingScreen} options={{ headerTitle: 'Bookstore' }} />
        <Stack.Screen name="BookDetail" component={BookDetailScreen} options={{ headerTitle: 'Book Details' }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ headerTitle: 'Cart' }} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ headerTitle: 'Checkout' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
