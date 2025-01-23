import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {initializeFirestore, collection, addDoc} from 'firebase/firestore'
import app from './src/config/firebase.js'
import { launchImageLibrary } from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";


const ModPesquisas = (props) => {
    const [txtNome, setNome] = useState('');
    const [txtData, setData] = useState('');
    const [txtImg, setImg] = useState('')
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

    const db = initializeFirestore(app,{experimentalForceLongPolling: true})
    const NovPes = collection(db, "pesquisa")    

    const addPesquisa = () =>{
        const docPesquisa = {
            txtNome: txtNome,
            txtData: txtData,
            txtImg: txtImg

        }
        addDoc(NovPes, docPesquisa).then( (docRef) =>{
            console.log("Novo doc"+docRef.id)
        })
    }

    const pickImage = ()=>{
        launchImageLibrary({mediaType:'photo'}, (result)=>{
            convertUriToBase64(result.assets[0].uri)
        })

    }

       const convertUriToBase64 = async(uri)=>{
    
            const resizedImage = await ImageResizer.createResizedImage(
                uri, 
                700,
                700,
                'JPEG',
                100
            );
            const imageUri = await fetch(resizedImage.uri)
            const imagemBlob = await imageUri.blob()
            console.log(imagemBlob)
    
            const reader = new FileReader();
            reader.onloadend = () => {
                setImg(reader.result)
            };
            reader.readAsDataURL(imagemBlob);
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
                    right={<TextInput.Icon icon="calendar"/>}

                />

                <Text style={estilos.texto}>Imagem</Text>
                <Pressable    style={{
                      backgroundColor: 'white',
                     height: 38,
                    width: 270,
                    justifyContent: 'center',
                     alignItems: 'center'
                }}
                onPress={pickImage}
                >
                    <Icon name="image" size={35} color="purple" />
                </Pressable>
            </View>

            <TouchableOpacity style={estilos.botao} onPressIn={()=>{
                    addPesquisa();
                    goToHome();
                }}   >
                <Text style={estilos.textoBotao}>SALVAR</Text>
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
                    <Text style={estilos.texto2}>Tem certeza que deseja apagar a pesquisa?</Text>
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
        marginTop: 5,
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
        padding:7.5,
    },
    but2: {
        marginHorizontal: 2,
        backgroundColor: '#3f92c5',
        width: 100,
        height: 40,
        padding:7.5,
    },
    textoBut: {
        fontSize: 20,
        color: 'white',
        fontFamily: 'AveriaLibre-Regular',
        alignSelf: 'center',
    },
    texto2: {
        fontSize: 18,
        color: '#ffffff',
        fontFamily: 'AveriaLibre-Regular',
        textAlign: 'center',
        width: '100%',
        marginBottom: 1,
        paddingBottom:20
    },
});

export default ModPesquisas;