import React,{useState, useEffect} from 'react';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import Botao from '../Botao';
import estilos from '../estilos/estilos.js';
import api,{ip} from '../../../src/services/api';

export default function Eventos({navigation}) {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    async function loadEventos(){
      const response = await api.get('events');
      const events = [];
      response.data.forEach(evento => {
        evento = {
          ...evento,
          url: evento.url.replace("localhost", ip)
        }
        events.push(evento);    
      });
      setEventos(events);
    }

    loadEventos();
  }, []);

  renderItem = ({item, index}) => {
		return(
			<TouchableOpacity
				onPress = {() => navigation.push('DetalhesEvento',{id: item.id})}
				style = {{margin:10,
					height: 180,
					width: 180,
					}}>
          <Image style = {estilos.imagemLivro} source={{uri: item.url}}/>
					<View style={estilos.absoluteView}>
            <Text style ={estilos.tituloLivro}>{item.name}</Text>
          </View>
			</TouchableOpacity>
		);
	};

  return (
    <View style = {{flex: 1}}>
      <FlatList
					data = {eventos}
					keyExtractor={(item, index) => item.id.toString()}
					renderItem = {renderItem}
					numColumns = {2}
				/>
      <View style={[estilos.voltarSeguir,{backgroundColor: "#FFEB83"}]}>
		      <Botao aoClicar = {() => navigation.push('MenuLivro')} 
		             titulo = "SAIR" 
		             operacao = {false} />
		      <Botao aoClicar = {() => navigation.push('FormularioEvento',{tipo:'add'})} 
		             titulo = "ADICIONAR" 
		             operacao = {false} />
	    </View>
    </View>
  );
}
