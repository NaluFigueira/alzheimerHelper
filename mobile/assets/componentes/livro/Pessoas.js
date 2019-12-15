import React,{useState, useEffect} from 'react';
import { View, Image, Text, FlatList, TouchableOpacity } from 'react-native';
import Botao from '../Botao';
import estilos from '../estilos/estilos.js';
import api,{ip} from '../../../src/services/api';

export default function Pessoas({navigation}) {
  const [pessoas, setPessoas] = useState([]);

  useEffect(() => {
    async function loadPessoas(){
      const response = await api.get('people');
      const p = [];
      response.data.forEach(pessoa => {
        pessoa = {
          ...pessoa,
          url: pessoa.url.replace("localhost", ip)
        }
        p.push(pessoa);    
      });
      setPessoas(p);
    }

    loadPessoas();
  }, []);

  renderItem = ({item, index}) => {
		return(
			<TouchableOpacity
				onPress = {() => navigation.push('DetalhesPessoa',{id: item.id})}
				style = {{margin:10,
					height: 180,
					width: 180,
					}}>
          <Image style = {estilos.imagemLivro} source={{uri: item.url}}/>
					<View style={estilos.absoluteView}>
            <Text style ={estilos.tituloLivro}>{item.first_name} {item.last_name}</Text>
          </View>
			</TouchableOpacity>
		);
	};

  return (
    <View style = {{flex: 1}}>
      <FlatList
					data = {pessoas}
					keyExtractor={(item, index) => item.id.toString()}
					renderItem = {renderItem}
					numColumns = {2}
				/>
      <View style={[estilos.voltarSeguir,{backgroundColor: "#FFEB83"}]}>
		      <Botao aoClicar = {() => navigation.push('MenuLivro')} 
		             titulo = "SAIR" 
		             operacao = {false} />
		      <Botao aoClicar = {() => navigation.push('FormularioPessoa',{tipo:'add'})} 
		             titulo = "ADICIONAR" 
		             operacao = {false} />
	    </View>
    </View>
  );
}
