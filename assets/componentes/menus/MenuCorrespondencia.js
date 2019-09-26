import React from 'react';
import { View } from 'react-native';
import Botao from '../Botao'
import estilos from '../estilos/estilos.js'
import {createStackNavigator, createAppContainer} from 'react-navigation';



const 
      objetoCor = {tipo:"CORES", valorDesativacao:"white"},
      objetoLetra = {tipo:"LETRAS", valorDesativacao:""},
      objetoNumero = {tipo:"NÚMEROS", valorDesativacao:""},
      objetoForma = {tipo:"FORMAS", valorDesativacao:"white"},

      cores = [{objeto:"red",tipoObjeto: objetoCor},
               {objeto:"green",tipoObjeto: objetoCor},
               {objeto:"blue",tipoObjeto: objetoCor}],
      letras = [{objeto:"A",tipoObjeto:objetoLetra},
                {objeto:"B",tipoObjeto:objetoLetra},
                {objeto:"C",tipoObjeto:objetoLetra},
                {objeto:"D",tipoObjeto:objetoLetra},
                {objeto:"E",tipoObjeto:objetoLetra},
                {objeto:"F",tipoObjeto:objetoLetra},
                {objeto:"G",tipoObjeto:objetoLetra},
                {objeto:"H",tipoObjeto:objetoLetra},
                {objeto:"I",tipoObjeto:objetoLetra},
                {objeto:"J",tipoObjeto:objetoLetra},
                {objeto:"K",tipoObjeto:objetoLetra},
                {objeto:"B",tipoObjeto:objetoLetra},
                {objeto:"M",tipoObjeto:objetoLetra},
                {objeto:"N",tipoObjeto:objetoLetra},
                {objeto:"O",tipoObjeto:objetoLetra},
                {objeto:"P",tipoObjeto:objetoLetra},
                {objeto:"Q",tipoObjeto:objetoLetra},
                {objeto:"R",tipoObjeto:objetoLetra},
                {objeto:"S",tipoObjeto:objetoLetra},
                {objeto:"T",tipoObjeto:objetoLetra},
                {objeto:"U",tipoObjeto:objetoLetra},
                {objeto:"V",tipoObjeto:objetoLetra},
                {objeto:"X",tipoObjeto:objetoLetra},
                {objeto:"Z",tipoObjeto:objetoLetra}],
      numeros = [{objeto:"0",tipoObjeto:objetoNumero},
                {objeto:"1",tipoObjeto:objetoNumero},
                {objeto:"2",tipoObjeto:objetoNumero},
                {objeto:"3",tipoObjeto:objetoNumero},
                {objeto:"4",tipoObjeto:objetoNumero},
                {objeto:"5",tipoObjeto:objetoNumero},
                {objeto:"6",tipoObjeto:objetoNumero},
                {objeto:"7",tipoObjeto:objetoNumero},
                {objeto:"8",tipoObjeto:objetoNumero},
                {objeto:"9",tipoObjeto:objetoNumero}],
      formas = [{objeto:"quadrado",tipoObjeto:objetoForma},
                {objeto:"circulo",tipoObjeto:objetoForma},
                {objeto:"diamante",tipoObjeto:objetoForma}],
      tudo = numeros.concat(formas);
      

export default class MenuCorrespondencia extends React.Component{
  

  render(){
    return (
        <View style={estilos.container}>
          <Botao aoClicar = {() => this.props.navigation.push('CorrespondenciaObjetos',{
            numLinhas: 3, numColunas:2, nivel:1, objetosPassados: cores, tipo: "CORES"
             })}
                 titulo = "CORES" 
                 operacao = {true} />
          <Botao aoClicar = {() => this.props.navigation.push('CorrespondenciaObjetos',{
            numLinhas: 3, numColunas:2, nivel:1, objetosPassados: letras, tipo: "LETRAS"
            })}
                 titulo = "LETRAS" 
                 operacao = {true} />
          <Botao aoClicar = {() => this.props.navigation.push('CorrespondenciaObjetos',{
            numLinhas: 3, numColunas:2, nivel:1, objetosPassados: formas, tipo: "FORMAS"
             })}
                 titulo = "FORMAS" 
                 operacao = {true} />
          <Botao aoClicar = {() => this.props.navigation.push('CorrespondenciaObjetos',{
            numLinhas: 3, numColunas:2, nivel:1, objetosPassados: numeros, tipo: "NÚMEROS"
            })}
                 titulo = "NÚMEROS" 
                 operacao = {true} />
          <Botao aoClicar = {() => this.props.navigation.push('CorrespondenciaObjetos',{
            numLinhas: 3, numColunas:2, nivel:1, objetosPassados: tudo, tipo: "NÚMEROS E FORMAS"
            })}
                 titulo = "TUDO" 
                 operacao = {true} />
          <View style={estilos.voltarSeguir}>
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

