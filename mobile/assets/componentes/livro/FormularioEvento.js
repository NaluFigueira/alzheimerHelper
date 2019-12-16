import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, TextInput,Text, Image, ScrollView, Alert, Form } from 'react-native';
import Botao from '../Botao';
import estilos from '../estilos/estilos.js';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {resolve} from 'react-native-path';
import api,{ip} from '../../../src/services/api';

export default function Formularioevento({navigation}) {
  const tipo = navigation.getParam('tipo');
  const [name, setName] = useState("");
  const [local, setLocal] = useState("");
  const [details, setDetails] = useState("");
  const [path, setPath] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    async function loadDados(){
      if(tipo !== "add"){
        const evento = navigation.getParam('evento');
        setName(evento.name);
        setLocal(evento.local);
        setDetails(evento.details);
        let aux = {uri: evento.url.replace("localhost", ip)}
        setPath(aux);
        let fn = evento.url.split('/');
        setFileName(fn[fn.length-1]);
      }
    }

    loadDados();
  },[])

  getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return false;
    }
    return true;
  }

  chooseFile = async () => {
    if(getPermissionAsync()){
        const response = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
        });
        if(!response.cancelled){
          const file = response.uri.split("/");
          setPath(response);
          setFileName(file[file.length-1]);
        }
    }
  }

  function alertarConclusao(){
    if(tipo === 'add')
      Alert.alert(
        'SUCESSO!',
        `AGORA VOCÊ TEM ACESSO AS INFORMAÇÕES DE ${name.toUpperCase()} `+
        `NO SEU LIVRO DE RECORDAÇÕES!`
      );
    else
      Alert.alert(
        'SUCESSO!',
        `AS INFORMAÇÕES DE ${name.toUpperCase()} `+
        `FORAM ATUALIZADAS!`
      );
    navigation.push('Eventos');
  }

  function alertarErro(){
    Alert.alert(
     'ATENÇÃO',
     "PARA INSERIR OU EDITAR UMA evento É PRECISO "+
     "INSERIR O NOME DO EVENTO!" +
     "INSIRA OS DADOS OBRIGATÓRIOS E TENTE NOVAMENTE!"
   );
  }

  handleSubmit = async () => {
    if(name === "" || local === ""){
      alertarErro();
    }
    else{
      try {
        let formData = new FormData();
        const extension = fileName.split('.');
        if(path === null)
          formData.append("file",{
            uri: 'file://' + resolve(__dirname, "..", "..", "imagens", "noImage.png"),
            type: "image/png",
            name: "noImage.png"
          });
        else
          formData.append("file",{
            uri: path.uri, 
            name: fileName, 
            type: "image/"+extension[extension.length-1]
          });
        formData.append("name",name);
        formData.append("local",local);
        formData.append("details",details);
        if(tipo === 'add'){
          await api
          .post(`events`, formData, {
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
              },
          }) 
        }
        else{
          await api
          .put(`events`, formData, {
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
              },
          }) 
        }
        alertarConclusao();
      } catch (error) {
        console.log(error);
      }   
    }
  }

  return (
    <ScrollView contentContainerStyle = {{flexGrow:1, justifyContent:"center", paddingVertical: 40}}>
      <KeyboardAvoidingView behavior="padding">
          <TextInput
            placeholder="NOME"
            placeholderTextColor="#aaa"
            editable={tipo === 'add'}
            style = {estilos.input}
            onChangeText={(name) => setName(name)}
            value={name}
            />
          <TextInput
            placeholder="LOCAL"
            placeholderTextColor="#aaa"
            style = {estilos.input}
            onChangeText={(local) => setLocal(local)}
            value={local}
          />
          <TextInput
            placeholder="DETALHES"
            placeholderTextColor="#aaa"
            style = {estilos.input}
            onChangeText={(details) => setDetails(details)}
            value={details}
          />
          <Botao aoClicar = {() => chooseFile()}
                titulo = "ESCOLHER FOTO" 
                operacao = {true} />
          <Text style ={estilos.nomeArquivo}>Arquivo escolhido:</Text>
          {
            path?
            <Image
                source={{ uri: path.uri }}
                style={{ width: 350, height: 250, alignSelf: "center" }}
              />
            :
            <Text style ={estilos.nomeArquivo}>Nenhum arquivo seleiconado</Text>
          }
          <Botao aoClicar = {() => handleSubmit()}
                titulo = {tipo === 'add'?"ADICIONAR EVENTO":"CONCLUIR EDIÇÃO"} 
                operacao = {false} />
    </KeyboardAvoidingView>
      </ScrollView>
  );
}
