import React, { useState, useEffect } from 'react'
import { View, Text, Animated } from 'react-native'
import Titulo from '../correspondencia/Titulo'
import Botao from '../Botao'
import estilos from '../estilos/estilos'

export default function IdentificarForma ({ navigation }) {
  const formasPossiveis = ['quadrado', 'circulo', 'diamante']
  const formas = navigation.getParam('formas', [])
  const nivel = navigation.getParam('nivel', 0)
  const numeroFormasSorteadas = (nivel * 2) + 1
  const [formaAtual, setFormaAtual] = useState('')
  const [fadeAnim] = useState(new Animated.Value(0))
  var i = 1; var j = 0
  var formasSorteadas = []

  function embaralhar (vetor) {
    var indiceAtual = vetor.length; var valorTemporario; var indiceAleatorio
    var aux = []
    while (indiceAtual !== 0) {
      indiceAleatorio = Math.floor(Math.random() * indiceAtual)
      indiceAtual -= 1
      if (indiceAtual !== indiceAleatorio) {
        valorTemporario = vetor[indiceAtual]
        vetor[indiceAtual] = vetor[indiceAleatorio]
        vetor[indiceAleatorio] = valorTemporario
      }
    }
    return vetor
  }

  function gerarSequencia () {
    var aux = []

    for (var i = 0; i < numeroFormasSorteadas; i++) {
      var indiceAleatorio = Math.floor(Math.random() * formasPossiveis.length)
      var formaSorteada = formasPossiveis[indiceAleatorio]
      aux.push(formaSorteada)
    }

    return aux
  }

  function unificar (vetor) {
    var aux = ['botão']
    for (var i = 0; i < vetor.length; i++) {
      aux = aux.concat(vetor[i])
      if (i !== vetor.length - 1) { aux = aux.concat('botão') }
    }
    return aux
  }

  function verificarVetoresIguais (vetor1, vetor2) {
    let j = 0
    for (let i = 0; i < vetor1.length; i++) {
      if (vetor1[i] !== vetor2[j]) { return false }
      j++
    }
    return true
  }

  function gerarAlternativaIncorreta () {
    var alternativa = gerarSequencia()
    while (verificarVetoresIguais(alternativa, formasSorteadas)) { alternativa = gerarSequencia() }
    return alternativa
  }

  function gerarAlternativas () {
    var alternativa1 = gerarAlternativaIncorreta()
    var alternativa2 = gerarAlternativaIncorreta()
    var alternativas = [alternativa1, alternativa2, formasSorteadas]
    alternativas = embaralhar(alternativas)
    alternativas = unificar(alternativas)
    return alternativas
  }

  async function sortearForma () {
    var formaSorteada = 'quadrado'
    if (formas.length !== 0) {
      formaSorteada = formas[j]
      formasSorteadas.push(formaSorteada)
      j++
    } else {
      var indiceAleatorio = Math.floor(Math.random() * formasPossiveis.length)
      formaSorteada = formasPossiveis[indiceAleatorio]
      formasSorteadas.push(formaSorteada)
    }
    await setFormaAtual(formaSorteada)
    Animated.sequence([
      Animated.timing(
        fadeAnim,
        {
          toValue: 1,
          duration: 2000
        }
      ),
      Animated.timing(
        fadeAnim,
        {
          toValue: 0,
          duration: 2000
        }
      )
    ]).start(function onComplete () {
      if (i < numeroFormasSorteadas) {
        i++
        sortearForma()
      } else {
        var respostas = gerarAlternativas()
        navigation.push('SelecionarResposta', { nivel, respostas, respostaCorreta: formasSorteadas })
      }
    }
    )
  }

  useEffect(() => {
    sortearForma()
  }, [])

  return (
    <View style={estilos.container}>
      <View style = {[estilos.tituloGrid, { backgroundColor: '#FFEB83' }]}>
        <Titulo titulo = {'Nível ' + nivel} />
		    </View>
      <View style = {{ flex: 0.1, alignItems: 'center' }}>
        <Titulo titulo = {'Preste atenção na sequência!'} />
      </View>
      <View style = {{ flex: 0.9, alignItems: 'center', justifyContent: 'center' }}>

        {formaAtual === 'quadrado'

          ? <Animated.View style={{
            opacity: fadeAnim,
            width: 200,
            height: 200,
            backgroundColor: 'green'
          }} />
          : formaAtual === 'circulo'
            ? <Animated.View style={{
              opacity: fadeAnim,
              width: 200,
              height: 200,
              borderRadius: 200 / 2,
              backgroundColor: 'green'
            }} />
            : formaAtual === 'diamante'
              ? <Animated.View style={{
                opacity: fadeAnim,
                width: 200 / 1.5,
                height: 200 / 1.5,
                backgroundColor: 'green',
                transform: [{ rotate: '45deg' }]
              }} />

              : <View></View>
        }
      </View>
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
