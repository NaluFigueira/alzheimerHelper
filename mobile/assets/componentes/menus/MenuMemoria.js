import React from 'react'
import { View } from 'react-native'
import Botao from '../Botao'
import estilos from '../estilos/estilos.js'

export default class MenuJogos extends React.Component {
  render () {
    return (
      <View style={estilos.container}>
        <Botao aoClicar = {() => this.props.navigation.push('IdentificarForma', {
          nivel: 1, navigation: this.props.navigation, formas: []
        })}
        titulo = "MEMORIZE A FORMA"
        operacao = {true} />
        <Botao aoClicar = {() => this.props.navigation.push('MenuCognicao')}
          titulo = "QUIZZ"
          operacao = {true} />
        <View style={estilos.voltarSeguir}>
          <Botao aoClicar = {() => this.props.navigation.push('MenuJogos')}
            titulo = "VOLTAR"
            operacao = {false} />
          <Botao aoClicar = {() => this.props.navigation.push('MenuCognicao')}
            titulo = "AJUDA"
            operacao = {false} />
        </View>
      </View>
    )
  }
}
