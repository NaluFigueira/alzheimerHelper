import React from 'react';
import { View } from 'react-native';
import Botao from '../Botao'
import estilos from '../estilos/estilos.js'
import {createStackNavigator, createAppContainer} from 'react-navigation';

const cores = ["red","green","blue"],
      letras = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K",
               "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
               "X", "Z"],
      numeros = ["0","1", "2","3","4","5","6","7","8","9"]
      

export default class MenuCorrespondencia extends React.Component{
  

  render(){
    return (
        <View style={estilos.container}>
          <Botao aoClicar = {() => this.props.navigation.push('CorrespondenciaObjetos',{
            numLinhas: 3, numColunas:2, nivel:1, objetosPassados: cores, 
            valorDesativacao: "white", tipo: "CORES"
          })}
                 titulo = "CORES" 
                 operacao = {true} />
          <Botao aoClicar = {() => this.props.navigation.push('CorrespondenciaObjetos',{
            numLinhas: 3, numColunas:2, nivel:1, objetosPassados: letras, 
            valorDesativacao: "",  tipo: "LETRAS"
          })}
                 titulo = "LETRAS" 
                 operacao = {true} />
          <Botao aoClicar = {() => this.props.navigation.push('MenuJogos')}
                 titulo = "FORMAS" 
                 operacao = {true} />
          <Botao aoClicar = {() => this.props.navigation.push('CorrespondenciaObjetos',{
            numLinhas: 3, numColunas:2, nivel:1, objetosPassados: numeros, 
            valorDesativacao: "",  tipo: "NÚMEROS"
          })}
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

