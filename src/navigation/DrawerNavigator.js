import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../screens/Home';
import NovaPesquisa from '../screens/NovaPesquisa';
import Relatorio from '../screens/Relatorio';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#6200EE',
        },
        headerTintColor: '#fff',
        drawerActiveTintColor: '#6200EE',
      }}
    >
      <Drawer.Screen name="Home" component={Home} options={{ title: 'Minhas Pesquisas' }} />
      <Drawer.Screen name="NovaPesquisa" component={NovaPesquisa} options={{ title: 'Nova Pesquisa' }} />
      <Drawer.Screen name="Relatorio" component={Relatorio} options={{ title: 'Relatórios' }} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;