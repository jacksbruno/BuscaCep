import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import api from './services/api';

export default App = () => {
  const [cep, setCep] = useState(null)
  const [cepDigitado, setCepDigitado] = useState(null)
  const [endereco, setEndereco] = useState([])

  

  function buscarCep(){
    setCepDigitado(cep)
    api.get(`/${Number(cepDigitado)}/json`).then(res => {
      setEndereco(res)
      console.log('endereco', endereco)
    })

  }

  return(
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.header}>
          <Text style={styles.label}>Digite o CEP desejado</Text>
        </View>
        <TextInput
          style={styles.inputCep}
          onChangeText={val => setCep(val)}
          keyboardType="numeric"
          value={cep}
          placeholder="Ex: 79002563"
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity style={styles.btnBusca} onPress={buscarCep}>
          <Text style={styles.txtBtn}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnBusca, { backgroundColor:'#FF7C6B', marginLeft: 20 }]} >
          <Text style={styles.txtBtn}>Limpar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.areaBusca}>
        <View style={{width: '90%', justifyContent:'flex-start', marginBottom: 5}}>
          <Text style={styles.labelResultado}>Resultado da Busca</Text>
        </View>
        <View style={styles.conteudoBusca}>
          <View style={styles.linha}>
            <Text style={styles.labelLinha}>CEP:</Text>
            <Text style={styles.conteudoLinha}>79011060</Text>
          </View>
          <View style={styles.linha}>
            <Text style={styles.labelLinha}>Logradouro:</Text>
            <Text style={styles.conteudoLinha}>Rua Doutor Meireles</Text>
          </View>
          <View style={styles.linha}>
            <Text style={styles.labelLinha}>Bairro:</Text>
            <Text style={styles.conteudoLinha}>Monte Castelo</Text>
          </View>
          <View style={styles.linha}>
            <Text style={styles.labelLinha}>Cidade:</Text>
            <Text style={styles.conteudoLinha}>Campo Grande</Text>
          </View>
          <View style={styles.linha}>
            <Text style={styles.labelLinha}>Estado:</Text>
            <Text style={styles.conteudoLinha}>Mato Grosso do Sul</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header:{
    width: '90%',
    height: 80,
    backgroundColor: '#5F30E1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 25
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff'
  },
  inputCep: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#5F30E1',
    borderRadius: 5,
    width: '90%',
    padding: 10,
    fontSize: 16,
    marginTop: 20,
    color: '#5F30E1',
    fontWeight: 'bold'
  },
  areaBtn: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center'
  },
  btnBusca: {
    width: 165,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5F30E1',
    borderRadius: 5
  },
  txtBtn:{
    color: '#fff',
    fontSize: 18
  },
  areaBusca:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  labelResultado: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  conteudoBusca: {
    width: '90%',
    backgroundColor: '#f2eff9',
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 10 
  },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10
  },
  labelLinha:{
    fontSize: 15,
    fontWeight: 'bold',
    color: '#5F30E1',
    width: 100
  },
  conteudoLinha: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold'
  }
});

