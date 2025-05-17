import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import StackNavigator from './src/navigation/StackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#6200EE" barStyle="light-content" />
      <StackNavigator />
    </NavigationContainer>
  );
}
