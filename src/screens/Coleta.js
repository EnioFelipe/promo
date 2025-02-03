import React, { useState } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import BotaoColeta from "../components/botaoColeta";
import { collection, addDoc, serverTimestamp, getFirestore } from 'firebase/firestore'; 
import { app } from '../screens/src/config/firebase.js'; 


const db = getFirestore(app);

const Coleta = (props) => {
    const [loading, setLoading] = useState(false);  

    const salvarResposta = async (resposta) => { 
        setLoading(true);                         
        try {                                                                                                                            
            await addDoc(collection(db, 'feedbacks'), {   
                resposta,                                  
                timestamp: serverTimestamp(),              
            });
            console.log('Resposta salva com sucesso:', resposta);
            props.navigation.navigate('Agradecimento');
        } catch (error) {
            console.error('Erro ao salvar resposta:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={style.scrollView}>
            <Text style={style.text}> O que você achou do evento? </Text>

            <View style={style.view}>
                {loading ? (
                    <ActivityIndicator size="large" color="#FFFFFF" />
                ) : (
                    <>
                        <BotaoColeta iconName='mood-bad' text='Péssimo' cor='#d71616' tocar={() => salvarResposta('pessimo')} />
                        <BotaoColeta iconName='sentiment-dissatisfied' text='Ruim' cor='#ff360a' tocar={() => salvarResposta('ruim')} />
                        <BotaoColeta iconName='sentiment-neutral' text='Neutro' cor='#ffc632' tocar={() => salvarResposta('neutro')} />
                        <BotaoColeta iconName='sentiment-satisfied' text='Bom' cor='#37bd6d' tocar={() => salvarResposta('bom')} />
                        <BotaoColeta iconName='mood' text='Excelente' cor='#25bc22' tocar={() => salvarResposta('excelente')} />
                    </>
                )}
            </View>
        </ScrollView>
    );
};

const style = StyleSheet.create({
    view: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontFamily: 'AveriaLibre-Regular',
        fontSize: 35,
        color: '#FFFFFF',
        textAlign: 'center',
        marginTop: 40,
        width: '100%',
    },
    scrollView: {
        backgroundColor: '#372775',
        flex: 1,
    },
});

export default Coleta;
