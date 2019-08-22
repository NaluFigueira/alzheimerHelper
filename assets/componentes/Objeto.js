import React from 'react';
import {Text } from 'react-native';
import estilos from './estilos/estilos.js';

export default class Objeto extends React.Component{
  render(){  
    return (
       <Text>
           {this.props.texto}
       </Text>
    );
  }
}

