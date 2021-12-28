import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import React, { useState, useEffect } from 'react';
import {StyleSheet, Text, View, Button, TouchableOpacity, TextInput, AsyncStorage} from 'react-native';

export default function App (){

  const [estado, setarEstado] = useState('leitura');
  const [anotacao, setarAnotacao] = useState('');

  useEffect(()=>{
    (async () => {
      try{
        const anotacaoLeitura = await AsyncStorage.getItem('anotacao');
        setarAnotacao(anotacaoLeitura);
      }catch(error){

      }
    })();
  },[])

  setData = async() => {
    try{
      await AsyncStorage.setItem('anotacao',anotacao);
    }catch(error){

    }
  }

  function atualizarTexto(){
    setarEstado('leitura');
    setData();
  }
    
  if(estado == 'leitura'){
    return(
      <View style={{flex:1}}>
        <StatusBar style="light"  />
        <View style={styles.header}><Text style={{textAlign:'center',color:'white',fontSize:20}}>Bloco de Notas</Text></View>
        {
          (anotacao !== '')?
          <View style={{padding:20}}><Text style={styles.anotacao}>{anotacao}</Text></View>
          :
          <View style={{padding:20}}><Text style={{opacity:0.3}}>Nenhuma anotação encontrada.</Text></View>
        }
        {
          (anotacao === '')?
          <TouchableOpacity onPress={()=> setarEstado('atualizando')} style={styles.btnAnotacao}><Text style={styles.btnAnotacaoText}>+</Text></TouchableOpacity>
          :
          <TouchableOpacity onPress={()=> setarEstado('atualizando')} style={styles.btnAnotacao}><Text style={styles.btnAnotacaoTextEdit}>🖊️</Text></TouchableOpacity>
        }
      </View>
    )
  }else if(estado == 'atualizando'){
    return(
      <View style={{flex:1}}>
        <StatusBar style="light"  />
        <View style={styles.header}><Text style={{textAlign:'center',color:'white',fontSize:20}}>Criar Anotação</Text></View>
        <TextInput autoFocus={true} style={{padding:20,height:200,textAlignVertical:'top'}} onChangeText={(text)=>setarAnotacao(text)} multiline={true} numberOfLines={5} value={anotacao}></TextInput>
        <TouchableOpacity onPress={()=> atualizarTexto()} style={styles.btnSalvar}><Text style={styles.btnSalvarText}>Salvar</Text></TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header:{
    width:'100%',
    paddingTop:Constants.statusBarHeight,
    padding: 15,
    backgroundColor: '#069'
  },
  anotacao:{
    fontSize:14
  },
  btnAnotacao:{
    position: 'absolute',
    right:20,
    bottom: 30,
    width:60,
    height:60,
    backgroundColor:'#069',
    borderRadius: 35,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnAnotacaoText:{
    color:'white',
    textAlign: 'center',
    fontSize:40
  },
  btnAnotacaoTextEdit:{
    textAlign: 'center',
    fontSize:30,
    color:'white',
  },
  btnSalvar:{
    position: 'absolute',
    right:0,
    bottom: 0,
    width:'100%',
    height:50,
    backgroundColor:'#069',
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnSalvarText:{
    color:'white',
    fontSize:30,
    fontWeight:'bold' ,
    textAlign:'center'
  }
})