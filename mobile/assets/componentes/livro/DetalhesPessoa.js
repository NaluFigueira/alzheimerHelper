import React,{useState, useEffect} from 'react';
import { View, Image, ScrollView, Alert } from 'react-native';
import Botao from '../Botao';
import estilos from '../estilos/estilos.js';
import api,{ip} from '../../../src/services/api';
import Informacao from './Informacao';

export default function DetalhesPessoa({navigation}) {
  const [pessoa, setPessoa] = useState(null);

  useEffect(() => {
    async function loadPessoa(){
      const response = await api.get(`people/${navigation.getParam('id')}`);
      setPessoa(response.data[0]);
    }

    loadPessoa();
  }, []);

  handleDelete = () =>{
    Alert.alert(
		  'ATENÇÃO',
      `TEM CERTEZA QUE DESEJA DELETAR ${pessoa.first_name.toUpperCase()} `+
      `${pessoa.last_name.toUpperCase()} DO LIVRO DE RECORDAÇÕES?`,
		  [
		    {text: 'SIM', onPress: async () => {
          await api.delete(`people/${pessoa.id}`);
          navigation.push('Pessoas');
        }
			},
		  {
		    text: 'NÃO',
		  },
		  ],
		  {cancelable: true},
		);
  }

  return (
    <View style={estilos.container}>
      {pessoa && 
         <ScrollView style = {{flex:1}}>
            <Image
               style={estilos.imagemQuizz}
               source={{uri: pessoa.url.replace("localhost", ip)}} 
            />
            <Informacao titulo = "Primeiro Nome:" conteudo = {pessoa.first_name} />
            <Informacao titulo = "Ultimo Nome:" conteudo = {pessoa.last_name} />
            <Informacao titulo = "Idade:" conteudo = {pessoa.age} />
            <Informacao titulo = "Grau de relacionamento:" conteudo = {pessoa.relationship} />
            <Informacao titulo = "Curiosidades:" conteudo = {pessoa.curiosities} />
         </ScrollView>
      }
      
      <View style={[estilos.voltarSeguir,{backgroundColor: "#FFEB83"}]}>
		      <Botao aoClicar = {() => navigation.pop()} 
		             titulo = "SAIR" 
		             operacao = {false} />
		      <Botao aoClicar = {() => navigation.push('FormularioPessoa',{tipo: "edit", pessoa})} 
		             titulo = "EDITAR" 
		             operacao = {false} />
		      <Botao aoClicar = {() => handleDelete()} 
		             titulo = "EXCLUIR" 
		             operacao = {false} />
	    </View>
    </View>
  );
}
