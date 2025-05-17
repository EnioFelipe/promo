import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import DrawerNavigator from './DrawerNavigator';
import Login from '../screens/Login';
import CriarConta from '../screens/CriarConta';
import RecuperarSenha from '../screens/RecuperarSenha';
import AcoesPesquisa from '../screens/AcoesPesquisa';
import ModificarPesquisa from '../screens/ModificarPesquisa';
import ColetaSatisfacao from '../screens/ColetaSatisfacao';
import Agradecimentos from '../screens/Agradecimentos';

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="DrawerHome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="DrawerHome" component={DrawerNavigator} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="CriarConta" component={CriarConta} />
      <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
      <Stack.Screen name="AcoesPesquisa" component={AcoesPesquisa} />
      <Stack.Screen name="ModificarPesquisa" component={ModificarPesquisa} />
      <Stack.Screen name="ColetaSatisfacao" component={ColetaSatisfacao} />
      <Stack.Screen name="Agradecimentos" component={Agradecimentos} />
    </Stack.Navigator>
  );
};

export default StackNavigator;