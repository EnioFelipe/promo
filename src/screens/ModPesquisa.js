
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { useState } from "react";
import { TextInput, IconButton } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';

const ModPesquisa = (props) => {
    const [txtNome, setNome] = useState('');
    const [txtData, setData] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const goToHome = () => {
        props.navigation.navigate('Home');
    };

    const showModal = () => {
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    return (
        <View style={estilos.view}>
            <View style={estilos.textContainer}>
                <Text style={estilos.texto}>Nome</Text>
                <TextInput
                    value={txtNome}
                    onChangeText={setNome}
                    style={estilos.input}
                    mode="outlined"
                    theme={{
                        colors: {
                            primary: '#3F92C5',
                            background: 'white',
                            placeholder: '#3F92C5',
                        },
                    }}
                />

                <Text style={estilos.texto}>Data</Text>
                <View style={estilos.inputContainer}>
                    <TextInput
                        value={txtData}
                        onChangeText={setData}
                        style={estilos.input}
                        mode="outlined"
                        theme={{
                            colors: {
                                primary: '#3F92C5',
                                background: 'white',
                                placeholder: '#3F92C5',
                            },
                        }}
                    />
                    <IconButton
                        icon="celebration"
                        size={25}
                        color="#D3D3D3"
                        onPress={() => {}}
                        style={estilos.iconButton}
                    />
                </View>

                <Text style={estilos.texto}>Imagem</Text>
                <TextInput
                    style={estilos.inputImage}
                    mode="outlined"
                    placeholder="Câmera/Galeria de imagens"
                    theme={{
                        colors: {
                            primary: '#3F92C5',
                            background: 'white',
                            placeholder: '#3F92C5',
                        },
                    }}
                />
            </View>

            <TouchableOpacity style={estilos.botao} onPress={goToHome}>
                <Text style={estilos.textoBotao}>CADASTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={estilos.iconContainer} onPress={showModal}>
                <Icon name="delete-outline" size={50} color="#FFFFFF" />
                <Text style={estilos.textoIcon}>Apagar</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={closeModal}
            >
                <View style={estilos.modalContainer}>
                    <Text style={estilos.texto}>Tem certeza que deseja apagar a pesquisa?</Text>
                    <View style={estilos.butContainer}>
                        <TouchableOpacity style={estilos.but1} onPress={goToHome}>
                            <Text style={estilos.textoBut}>Sim</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={estilos.but2} onPress={closeModal}>
                            <Text style={estilos.textoBut}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const estilos = StyleSheet.create({
    view: {
        padding: 5,
        backgroundColor: '#372775',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        width: '70%',
        alignItems: 'center',
    },
    texto: {
        fontSize: 18,
        color: '#ffffff',
        fontFamily: 'AveriaLibre-Regular',
        textAlign: 'left',
        width: '100%',
        marginBottom: 1
    },
    textoBotao: {
        fontSize: 17,
        fontFamily: 'AveriaLibre-Regular',
        textAlign: 'center',
        color: '#FFFFFF'
    },
    botao: {
        marginTop: 20,
        width: '70%',
        backgroundColor: '#49B976',
        borderColor: '#37BD6D',
    },
    input: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        height: 35,
    },
    inputImage: {
        color: '#939393',
        alignSelf: 'flex-start',
        textAlign: 'center',
        width: '50%',
        height: 50,
        backgroundColor: '#FFFFFF',
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        position: 'absolute',
        right: 10,
    },
    iconContainer: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        alignItems: 'center',
    },
    textoIcon: {
        fontSize: 14,
        color: '#FFFFFF',
        fontFamily: 'AveriaLibre-Regular',
        marginTop: 5, // Espaço entre o ícone e o texto
    },
    modalContainer: {
        width: 300,
        height: 200,
        borderWidth: 2,
        borderColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#372775',
        alignSelf: 'center',
        marginTop: 60,
    },
    butContainer: {
        flexDirection: 'row',
    },
    but1: {
        marginHorizontal: 2,
        backgroundColor: '#ff8383',
        width: 100,
        height: 40,
    },
    but2: {
        marginHorizontal: 2,
        backgroundColor: '#3f92c5',
        width: 100,
        height: 40,
    },
    textoBut: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'AveriaLibre-Regular',
        alignSelf: 'center',
    },
});

export default ModPesquisa;
