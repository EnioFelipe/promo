import { View, Text, TouchableOpacity, StyleSheet, Modal, Pressable } from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import {collection, addDoc, getFirestore, getDoc, doc, updateDoc} from 'firebase/firestore'
import {app} from './src/config/firebase.js'
import { storage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { launchImageLibrary } from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import { useSelector } from 'react-redux';


const ModPesquisas = (props) => {
    
    const id = useSelector((state) => state.pesquisa.id);
    const pesquisa = useSelector((state)=>state.pesquisa);
    console.log(pesquisa);
    const [novoNome, setNovoNome] = useState('');
    const [novaData, setNovaData] = useState('');
    const [nomePesquisaError, setNomePesquisaError] = useState('');
    const [dataPesquisaError, setDataPesquisaError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [image, setImage] = useState(null);
    
    const db = getFirestore(app)

      
    const goToHome = () => {
        props.navigation.navigate('Home');
    };

    const mostrarModal = () => {
        setModalVisible(true);
    };

    const fecharModal = () => {
        setModalVisible(false);
    };


    const editarPesquisa = async (id, novoNome, novaData, image) => {
        if (!novoNome.trim()) {
            setNomePesquisaError('Preencha o nome da pesquisa');
        } else {
            setNomePesquisaError('');
        }
    
        if (!novaData.trim()) {
            setDataPesquisaError('Preencha a data da pesquisa');
        } else {
            setDataPesquisaError('');
        }
    
        if (novoNome.trim() && novaData.trim()) {
            try {
            let imageUrl = null;
    
            if (image) {
                try {
                const response = await fetch(image.uri);
                const blob = await response.blob();
                const imageRef = ref(storage, `pesquisas/${Date.now()}_${image.fileName}`);
                await uploadBytes(imageRef, blob);
                imageUrl = await getDownloadURL(imageRef);
                } catch (imageError) {
                console.error("Erro ao fazer upload da imagem: ", imageError);
                throw new Error("Falha ao enviar a imagem");
                }
            }
    
            const pesRef = doc(db, "pesquisas", id);
            const pesquisaDoc = await getDoc(pesRef);
    
            if (pesquisaDoc.exists()) {
                const pesquisaData = pesquisaDoc.data();
    
                if (pesquisaData.imagem) {
                console.log('URL da imagem antiga:', pesquisaData.imagem);     
                const oldImageRef = ref(storage, pesquisaData.imagem);
    
                try {
                    await deleteObject(oldImageRef);
                    console.log('Imagem antiga deletada com sucesso.');
                } catch (deleteError) {
                    console.error('Erro ao deletar a imagem antiga:', deleteError);
                }
                }
    
                const novaPesquisa = {
                nome: novoNome,
                data: novaData,
                imagem: imageUrl,
                };
    
                await updateDoc(pesRef, novaPesquisa);
                goToHome();
            } else {
                console.error("Documento não encontrado");
            }
    
            } catch (error) {
            console.error("Erro ao modificar a pesquisa: ", error);
            }
        }
    }

    const deletarPesquisa = async (id) => {
        const docRef = doc(db, "pesquisas", id);
    
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            const data = docSnap.data();
            const imageUrl = data.imagem;
            const imageRef = ref(storage, imageUrl);
            console.log('Tentando deletar a imagem com URL:', imageUrl);
            await deleteObject(imageRef);
            await deleteDoc(docRef);
            console.log('Documento deletado com sucesso.');
            goToHome();
          } else {
            console.log("Documento não encontrado!");
          }
        } catch (error) {
          console.error('Erro ao deletar a pesquisa:');
        }
    };
    

    return (
        <View style={estilos.view}>
            <View style={estilos.textContainer}>
                <Text style={estilos.texto}>Nome</Text>
                <TextInput
                    value={novoNome}
                    onChangeText={text => setNovoNome(text)}
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
                    value={novaData}
                    onChangeText={text => setNovaData(text)}
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