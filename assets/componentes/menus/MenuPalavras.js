import React from 'react';
import { View } from 'react-native';
import Botao from '../Botao'
import estilos from '../estilos/estilos.js'
import {createStackNavigator, createAppContainer} from 'react-navigation';


const palavras = [ "abelha",
                  "abacaxi",
                  "aranha",
                  "ameixa",
                  "avestruz",
                  "acerola",
                  "baleia",
                  "banana",
                  "borboleta",
                  "cereja",
                  "cachorro",
                  "caju",
                  "camelo",
                  "caqui",
                  "cavalo",
                  "goiaba",
                  "elefante",
                  "laranja",
                  "jaca",
                  "esquilo",
                  "foca",
                  "galinha",
                  "morango",
                  "gato",
                  "iguana",
                  "melancia",
                  "joaninha",
                  "lobo",
                  "manga",
                  "macaco",
                  "ovelha",
                  "pinguim",
                  "papagaio",
                  "uva",
                  "raposa",
                  "rato",
                  "sapo",
                  "kiwi",
                  "urso",
                  "vaca",
                  "zebra"];


export default class MenuPalavras extends React.Component{
  
  gerarPalavra(){
    var tamanho = palavras.length;
    var indiceAleatorio = Math.floor(Math.random()*tamanho);
    var escolhido = palavras[indiceAleatorio];
    return escolhido;
  }

  render(){
    return (
        <View style={estilos.container}>
          <Botao  aoClicar = {() => this.props.navigation.push('SopaLetras',{
             palavra: this.gerarPalavra()
            })}
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

