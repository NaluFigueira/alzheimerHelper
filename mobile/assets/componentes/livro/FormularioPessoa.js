import React, {useState, useEffect} from 'react';
import { KeyboardAvoidingView, TextInput,Text, Image, ScrollView, Alert, Form } from 'react-native';
import Botao from '../Botao';
import estilos from '../estilos/estilos.js';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import api,{ip} from '../../../src/services/api';

export default function FormularioPessoa({navigation}) {
  const tipo = navigation.getParam('tipo');
  const [primeiroNome, setPrimeiroNome] = useState("");
  const [ultimoNome, setUltimoNome] = useState("");
  const [idade, setIdade] = useState("");
  const [relacionamento, setRelacionamento] = useState("");
  const [curiosidades, setCuriosidades] = useState("");
  const [path, setPath] = useState(null);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    async function loadDados(){
      if(tipo !== "add"){
        const pessoa = navigation.getParam('pessoa');
        setPrimeiroNome(pessoa.first_name);
        setUltimoNome(pessoa.last_name);
        setIdade(pessoa.age.toString());
        setRelacionamento(pessoa.relationship);
        setCuriosidades(pessoa.curiosities);
        let aux = {uri: pessoa.url.replace("localhost", ip)}
        setPath(aux);
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
        `AGORA VOCÊ TEM ACESSO AS INFORMAÇÕES DE ${primeiroNome.toUpperCase()} `+
        `${ultimoNome.toUpperCase()} NO SEU LIVRO DE RECORDAÇÕES!`
      );
    else
      Alert.alert(
        'SUCESSO!',
        `AS INFORMAÇÕES DE ${primeiroNome.toUpperCase()} `+
        `${ultimoNome.toUpperCase()} FORAM ATUALIZADAS!`
      );
    navigation.push('Pessoas');
  }

  function alertarErro(){
    Alert.alert(
     'ATENÇÃO',
     "PARA INSERIR OU EDITAR UMA PESSOA É PRECISO "+
     "INSERIR AO MENOS UMA FOTO, O PRIMEIRO E O ULTIMO NOME!" +
     "INSIRA OS DADOS OBRIGATÓRIOS E TENTE NOVAMENTE!"
   );
  }

  handleSubmit = async () => {
    if(primeiroNome === "" || ultimoNome === "" || path === null){
      alertarErro();
    }
    else{
      try {
        let formData = new FormData();
        formData.append("file",{uri: path.uri, name: fileName, type: path.type+"/jpeg"});
        formData.append("first_name",primeiroNome);
        formData.append("last_name",ultimoNome);
        formData.append("age",parseInt(idade));
        formData.append("relationship",relacionamento);
        formData.append("curiosities",curiosidades);
        if(tipo === 'add'){
          await api
          .post(`people`, formData, {
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'multipart/form-data',
              },
          }) 
        }
        else{
          await api
          .put(`people`, formData, {
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
            placeholder="PRIMEIRO NOME"
            placeholderTextColor="#aaa"
            style = {estilos.input}
            onChangeText={(primeiroNome) => setPrimeiroNome(primeiroNome)}
            value={primeiroNome}
            />
          <TextInput
            placeholder="ULTIMO NOME"
            placeholderTextColor="#aaa"
            style = {estilos.input}
            onChangeText={(ultimoNome) => setUltimoNome(ultimoNome)}
            value={ultimoNome}
          />
          <TextInput
            placeholder="IDADE"
            placeholderTextColor="#aaa"
            style = {estilos.input}
            onChangeText={(idade) => setIdade(idade)}
            value={idade}
          />
          <TextInput
            placeholder="GRAU DE RELACIONAMENTO"
            placeholderTextColor="#aaa"
            style = {estilos.input}
            onChangeText={(relacionamento) => setRelacionamento(relacionamento)}
            value={relacionamento}
          />
          <TextInput
            placeholder="CURIOSIDADES"
            placeholderTextColor="#aaa"
            style = {estilos.input}
            onChangeText={(curiosidades) => setCuriosidades(curiosidades)}
            value={curiosidades}
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
                titulo = {tipo === 'add'?"ADICIONAR PESSOA":"CONCLUIR EDIÇÃO"} 
                operacao = {false} />
    </KeyboardAvoidingView>
      </ScrollView>
  );
}
