import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { collection, addDoc, getFirestore, getDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { app } from './src/config/firebase.js';
import { storage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { launchImageLibrary } from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import { useSelector } from 'react-redux';

const ModPesquisas = (props) => {
    const id = useSelector((state) => state.pesquisa.id);
    const pesquisa = useSelector((state) => state.pesquisa);
    const [novoNome, setNovoNome] = useState(pesquisa.nome || '');
    const [novaData, setNovaData] = useState(pesquisa.data || '');
    const [nomePesquisaError, setNomePesquisaError] = useState('');
    const [dataPesquisaError, setDataPesquisaError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);

    const db = getFirestore(app);

    const goToHome = () => {
        props.navigation.navigate('Home');
    };

    const mostrarModal = () => {
        setModalVisible(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
    };

    const pickImage = () => {
        launchImageLibrary({ mediaType: 'photo' }, (result) => {
            if (!result.didCancel && !result.errorCode && result.assets && result.assets.length > 0) {
                setImage(result.assets[0]); // Armazena a imagem selecionada no estado
                console.log("Imagem selecionada:", result.assets[0]); // Verifique no console
            }
        });
    };

    const convertUriToBase64 = async (uri) => {
        try {
            const resizedImage = await ImageResizer.createResizedImage(uri, 700, 700, 'JPEG', 100);
            const imageUri = await fetch(resizedImage.uri);
            const imagemBlob = await imageUri.blob();

            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result.split(',')[1]); // Remove o prefixo "data:image/jpeg;base64,"
                reader.onerror = (error) => reject(error);
                reader.readAsDataURL(imagemBlob);
            });
        } catch (error) {
            console.error("Erro ao converter imagem para Base64: ", error);
            return null;
        }
    };

    const editarPesquisa = async (id, novoNome, novaData, image) => {
        if (!novoNome.trim()) {
            setNomePesquisaError('Preencha o nome da pesquisa');
            return;
        }
        if (!novaData.trim()) {
            setDataPesquisaError('Preencha a data da pesquisa');
            return;
        }

        try {
            let base64Image = null;

            if (image) {
                base64Image = await convertUriToBase64(image.uri);
                if (!base64Image) {
                    console.error("Erro na conversão da imagem para Base64.");
                    return;
                }
            }

            const pesRef = doc(db, "pesquisas", id);
            const pesquisaDoc = await getDoc(pesRef);

            if (pesquisaDoc.exists()) {
                const novaPesquisa = {
                    nome: novoNome,
                    data: novaData,
                    imagem: base64Image || pesquisaDoc.data().imagem, // Certifique-se de que o nome da propriedade está correto
                };

                await updateDoc(pesRef, novaPesquisa);
                console.log("Pesquisa atualizada com sucesso!");
                goToHome();
            } else {
                console.error("Documento não encontrado");
            }
        } catch (error) {
            console.error("Erro ao modificar a pesquisa: ", error);
        }
    };
    const deletarPesquisa = async (id) => {
        const docRef = doc(db, "pesquisas", id); // Referência ao documento no Firestore
    
        try {
            // Obtém o documento da pesquisa
            const docSnap = await getDoc(docRef);
    
            if (docSnap.exists()) {
                const data = docSnap.data();
                const imageUrl = data.imagem; // URL da imagem no Firestore
    
                // Verifica se a imagem existe e tenta deletá-la do Storage
                if (imageUrl) {
                    try {
                        // Cria uma referência para a imagem no Storage
                        const imageRef = ref(storage, imageUrl);
    
                        // Deleta a imagem do Storage
                        await deleteObject(imageRef);
                        console.log('Imagem deletada com sucesso do Storage.');
                    } catch (error) {
                        console.error('Erro ao deletar a imagem do Storage:', error);
                    }
                }
    
                // Deleta o documento do Firestore
                await deleteDoc(docRef);
                console.log('Documento deletado com sucesso do Firestore.');
    
                // Navega de volta para a tela inicial
                goToHome();
            } else {
                console.log("Documento não encontrado no Firestore!");
            }
        } catch (error) {
            console.error('Erro ao deletar a pesquisa:', error);
        }
    };

    return (
        <View style={estilos.view}>
            <View style={estilos.textContainer}>
                <Text style={estilos.texto}>Nome</Text>
                <TextInput
                    value={novoNome}
                    onChangeText={(text) => {
                        setNovoNome(text);
                        setNomePesquisaError('');
                    }}
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
                {nomePesquisaError ? <Text style={estilos.erro}>{nomePesquisaError}</Text> : null}

                <Text style={estilos.texto}>Data</Text>
                <TextInput
                    value={novaData}
                    onChangeText={(text) => {
                        setNovaData(text);
                        setDataPesquisaError('');
                    }}
                    style={estilos.input}
                    mode="outlined"
                    theme={{
                        colors: {
                            primary: '#3F92C5',
                            background: 'white',
                            placeholder: '#3F92C5',
                        },
                    }}
                    right={<TextInput.Icon icon="calendar" />}
                />
                {dataPesquisaError ? <Text style={estilos.erro}>{dataPesquisaError}</Text> : null}

                <Text style={estilos.texto}>Imagem</Text>
                <Pressable
                    style={{
                        backgroundColor: 'white',
                        height: 38,
                        width: 270,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={pickImage}
                >
                    <Icon name="image" size={35} color="purple" />
                </Pressable>
            </View>

            <TouchableOpacity style={estilos.botao} onPress={() => editarPesquisa(id, novoNome, novaData, image)}>
                <Text style={estilos.textoBotao}>SALVAR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={estilos.iconContainer} onPress={mostrarModal}>
                <Icon name="delete-outline" size={50} color="#FFFFFF" />
                <Text style={estilos.textoIcon}>Apagar</Text>
            </TouchableOpacity>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={fecharModal}
            >
                <View style={estilos.modalContainer}>
                    <Text style={estilos.texto2}>Tem certeza que deseja apagar a pesquisa?</Text>
                    <View style={estilos.butContainer}>
                        <TouchableOpacity style={estilos.but1} onPress={() => deletarPesquisa(id)}>
                            <Text style={estilos.textoBut}>Sim</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={estilos.but2} onPress={fecharModal}>
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
