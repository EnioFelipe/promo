import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { TextInput } from 'react-native-paper';
import Cartao from '../components/Cartao';

const Home = (props) => {

    irParaNovaPesquisa = () => {                           
        props.navigation.navigate('Nova Pesquisa');             
    }       
    irParaAcoesPesquisa = () => {                           
        props.navigation.navigate('Ações')          
    }

    const cartoes = [
        { capa: require("../images/Meninas.png"), nome: "MENINAS", data: "07/02/2024"  },
        { capa: require("../images/ubuntu.png"), nome: "UBUNTU 2024", data: "15/06/2024" },
        { capa: require("../images/secomp.png"), nome: "SECOMP 2024", data: "18/11/2024" },

    ]

    return (
        <View style={estilos.body}>
            <View style={estilos.viewTextInput}>
                <Image source={require('../images/lupa.png')} />
                <TextInput style={estilos.textInput} placeholder='Insira o termo da busca...' />
            </View>
            <Pressable onPress={irParaAcoesPesquisa} style={estilos.containerCartoes}>{
                cartoes.map(
                    (card, index) => (
                        <Cartao
                        key={index} 
                        onPress={irParaAcoesPesquisa} 
                        capa={card.capa} 
                        nome={card.nome} 
                        data={card.data} 
                        />
                    )
                )
            }
            </Pressable>
                <Pressable onPress={irParaNovaPesquisa} style={estilos.btnNovaPesquisa}>
                <Text style={estilos.btnPesquisa}>Nova Pesquisa</Text>
            </Pressable>
        </View>
    )
}


const estilos = StyleSheet.create({
    title: {
        color: 'blue',
        fontSize: 20,
        width: 140,
        fontFamily: 'AveriaLibre-Regular',
    },
    subtitle: {
        fontSize: 15,
        fontFamily: 'AveriaLibre-Regular'
    },
    body: {
        backgroundColor: '#382474',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
       
        
    },
    viewTextInput: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        width: '90%',
        margin: 10,
        height: 40,
        width: '90%',
        
    },
    textInput: {
        backgroundColor: '#fff',
        width: 300,
        width: '90%',
        height: 40,
        borderRadius: 0,
        fontFamily: 'AveriaLibre-Regular'
    },
    btnNovaPesquisa: {
        width: '90%',
        height: 40,
        backgroundColor: '#37BD6D',
        justifyContent: 'center',
        marginTop: 15
    },
    btnPesquisa: {
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 25
    },
    containerCartoes: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        justifyContent: 'space-around', 
        width: '100%', 
        paddingHorizontal: 10, 
    }
});

export default Home;