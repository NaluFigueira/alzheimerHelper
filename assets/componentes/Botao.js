import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

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

const estilos = StyleSheet.create({
  botao:{
    padding: 15,
    borderRadius: 10,
  },
  operacao:{
    margin: "5%",
    backgroundColor:"#FFD917",
  },
  auxilio:{
    margin: "10%",
    backgroundColor:"#B1FF17",
  },
  texto: {
    color: "black", 
    fontWeight: 'bold',
    textAlign: 'center'
  }
});