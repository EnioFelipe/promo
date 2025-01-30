import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
<<<<<<< HEAD
import Drawer from './Drawer';
import { useDispatch } from 'react-redux';
import { reducerSetLogin } from '../redux/loginSlice';
=======

>>>>>>> 2581f3346d3b7c2f4c28e8a6460aa533833d74a4

function validarEmail(email) {
    const valida = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return valida.test(email);
}

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [erro, setErro] = useState('');
    
    const dispatch = useDispatch()

    const irPara = () => {      
        if (!validarEmail(email)) {
            setErro('E-mail e/ou senha inválidos.');
        } else {
            setErro('');
            dispatch(reducerSetLogin({ email: email}));
            props.navigation.navigate('Drawer');
        }
    };

    return (
        <View style={estilos.view}>
            <View style={estilos.container}>
                <View style={estilos.viewTitulo}>
                    <Text style={estilos.titulo}>Satisfying.you</Text>
                </View>
                <View style={estilos.viewIcon}>
                    <Icon name="sentiment-satisfied" size={32} color="#FFFFFF" />
                </View>
            </View>

            <View style={estilos.textContainer}>
                <Text style={estilos.tituloInput}>E-mail</Text>
                <TextInput
                    value={email}
                    onChangeText={setEmail}
                    style={estilos.textInput}
                    mode="outlined"
                    theme={{
                        colors: {
                            primary: '#3F92C5',
                            background: 'white',
                            placeholder: '#3F92C5',
                        },
                    }}
                />

                <Text style={estilos.tituloInput}>Senha</Text>
                <TextInput
                    value={senha}
                    onChangeText={setSenha}
                    style={estilos.textInput}
                    mode="outlined"
                    theme={{
                        colors: {
                            primary: '#3F92C5',
                            background: 'white',
                            placeholder: '#3F92C5',
                        },
                    }}
                />
                <View style={{
                    height: 30, width: '100%'}}>
                    {erro ? <Text style={estilos.erroText}>{erro}</Text> : null}
                </View>
            </View>
            <TouchableOpacity
                onPress={irPara}
                style={estilos.botaoE}>
                <Text style={estilos.botaoText}>Entrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('NovaConta')}
                style={estilos.botaoC}>
                <Text style={estilos.botaoText}>Criar minha conta</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => props.navigation.navigate('RecuperarSenha')}
                style={estilos.botaoR}>
                <Text style={estilos.botaoText}>Esqueci minha senha</Text>
            </TouchableOpacity>
        </View>
    );
};

const estilos = StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        padding: 5,
        backgroundColor: '#372775',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        marginTop: 10,
    },
    viewTitulo: {
        alignItems: 'center',
    },
    viewIcon: {
        marginLeft: 20,
    },
    titulo: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 32,
        fontWeight: '400',
        lineHeight: 30,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    textContainer: {
        width: '70%',
        alignItems: 'center',
    },
    textInput: {
        width: '100%',
        height: 35,
        marginBottom: 4,
        color: '#3F92C5',
    },
    tituloInput: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'left',
        marginBottom: 1,
        width: '100%',

    },
    botaoE: {
        width: '70%',
        height: 35,
        marginBottom: 17,
        backgroundColor: '#37BD6D',
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoText: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 17,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    botaoC: {
        width: '70%',
        height: 22,
        marginBottom: 3,
        marginTop: 19,
        backgroundColor: '#3F92C5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    botaoR: {
        width: '70%',
        height: 22,
        marginBottom: 7,
        marginTop: 3,
        backgroundColor: '#B0B0B0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    erroText: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 12,
        color: '#FF6B6B',
        textAlign: 'left',
        marginTop: 0,
        marginBottom: 10,
        width: '100%',
    },
});

export default Login;
