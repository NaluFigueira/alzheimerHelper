import React from 'react';
import { View } from 'react-native';
import Botao from '../Botao'
import estilos from '../estilos/estilos.js'
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class MenuCognicao extends React.Component{
  

  render(){
    return (
        <View style={estilos.container}>
          <Botao aoClicar = {() => this.props.navigation.push('MenuCorrespondencia')}
                 titulo = "CORRESPONDÊNCIA" 
                 operacao = {true} />
          <Botao aoClicar = {() => this.props.navigation.push('MenuPalavras')}
                 titulo = "PALAVRAS" 
                 operacao = {true} />
          <View style={estilos.voltarSeguir}>
            <Botao aoClicar = {() => this.props.navigation.push('MenuJogos')} 
                   titulo = "VOLTAR" 
                   operacao = {false} />
            <Botao aoClicar = {() => this.props.navigation.push('MenuJogos')} 
                   titulo = "AJUDA" 
                   operacao = {false} />
          </View>
        </View>
    );
  }
}

