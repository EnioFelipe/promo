// https://temp-mail.org/pt/view/67927c2f7ce47b006ae8c74b

import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth_mod } from './src/config/firebase';

function validarEmail(email) {
    const valida = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return valida.test(email);
}

const Login = (props) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [repet, setRepet] = useState('');
    const [erro, setErro] = useState('');

    const novaConta = () => {
        if (!validarEmail(email)) {
            setErro('E-mail inválido.');
            return;
        }
        if (!email || !senha) {
            setErro('Todos os campos devem ser preenchidos');
            return;
        }
        if (senha !== repet) {
            setErro('O campo repetir senha difere da senha');
        }
        createUserWithEmailAndPassword (auth_mod, email, senha)
        .then((novoUsuario) => {
            console.log("Usuário criado com sucesso: " + JSON.stringify(novoUsuario));
            props.navigation.navigate('Login');
        })
        .catch((erro) => {
            console.log("Algum erro ocorreu: " + JSON.stringify(erro));
        })
    }

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

                <Text style={estilos.tituloInput}>Senha</Text>
                <TextInput
                    value={senha}
                    onChangeText={setSenha}
                    secureTextEntry={true}
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
                <Text style={estilos.tituloInput}>Repetir senha</Text>
                <TextInput
                    value={repet}
                    onChangeText={setRepet}
                    secureTextEntry={true}
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
                <View style={{ height: 30, width: '100%' }}>
                    {erro ? <Text style={estilos.erroText}>{erro}</Text> : null}
                </View>
            </View>
            <TouchableOpacity 
                onPress={novaConta}  
                style={estilos.botaoE}
            >
                <Text style={estilos.botaoText}>CADASTRAR</Text>
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
    textContainer: {
        width: '70%',
        alignItems: 'center',
        marginTop: 20,
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
