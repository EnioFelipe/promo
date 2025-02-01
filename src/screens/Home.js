import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Pressable, FlatList, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import app from "./src/config/firebase";
import { collection, getFirestore, onSnapshot, query } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { reducerSetPesquisa } from '../redux/pesquisaSlice';


const Home = (props) => {

    const [listaPesquisas, setListaPesquisas] = useState([]);
    const db = getFirestore(app);
    const pesquisaCollection = collection(db, 'pesquisas');
    const [filteredPesquisas, setFilteredPesquisas] = useState([]);
    const [searchText, setSearchText] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        const q = query(pesquisaCollection);
        const unsubscribe = onSnapshot(q, (snapshot) => {
          const pesquisas = [];
          snapshot.forEach((doc) => {
            pesquisas.push({
              id: doc.id,
              ...doc.data()
            });
          });
          setListaPesquisas(pesquisas);
          setFilteredPesquisas(pesquisas);
        });
        return () => unsubscribe();
      }, []);
    
    const irParaNovaPesquisa = () => {                           
        props.navigation.navigate('Nova Pesquisa');             
    }  

    const irParaAcoesPesquisa = (id, nome) => {                           
        dispatch(reducerSetPesquisa({id: id , nome: nome}));
        props.navigation.navigate('Ações', { id: id, nome: nome });         
    }

    const itemPesquisa = ({ item }) => (
    <TouchableOpacity
        style={estilos.card}
        onPress={() => irParaAcoesPesquisa(item.id, item.nome)}
    >
        {item.imagem ? <Image source={{ uri: item.imagem }} style={estilos.cardImage} /> : null}
        <Text style={estilos.title}>{item.nome}</Text>
        <Text style={estilos.subtitle}>{item.data}</Text>

    </TouchableOpacity>
    );

    return (
            <View style={estilos.body}>
            <View style={estilos.viewTextInput}>
                <Image source={require('../images/lupa.png')} />
                <TextInput style={estilos.textInput} placeholder='Insira o termo da busca...' />
            </View>
            <View style={estilos.containerCartoes}>
                <FlatList
                    data={filteredPesquisas}
                    renderItem={itemPesquisa}
                    keyExtractor={item => item.id}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
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
        backgroundColor: '#382474',
    }
});

export default Home;