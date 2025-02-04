import React from 'react';
import { ScrollView, StyleSheet, Text , View} from 'react-native';
import PieChart from "react-native-pie-chart";
import { useSelector } from "react-redux";

const Relatorio = () => {
  const data = useSelector((state) => state.pesquisa);

  return(
  <ScrollView 
    style={styles.container}
    contentContainerStyle={styles.contentContainer}
  >
    <View style={styles.containerImgText}>
      <PieChart
        widthAndHeight={200}
        series={[
          { value: data.pesquisa.pessimo, color: "#53D8D8" },
          { value: data.pesquisa.excelente, color: "#F1CE7E" },
          { value: data.pesquisa.bom, color: "#6994FE" },
          { value: data.pesquisa.neutro, color: "#5FCDA4" },
          { value: data.pesquisa.ruim, color: "#EA7288" },
        ]}
        doughnut={true} 
        coverRadius={10}
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
};

const styles = StyleSheet.create({
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