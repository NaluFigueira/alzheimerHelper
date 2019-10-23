import React, { useState, useEffect } from 'react'
import { View, FlatList, TouchableOpacity, Alert } from 'react-native'
import Titulo from '../correspondencia/Titulo'
import Botao from '../Botao'
import estilos from '../estilos/estilos'

export default function SelecionarForma ({ navigation }) {
  const nivel = navigation.getParam('nivel', 0)
  const respostasPossiveis = navigation.getParam('respostas', [])
  const respostaCorreta = navigation.getParam('respostaCorreta', [])
  const radioButton = React.createRef()
  const [selecionado, setSelecionado] = useState([])

  function iniciarRadioButtons () {
    var aux = []
    for (let i = 0; i < respostasPossiveis.length; i++) { aux.push(false) }
    setSelecionado(aux)
  }

  useEffect(() => {
    alertarIntroducao()
    iniciarRadioButtons()
  }, [])

  function verificarVitoria (index) {
    var aux = []
    for (let i = index + 1; i <= index + (nivel * 3); i++) { aux.push(respostasPossiveis[i]) }
    let j = 0
    for (let i = 0; i < aux.length; i++) {
      if (respostaCorreta[j] !== aux[i]) { return false }
      j++
    }
    return true
  }

  function alertarIntroducao () {
    Alert.alert(
      'MEMORIZAR FORMA',
      'CLIQUE NA ALTERNATIVA QUE REPRESENTA A SEQUÊNCIA EXIBIDA!'
    )
  }

  function alertarVitoria () {
    Alert.alert(
      'PARABÉNS!',
      'VOCÊ GANHOU! CONTINUE ASSIM! CLIQUE EM CONTINUAR PARA IR PARA O PRÓXIMO NÍVEL OU CLIQUE EM VOLTAR PARA SAIR!',
      [
        {
          text: 'CONTINUAR',
          onPress: () => navigation.push('IdentificarForma', {
            nivel: nivel + 1,
            navigation
          })
        },
        {
          text: 'VOLTAR',
          onPress: () => navigation.push('MenuMemoria')
        }
      ],
      { cancelable: false }
    )
  }

  function alertarNivelMaximo () {
    Alert.alert(
      'PARABÉNS, VOCÊ COMPLETOU TODOS OS NÍVES!',
      'CLIQUE EM MEMORIZAR FORMA PARA JOGAR DE NOVO, OU TENTE OS OUTROS JOGOS!'
    )
    navigation.push('MenuMemoria')
  }

  function alertarErro () {
    Alert.alert(
      'ALTERNATIVA INCORRETA!',
      'CLIQUE EM REPRISAR PARA VER A SEQUÊNCIA NOVAMENTE, EM OUTRA, PARA TENTAR UMA NOVA SEQUÊNCIA, OU EM SAIR PARA VOLTAR AO MENU!',
      [
        {
          text: 'REPRISAR',
          onPress: () => navigation.push('IdentificarForma', {
            nivel: nivel,
            formas: respostaCorreta,
            navigation
          })
        },
        {
          text: 'OUTRA',
          onPress: () => navigation.push('IdentificarForma', {
            nivel: nivel,
            formas: [],
            navigation
          })
        },
        {
          text: 'SAIR',
          onPress: () => navigation.push('MenuMemoria')
        }
      ],
      { cancelable: false }
    )
  }

  function existeSelecionado (elemento, index, vetor) {
    return elemento === true
  }

  function handleOnPress (index) {
    var indice = selecionado.findIndex(existeSelecionado)
    var aux = [...selecionado]
    if (indice !== -1) {
      aux[indice] = false
    }
    aux[index] = true
    setSelecionado(aux)
    if (verificarVitoria(index)) {
      if (nivel == 1)alertarVitoria()
      else alertarNivelMaximo()
    } else alertarErro()
  }

  renderItem = ({ item, index }) => {
    return (
      <View style = {{ flex: 1, alignItems: 'center', justifyContent: 'space-around', flexDirection: 'row' }}>
        {
          item === 'botão'
            ? <TouchableOpacity onPress = {() => handleOnPress(index)} style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: '#000',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#FFF'
            }}
            >
              {
                selecionado[index]
                  ? <View style={{
                    height: 12,
                    width: 12,
                    borderRadius: 6,
                    backgroundColor: '#000'
                  }}/>
                  : null
              }
            </TouchableOpacity>
            : item === 'quadrado'
              ? <View style={{
                width: 100 - 30 * nivel,
                height: 100 - 30 * nivel,
                backgroundColor: 'green'
              }} />
              : item === 'circulo'
                ? <View style={{
                  width: 100 - 30 * nivel,
                  height: 100 - 30 * nivel,
                  borderRadius: 100 - 10 * nivel / 2,
                  backgroundColor: 'green'
                }} />
                : item === 'diamante'
                  ? <View style={{
                    width: 100 - 60 * nivel / 1.5,
                    height: 100 - 60 * nivel / 1.5,
                    backgroundColor: 'green',
                    transform: [{ rotate: '45deg' }]
                  }} />
                  : <View></View>
        }
      </View>
    )
  }

  return (
    <View style={estilos.container}>
      <View style = {[estilos.tituloGrid, { backgroundColor: '#FFEB83' }]}>
					    <Titulo titulo = {'Nível ' + nivel} />
		        </View>
      <FlatList
        extraData={selecionado}
        data = {respostasPossiveis}
        numColumns = {(nivel * 2) + 2}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle = {{ flex: 1, justifyContent: 'space-around' }}
        renderItem = {renderItem}
      />
      <View style={[estilos.voltarSeguir, { backgroundColor: '#FFEB83' }]}>
		            <Botao aoClicar = {() => navigation.push('MenuMemoria')}
		                   titulo = "SAIR"
		                   operacao = {false} />
		            <Botao aoClicar = {() => navigation.push('MenuJogos')}
		                   titulo = "AJUDA"
		                   operacao = {false} />
	        </View>
    </View>
  )
}
