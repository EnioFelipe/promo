import { View, Text, TouchableOpacity , StyleSheet} from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons'

const AcaoPesquisa = (props) => {

    const goToModificarPesquisas = () =>{
        props.navigation.navigate('ModPesquisas')
    }
    const goToColetarDados = () => {
        props.navigation.navigate('Coleta')
    }

    const goToRelatorio = () => {
        props.navigation.navigate('Relatorio')
    }

    return(
        <View style={estilos.view}>

            <View style={estilos.container}>
                <TouchableOpacity style={estilos.botao} onPress={goToModificarPesquisas}>
                    <Icon2 name='file-document-edit-outline' size={60} color='#FFFFFF'/>
                    <Text style={estilos.texto}>Modificar</Text>
                </TouchableOpacity>
            </View>

            <View style={estilos.container}>
                <TouchableOpacity style={estilos.botao} onPress={goToColetarDados}>
                    <Icon name='library-add-check' size={60} color='#FFFFFF'/>
                    <Text style={estilos.texto}>Coletar Dados</Text>
                </TouchableOpacity>
            </View>

            <View style={estilos.container}>
                <TouchableOpacity style={estilos.botao} onPress={goToRelatorio}>
                    <Icon name='donut-large' size={60} color='#FFFFFF'/>
                    <Text style={estilos.texto}>Relatório</Text>           
                </TouchableOpacity>
            </View>
                       
        </View>
        
    )
}

const estilos = StyleSheet.create({
    view:{
        padding: 5,
        backgroundColor:'#372775',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    texto:{
        marginTop: 10,
        fontSize: 18,
        color: '#ffffff',
        fontFamily: 'AveriaLibre-Regular',
        textAlign: 'center'
    },
    container:{
        backgroundColor: '#312464',
        width: "30%",
        height: "50%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    botao:{
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default AcaoPesquisa;