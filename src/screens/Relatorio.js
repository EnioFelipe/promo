import React from 'react';
import { ScrollView, Image, StyleSheet, Text , View} from 'react-native';

const Relatorio = () => (
  <ScrollView 
    style={styles.container}
    contentContainerStyle={styles.contentContainer}
  >
    <View style={styles.containerImgText}>
      <Image source={require('../images/pizza.png')} 
      style={styles.image}
      />
      <View style={styles.containerText}>
        <View style={styles.row}>
            <View style={[styles.quadrado, { backgroundColor: '#F1CE7E' }]} />
            <Text style={styles.texto}>Excelente</Text>
          </View>
          <View style={styles.row}>
            <View style={[styles.quadrado, { backgroundColor: '#6994FE' }]} />
            <Text style={styles.texto}>Bom</Text>
          </View>
          <View style={styles.row}>
            <View style={[styles.quadrado, { backgroundColor: '#5FCDA4' }]} />
            <Text style={styles.texto}>Neutro</Text>
          </View>
          <View style={styles.row}>
            <View style={[styles.quadrado, { backgroundColor: '#EA7288' }]} />
            <Text style={styles.texto}>Ruim</Text>
          </View>
          <View style={styles.row}>
            <View style={[styles.quadrado, { backgroundColor: '#53D8D8' }]} />
            <Text style={styles.texto}>Péssimo</Text>
          </View>
      </View>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  image: {
    width: 200, 
    height: 200,   
    resizeMode: 'contain',
    marginRight: 50,
  },
  container: {
    flex: 1, 
    backgroundColor: "#372775",
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  texto:{
    fontSize: 18,
    color: '#ffffff',
    fontFamily: 'AveriaLibre-Regular',
    textAlign: 'left',
    marginBottom: 5
  },
  containerText:{
    marginTop: 20,
    justifyContent: 'center'
  },
  containerImgText:{
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  quadrado: {
    width: 18,
    height: 18,
    marginRight: 5
  },
});

export default Relatorio;