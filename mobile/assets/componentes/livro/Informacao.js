import React from 'react';
import { View, Text } from 'react-native';
import estilos from '../estilos/estilos.js';

export default function Informacao({titulo, conteudo}) {
  return (
    <View style = {estilos.informacao}>
        <Text style ={estilos.informacaoTitulo} >{titulo}</Text>
        <Text style = {estilos.informacaoConteudo}>{conteudo}</Text>
    </View>
  );
}
