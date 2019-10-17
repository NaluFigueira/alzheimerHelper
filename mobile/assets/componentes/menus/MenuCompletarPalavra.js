import React from 'react';
import { View } from 'react-native';
import Botao from '../Botao'
import estilos from '../estilos/estilos.js'
import {createStackNavigator, createAppContainer} from 'react-navigation';

const animais = [{nome:"abelha",uri:require('../../imagens/animais/abelha.jpg')},
                  {nome:"aranha",uri:require('../../imagens/animais/aranha.jpg')},
                  {nome:"avestruz",uri:require('../../imagens/animais/avestruz.jpg')},
                  {nome:"baleia",uri:require('../../imagens/animais/baleia.jpg')},
                  {nome:"borboleta",uri:require('../../imagens/animais/borboleta.jpg')},
                  {nome:"cachorro",uri:require('../../imagens/animais/cachorro.jpg')},
                  {nome:"camelo",uri:require('../../imagens/animais/camelo.jpg')},
                  {nome:"cavalo",uri:require('../../imagens/animais/cavalo.jpg')},
                  {nome:"elefante",uri:require('../../imagens/animais/elefante.jpg')},
                  {nome:"esquilo",uri:require('../../imagens/animais/esquilo.jpg')},
                  {nome:"foca",uri:require('../../imagens/animais/foca.jpg')},
                  {nome:"galinha",uri:require('../../imagens/animais/galinha.jpg')},
                  {nome:"gato",uri:require('../../imagens/animais/gato.jpg')},
                  {nome:"iguana",uri:require('../../imagens/animais/iguana.jpg')},
                  {nome:"joaninha",uri:require('../../imagens/animais/joaninha.jpg')},
                  {nome:"lobo",uri:require('../../imagens/animais/lobo.jpg')},
                  {nome:"macaco",uri:require('../../imagens/animais/macaco.jpg')},
                  {nome:"ovelha",uri:require('../../imagens/animais/ovelha.jpg')},
                  {nome:"pinguim",uri:require('../../imagens/animais/pinguim.jpg')},
                  {nome:"papagaio",uri:require('../../imagens/animais/papagaio.jpg')},
                  {nome:"raposa",uri:require('../../imagens/animais/raposa.jpg')},
                  {nome:"rato",uri:require('../../imagens/animais/rato.jpg')},
                  {nome:"sapo",uri:require('../../imagens/animais/sapo.jpg')},
                  {nome:"urso",uri:require('../../imagens/animais/urso.jpg')},
                  {nome:"vaca",uri:require('../../imagens/animais/vaca.jpg')},
                  {nome:"zebra",uri:require('../../imagens/animais/zebra.jpg')}];

const frutas = [{nome:"abacaxi",uri:require('../../imagens/frutas/abacaxi.jpg')},
                {nome:"ameixa",uri:require('../../imagens/frutas/ameixa.jpg')},
                {nome:"acerola",uri:require('../../imagens/frutas/acerola.jpg')},
                {nome:"banana",uri:require('../../imagens/frutas/banana.jpg')},
                {nome:"cereja",uri:require('../../imagens/frutas/cereja.jpg')},
                {nome:"caju",uri:require('../../imagens/frutas/caju.jpg')},
                {nome:"caqui",uri:require('../../imagens/frutas/caqui.jpg')},
                {nome:"goiaba",uri:require('../../imagens/frutas/goiaba.jpg')},
                {nome:"jaca",uri:require('../../imagens/frutas/jaca.jpg')},
                {nome:"laranja",uri:require('../../imagens/frutas/laranja.jpg')},
                {nome:"morango",uri:require('../../imagens/frutas/morango.jpg')},
                {nome:"melancia",uri:require('../../imagens/frutas/melancia.jpg')},
                {nome:"manga",uri:require('../../imagens/frutas/manga.jpg')},
                {nome:"uva",uri:require('../../imagens/frutas/uva.jpg')},
                {nome:"kiwi",uri:require('../../imagens/frutas/kiwi.jpg')}];

export default class MenuPalavras extends React.Component{

  gerarPalavra(tipo,vetor){
    var tamanho = vetor.length;
    var indiceAleatorio = Math.floor(Math.random()*tamanho);
    var escolhido = vetor[indiceAleatorio];
    return escolhido;
  }

  render(){
    return (
        <View style={estilos.container}>
          <Botao aoClicar = {() => this.props.navigation.push('CompletarPalavra',{
             tipo: "ANIMAL", palavra: this.gerarPalavra("animais",animais)
            })}
                 titulo = "ANIMAL" 
                 operacao = {true} />
          <Botao aoClicar = {() => this.props.navigation.push('CompletarPalavra',{
             tipo: "FRUTA", palavra: this.gerarPalavra("frutas",frutas)
            })}
                 titulo = "FRUTA" 
                 operacao = {true} />
          <View style={estilos.voltarSeguir}>
            <Botao aoClicar = {() => this.props.navigation.push('MenuPalavras')} 
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

