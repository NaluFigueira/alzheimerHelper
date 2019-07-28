import React from 'react';
import { StyleSheet, Button, View, Image, Text } from 'react-native';
import Botao from './Botao'
import Tutorial from './Tutorial'

export default class Home extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      pediuAjuda: false,
      livroRecordacoes: false
    }
    this.iniciarTutorial = this.iniciarTutorial.bind(this)
    this.trocarTutorial = this.trocarTutorial.bind(this)
    this.terminarTutorial = this.terminarTutorial.bind(this)
  }

  iniciarTutorial() {
    this.setState({
      pediuAjuda: true,
      livroRecordacoes: true 
    })
  }

  trocarTutorial(){
    this.setState({
      livroRecordacoes: false 
    })
  }

  terminarTutorial() {
    this.setState({
      pediuAjuda: false,
      livroRecordacoes: false
    })
  }

  render(){
    return (
        <View style={estilos.container}>
          {this.state.pediuAjuda?
              this.state.livroRecordacoes?
                <View style = {{marginTop:"50%"}} >
                  <Tutorial texto = "TOQUE AQUI PARA ACESSAR O LIVRO DE RECORDAÇÕES"
                            titulo = "LIVRO DE RECORDAÇÕES"
                            tela = {this.terminarTutorial}/>
                  <Botao aoClicar = {this.trocarTutorial} 
                         titulo = "CONTINUAR" 
                         operacao = {false} />
                </View>
              :
                <View style = {{marginTop:"50%"}} >
                  <Tutorial texto = "TOQUE AQUI PARA ACESSAR OS JOGOS"
                            titulo = "JOGOS"
                            tela = {this.terminarTutorial}/>
                  <Botao aoClicar = {this.terminarTutorial} 
                         titulo = "CONTINUAR" 
                         operacao = {false} />
                  
                </View>
            :
            <View>
              <Image
                    style={estilos.imagem}
                    source={require('../imagens/logo.png')}
                  />
              <Botao aoClicar = {this.iniciarTutorial}
                     titulo = "LIVRO DE RECORDAÇÕES" 
                     operacao = {true} />
              <Botao aoClicar = {this.iniciarTutorial}
                     titulo = "JOGOS" 
                     operacao = {true} />
              <Botao aoClicar = {this.iniciarTutorial} 
                     titulo = "AJUDA" 
                     operacao = {false} />
            </View>
          }
        </View>
    );
  }
}

const estilos = StyleSheet.create({
  container:{
    flexDirection: 'column',
    alignItems: 'center'
  },
  imagem: {
    aspectRatio: 1, 
    resizeMode: 'contain'
  },
  
});
