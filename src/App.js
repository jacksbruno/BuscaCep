import React, { useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import api from './services/api';

export default App = () => {
  const [cep, setCep] = useState(null)
  const [endereco, setEndereco] = useState({})
  const [inputFocus, setInputFocus] = useState(false)
  const inputRef = useRef(null)

  

  async function buscarCep(){
    Keyboard.dismiss()
    if(cep.length < 8){
      alert('Digite um CEP válido!')
      return false
    }

    try{
      const resp = await api.get(`/${Number(cep)}/json`)
      setEndereco(resp.data)
    }catch(err){
      console.log('ERROR: '+err)
    }

  }

  function limpar(){
    setCep('')
    setEndereco({})
    inputRef.current.focus()
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
          maxLength={8}
          ref={inputRef}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
        />
      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity style={styles.btnBusca} onPress={buscarCep}>
          <Text style={styles.txtBtn}>Buscar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btnBusca, { backgroundColor:'#FF7C6B', marginLeft: 20 }]} onPress={limpar} >
          <Text style={styles.txtBtn}>Limpar</Text>
        </TouchableOpacity>
      </View>

      {
        endereco.logradouro&&!inputFocus
        ?
        <View style={styles.areaBusca}>
          <View style={{width: '90%', justifyContent:'flex-start', marginBottom: 5}}>
            <Text style={styles.labelResultado}>Resultado da Busca</Text>
          </View>
          <View style={styles.conteudoBusca}>
            <View style={styles.linha}>
              <Text style={styles.labelLinha}>CEP:</Text>
              <Text style={styles.conteudoLinha}>{ endereco.cep }</Text>
            </View>
            <View style={styles.linha}>
              <Text style={styles.labelLinha}>Logradouro:</Text>
              <Text style={styles.conteudoLinha}>{ endereco.logradouro }</Text>
            </View>
            <View style={styles.linha}>
              <Text style={styles.labelLinha}>Complemento:</Text>
              <Text style={styles.conteudoLinha}>{ endereco.complemento }</Text>
            </View>
            <View style={styles.linha}>
              <Text style={styles.labelLinha}>Bairro:</Text>
              <Text style={styles.conteudoLinha}>{ endereco.bairro }</Text>
            </View>
            <View style={styles.linha}>
              <Text style={styles.labelLinha}>Cidade:</Text>
              <Text style={styles.conteudoLinha}>{ endereco.localidade }</Text>
            </View>
            <View style={styles.linha}>
              <Text style={styles.labelLinha}>Estado:</Text>
              <Text style={styles.conteudoLinha}>{ endereco.uf }</Text>
            </View>
          </View>
        </View>
        :
        false
      }
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
    width: 115
  },
  conteudoLinha: {
    fontSize: 14,
    color: '#000',
    fontWeight: 'bold'
  }
});

