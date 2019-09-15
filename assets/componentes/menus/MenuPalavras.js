import React from 'react';
import { View } from 'react-native';
import Botao from '../Botao'
import estilos from '../estilos/estilos.js'
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class MenuPalavras extends React.Component{
  

  render(){
    return (
        <View style={estilos.container}>
          <Botao aoClicar = {() => this.props.navigation.push('MenuCorrespondencia')}
                 titulo = "SOPA DE LETRAS" 
                 operacao = {true} />
          <Botao aoClicar = {() => this.props.navigation.push('MenuCompletarPalavra')}
                 titulo = "COMPLETE A PALAVRA" 
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

