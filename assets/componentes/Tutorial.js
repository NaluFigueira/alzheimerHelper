import React from 'react';
import { StyleSheet,View, Text } from 'react-native';
import Botao from './Botao'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class Tutorial extends React.Component{
  render(){  
    return (
        <View>
          <Text style = {estilos.texto}>
            {this.props.texto}
          </Text>
          <Icon name="arrow-down" size={32} color="black" style = {{alignSelf:"center"}}/>
          <View style = {estilos.tutorial}>
            <Botao aoClicar = {this.props.tela}
                   titulo = {this.props.titulo} 
                   operacao = {true}
                   />
          </View>
        </View>
    );
  }
}

const estilos = StyleSheet.create({
  tutorial: {
    borderColor: 'red',
    borderWidth: 2,
    marginBottom: "10%"
  },
  texto: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});