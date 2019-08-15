import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import estilos from './estilos/estilos.js';

export default class Botao extends React.Component{
  render(){  
    return (
        <TouchableOpacity onPress = {this.props.aoClicar} 
            style={[estilos.botao, 
                    this.props.operacao?estilos.operacao:estilos.auxilio ]} >
           <Text style = {estilos.texto}> 
              {this.props.titulo} 
           </Text>
       </TouchableOpacity>
    );
  }
}

