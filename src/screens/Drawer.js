import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import Home from './Home';
import { useSelector } from 'react-redux';

const DrawerNavigator = createDrawerNavigator();

const Drawer = (props) => {

    const email = useSelector((state) => state.login.email)

    irParaLogin = () => {                           
        props.navigation.navigate('Login')          
    }

    return (
        <DrawerNavigator.Navigator drawerContent={(props) => (
            <View style={{ flex: 1 }}>
                <Text style={estilos.usuario}>{email}</Text>
                <View style={estilos.linhaSepara}/>
                <TouchableOpacity onPress={() => {props.navigation.navigate('Home');}} style={estilos.btnCima}>
                <Image source={require('../images/paper.png')} style={estilos.icone} />
                    <Text style={estilos.textTelas}>Pesquisas</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={irParaLogin}
                    style={estilos.btnBaixo}>
                    <Image source={require('../images/logout.png')} style={estilos.icone} />
                    <Text style={estilos.textTelas}>Sair</Text>
                </TouchableOpacity>
            </View>
        )} screenOptions={{drawerStyle: {backgroundColor: '#2B1D62'}, drawerLabelStyle: {color: '#FFFFFF'}, headerTitle: '', headerStyle: {backgroundColor: '#2B1D62'}, headerTintColor: '#FFFFFF'}}>
            <DrawerNavigator.Screen name='Home' component={Home} />
        </DrawerNavigator.Navigator>
    )
}


const estilos = StyleSheet.create({
    usuario: {
        color: '#FFFFFF',
        fontSize: 21,
        alignItems: 'center',
        padding: 30,
        paddingBottom: 15,
    },
    linhaSepara: {
        height: 2,
        backgroundColor: '#FFFFFF',
        width: '80%',
        alignSelf: 'center',
    },
    textTelas: {
        color: '#FFFFFF', 
        fontSize: 25,
    },
    btnCima: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30,
        paddingTop: 20,
    },
    btnBaixo: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 30,
        marginTop: 'auto',
    },
    icone: {
        marginRight: 10,
        width: 30,
        height: 30,
    }
});

export default Drawer;