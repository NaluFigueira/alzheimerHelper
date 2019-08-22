import React from 'react';
import {View, Text } from 'react-native';
import estilos from './estilos/estilos.js';

export default class Objeto extends React.Component{

  render(){
    return (
    		<View onPress = {this.props.funcao} style = {{flex:1,alignItems: 'center',justifyContent: 'center'}}>
		       <Text onPress = {this.props.funcao} style = {{ fontFamily: 'Roboto-Light', fontSize: this.props.tamanho-5}} >
		           {this.props.texto}
		       </Text>
	       </View>
    );
  }
}

