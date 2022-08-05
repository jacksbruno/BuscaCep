import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
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
    <View style={styles.container}>
      <TextInput
        style={styles.inputCep}
        onChangeText={val => setCep(val)}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.btnBusca} onPress={buscarCep}>
        <Text>Buscar</Text>
      </TouchableOpacity>
      <Text>CEP { cepDigitado }</Text>
      <Text>{endereco}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputCep: {
    borderWidth: 1,
    margin: 10
  },
  btnBusca: {
    width: 150,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#87cefa'
  }
});

