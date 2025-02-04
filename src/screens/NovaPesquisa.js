import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity , StyleSheet,Pressable} from "react-native";
import { TextInput } from "react-native-paper";
import {app} from './src/config/firebase.js'
import { addDoc, query, onSnapshot, getFirestore, collection,initializeFirestore} from 'firebase/firestore';
import ImageResizer from "react-native-image-resizer";
import { launchImageLibrary } from "react-native-image-picker";

const NovaPesquisa = (props) => {

    
    const db = getFirestore(app)

    const [txtNome, setNome] = useState('')
    const [txtData, setData] = useState('')
    const [txtImagem, setImagem] = useState('')
    const [erro, setErro] = useState('')
    const [erro2, setErro2] = useState('')
    const pesquisaRef = collection(db, 'pesquisas')

    
    useEffect(() => {
        const q = query(pesquisaRef);
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const pesquisas = [];
            snapshot.forEach((doc) => {
                pesquisas.push({
                    id: doc.id,
                    ...doc.data()
                });
            });
        });
    
        return () => unsubscribe();
    
    }, []); 
       
    
    const addPesquisa= () => {
        const pesquisa = {
            nome: txtNome,
            data: txtData,
            imagem: txtImagem
        }    

        addDoc(pesquisaRef, { nome: txtNome, data: txtData, imagem: txtImagem}).then((docRef) => {
            const pesquisa = {
                nome: txtNome,
                data: txtData,
                imagem: txtImagem,
                id: docRef.id,
              };
              updateDoc(docRef, pesquisa)
          .then(() => {
            console.log('Documento cadastrado com sucesso' + docRef.id)
          })
          .catch((erro) => {
            console.log(erro)
          });
            console.log('Documento cadastrado com sucesso' + docRef.id)  
            props.navigation.navigate('Home')          
        }).catch((erro) => {
            console.log(erro)
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
            setImagem(reader.result)
        };
        reader.readAsDataURL(imagemBlob);
    };


    const goToHome = () => {
        if(txtNome.trim() == '' && txtData.trim() == ''){
            setErro('Preencha no nome da pesquisa.')
            setErro2('Preencha a data.')
        }else if(txtNome.trim() == '' ){
            setErro('Preencha no nome da pesquisa.')
            setErro2('')
        }else if(txtData.trim() == ''){
            setErro2('Preencha a data.')
            setErro('')
        }  
        else{
            setErro('')
            setErro2('')
            props.navigation.navigate('Home')
        }


    }

    return(
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
                <Text style={estilos.textoErro}>{erro}</Text>
            

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
                />
                <Text style={estilos.textoErro}>´{erro2}</Text>

                <Text style={estilos.texto}>Imagem</Text>

            
            </View>

            <Pressable
                    style={{
                      backgroundColor: 'white',
                     height: 38,
                    width: 270,
                    justifyContent: 'center',
                     alignItems: 'center'
                }}
                 onPress={pickImage}
                >
                     <Text>Camera/Galeria de Imagens</Text>
                </Pressable>

            <TouchableOpacity style={estilos.botao} onPress={addPesquisa}>
                <Text style={estilos.textoBotao}>CADASTRAR</Text>
            </TouchableOpacity>
        </View>
    )
}

const estilos = StyleSheet.create({
    view:{
        padding: 5,
        backgroundColor:'#372775',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        width: '70%',
        alignItems: 'center',
    },
    texto:{
        fontSize: 18,
        color: '#ffffff',
        fontFamily: 'AveriaLibre-Regular',
        textAlign: 'left',
        width: '100%',
        marginBottom: 1
    },
    textoErro:{
        marginTop: 0,
        fontSize: 12,
        color: '#FD7979',
        fontFamily: 'AveriaLibre-Regular',
        textAlign: 'left',
        width: '100%'
    },
    textoBotao:{
        fontSize: 17,
        fontFamily: 'AveriaLibre-Regular',
        textAlign: 'center',
        color: '#FFFFFF'
    },
    botao:{
        marginTop: 20,
        width: '70%',
        backgroundColor: '#49B976',
        borderColor: '#37BD6D',
    },
    input:{
        width: '100%',
        backgroundColor: '#FFFFFF',
        height: 35,
    },
    inputImage:{
        color: '#939393',
        alignSelf: 'flex-start',
        textAlign: 'center',
        width: '50%',
        height: 50,
        backgroundColor: '#FFFFFF',
    }
})

export default NovaPesquisa