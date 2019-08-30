import React from 'react';
import {View, Text } from 'react-native';
import estilos from './estilos/estilos.js';
import { StyleSheet } from 'react-native'

  



export default class Objeto extends React.Component{

  render(){
    return (
    		<View onPress = {this.props.funcao} style = {{flex:1,alignItems: 'center',justifyContent: 'center'}}>
    		   {
    		   	this.props.tipo === "FORMAS"?
    		   	   	this.props.objeto === "quadrado"?
    		   	   		<View style={{width: this.props.tamanho,
									  height: this.props.tamanho,
									  backgroundColor: 'green'}} />
    		   	   	:
	    		   	   	this.props.objeto === "circulo"?
	    		   	   		<View style={{
	    		   	   			width: this.props.tamanho,
							    height: this.props.tamanho,
							    borderRadius: this.props.tamanho/2,
							    backgroundColor: 'green'
	    		   	   		}} />
	    		   	   	:
		    		   	   	this.props.objeto === "diamante"?
		    		   	   		<View style={{
		    		   	   			width: this.props.tamanho/1.5,
								    height: this.props.tamanho/1.5,
								    backgroundColor: 'green',
								    transform: [{rotate: '45deg'}]    
									}} />
							       
		    		   	   	:
		    		   	   	<View></View>
    		   	:
    		   	<Text onPress = {this.props.funcao} style = {{ fontFamily: 'Roboto-Light', fontSize: this.props.tamanho-5}} >
		           {this.props.texto}
		       	</Text>
    		   }
		       
	       </View>
    );
  }
}

