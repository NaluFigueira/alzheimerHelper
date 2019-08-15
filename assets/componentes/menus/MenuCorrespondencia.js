import React from 'react';
import { View } from 'react-native';
import Botao from '../Botao'
import estilos from '../estilos/estilos.js'
import {createStackNavigator, createAppContainer} from 'react-navigation';

export default class MenuCorrespondencia extends React.Component{
  

  render(){
    return (
        <View style={estilos.container}>
          <Botao aoClicar = {() => this.props.navigation.push('MenuJogos')}
                 titulo = "CORES" 
                 operacao = {true} />
          <Botao aoClicar = {() => this.props.navigation.push('MenuJogos')}
                 titulo = "LETRAS" 
                 operacao = {true} />
          <Botao aoClicar = {() => this.props.navigation.push('MenuJogos')}
                 titulo = "FORMAS" 
                 operacao = {true} />
          <Botao aoClicar = {() => this.props.navigation.push('MenuJogos')}
                 titulo = "NÚMEROS" 
                 operacao = {true} />
          <Botao aoClicar = {() => this.props.navigation.push('MenuJogos')}
                 titulo = "TUDO" 
                 operacao = {true} />
          <View style={estilos.containerMaior}>
            <Botao aoClicar = {() => this.props.navigation.push('MenuCognicao')} 
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

