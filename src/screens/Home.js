import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PesquisaCard from '../components/PesquisaCard';
import { pesquisas } from '../mocks/pesquisas';

const Home = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPesquisas, setFilteredPesquisas] = useState(pesquisas);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = pesquisas.filter(
      (pesquisa) => pesquisa.nome.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredPesquisas(filtered);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Minhas Pesquisas</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar pesquisa..."
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      
      <FlatList
        data={filteredPesquisas}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <PesquisaCard
            nome={item.nome}
            data={item.data}
            imagem={item.imagem}
            onPress={() => navigation.navigate('AcoesPesquisa', { pesquisa: item })}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
      
      <TouchableOpacity
        style={styles.novaPesquisaButton}
        onPress={() => navigation.navigate('NovaPesquisa')}
      >
        <Text style={styles.buttonText}>Nova Pesquisa</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  listContainer: {
    paddingVertical: 10,
  },
  novaPesquisaButton: {
    backgroundColor: '#6200EE',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Home;