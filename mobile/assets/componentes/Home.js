import React from 'react';
import { View, Image } from 'react-native';
import Botao from './Botao'
import estilos from './estilos/estilos.js';

export default class Home extends React.Component{

  render(){
    return (
        <View style={estilos.container}>
              <Image
                    style={estilos.logo}
                    source={require('../imagens/logo.png')}
                  />
              {
                this.props.navigation.getParam('logado')&& <Botao 
                      aoClicar = {() => this.props.navigation.push('MenuJogos')}
                      titulo = "LIVRO DE RECORDAÇÕES" 
                      operacao = {true} 
                />
              }
              <Botao aoClicar = {() => this.props.navigation.push('MenuJogos')}
                     titulo = "JOGOS" 
                     operacao = {true} />
              <Botao aoClicar = {() => this.props.navigation.push('MenuJogos')} 
                     titulo = "AJUDA" 
                     operacao = {false} />
        </View>
    );
  }
}

