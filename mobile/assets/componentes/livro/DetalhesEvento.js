import React,{useState, useEffect} from 'react';
import { View, Image, ScrollView, Alert } from 'react-native';
import Botao from '../Botao';
import estilos from '../estilos/estilos.js';
import api,{ip} from '../../../src/services/api';
import Informacao from './Informacao';

export default function DetalhesEvento({navigation}) {
  const [evento, setEvento] = useState(null);

  useEffect(() => {
    async function loadEvento(){
      const response = await api.get(`events/${navigation.getParam('id')}`);
      setEvento(response.data[0]);
    }

    loadEvento();
  }, []);

  handleDelete = () =>{
    Alert.alert(
		  'ATENÇÃO',
		  `TEM CERTEZA QUE DESEJA DELETAR ${evento.name.toUpperCase()} DO LIVRO DE RECORDAÇÕES?`,
		  [
		    {text: 'SIM', onPress: async () => {
          await api.delete(`events/${evento.id}`);
          navigation.push('Eventos');
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
      {evento && 
         <ScrollView style = {{flex:1}}>
            <Image
               style={estilos.imagemQuizz}
               source={{uri: evento.url.replace("localhost", ip)}} 
            />
            <Informacao titulo = "Nome do Evento:" conteudo = {evento.name} />
            <Informacao titulo = "Local:" conteudo = {evento.local} />
            <Informacao titulo = "Detalhes:" conteudo = {evento.details} />
         </ScrollView>
      }
      
      <View style={[estilos.voltarSeguir,{backgroundColor: "#FFEB83"}]}>
		      <Botao aoClicar = {() => navigation.pop()} 
		             titulo = "SAIR" 
		             operacao = {false} />
		      <Botao aoClicar = {() => navigation.push('FormularioEvento',{tipo: "edit", evento})} 
		             titulo = "EDITAR" 
		             operacao = {false} />
		      <Botao aoClicar = {() => handleDelete()} 
		             titulo = "EXCLUIR" 
		             operacao = {false} />
	    </View>
    </View>
  );
}
