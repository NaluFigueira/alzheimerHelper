import React from 'react';
import { Text, View} from 'react-native';
import estilos from '../estilos/estilos.js'


const cores = ["red","green","blue"]; 

export default class Titulo extends React.Component{

	render(){
		return(
			<Text style = {{ fontFamily: 'Roboto-Light', fontSize: 20}} > 
				{this.props.titulo} 
			</Text>
			
		);
	}
}