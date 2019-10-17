import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import estilos from './estilos/estilos.js';

export default class BotaoDesfazer extends React.Component{
  render(){  
    return (
        <TouchableOpacity onPress = {this.props.aoClicar} 
            style={[estilos.botao, estilos.desfazer ]} >
           <Text style = {[estilos.texto,{ fontFamily: 'Roboto-Bold'}]}> 
              {this.props.titulo} 
           </Text>
       </TouchableOpacity>
    );
  }
}

