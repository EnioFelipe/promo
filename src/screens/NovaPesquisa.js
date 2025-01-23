import { View, Text, TouchableOpacity , StyleSheet} from "react-native";
import { useState } from "react";
import { TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';


const NovaPesquisa = (props) => {
    const [txtNome, setNome] = useState('')
    const [txtData, setData] = useState('')
    const [erro, setErro] = useState('')
    const [erro2, setErro2] = useState('')

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