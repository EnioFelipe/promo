import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';


const RecuperarSenha = (props) => {
    const [email, setEmail] = useState('');
    const [erro, setErro] = useState('');

    function validarEmail(email) {
        const valida = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return valida.test(email);
    }

    const irPara = () => {
        if (!validarEmail(email)) {
            setErro('E-mail e/ou senha inválidos.');
        } else {
            setErro('');
            props.navigation.navigate('Login');
        }
    };

    return ( 
        <View style={estilos.view}>
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

                <Text style={estilos.erro}>{erro}</Text>

                <TouchableOpacity style={estilos.botao} onPress={irPara}>
                    <Text style={estilos.textoBotao}>Recuperar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

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
        width: '70%',
        alignItems: 'center',
        marginTop: 20,
    },
    titulo: {
        fontSize: 30,
        color: 'white',
    },
    textContainer: {
        width: '70%',
        alignItems: 'right',
        marginTop: 20,
    },
    tituloInput: {
        color: 'white',
        fontSize: 20,
        marginBottom: 5,
        fontFamily: 'AveriaLibre-Regular',
    },
    textInput: {
        width: '100%',
        height: 35,
        marginBottom: 4,
        color: '#3F92C5',
    },
    erro: {
        color: 'red',
        marginBottom: 10,
        fontFamily: 'AveriaLibre-Regular',
    },
    botao: {
        width: '70%',
        height: 35,
        backgroundColor: '#37BD6D',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 10,
    },
    textoBotao: {
        color: 'white',
        fontSize: 20,
    },
});

export default RecuperarSenha;