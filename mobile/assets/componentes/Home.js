import React from 'react';
import { View, Image, AsyncStorage } from 'react-native';
import Botao from './Botao'
import estilos from './estilos/estilos.js';


export default class Home extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      token: ""
    }
  }

  async componentDidMount(){
    const token = await AsyncStorage.getItem('token');
    if(token !== null){
      this.setState({token})
    }
  }
  
  render(){
    return (
        <View style={estilos.container}>
              <Image
                    style={estilos.logo}
                    source={require('../imagens/logo.png')}
                  />
              {
                this.state.token !== "" && <Botao 
                      aoClicar = {() => this.props.navigation.push('MenuLivro')}
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

