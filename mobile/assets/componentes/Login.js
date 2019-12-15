import React,{useState} from 'react';
import { Image, TextInput, Text, KeyboardAvoidingView } from 'react-native';
import Botao from './Botao'
import estilos from './estilos/estilos.js';

import api from '../../src/services/api';

export default function Login({navigation}){
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 

    handleSubmit = async () =>{
      try {
        const response = await api.post('sessions',{
          email, password
        });
        api.defaults.headers.Authorization =`Bearer ${response.data.token}`;
        navigation.push('Home',{logado: true});
      } catch (error) {
        console.log(error);
      }
    }

    return (
        <KeyboardAvoidingView style={estilos.container} behavior="padding">
              <Image
                    style={estilos.logo}
                    source={require('../imagens/logo.png')}
                  />
              <TextInput
                placeholder="E-MAIL"
                placeholderTextColor="black"
                textContentType="emailAddress"
                style = {estilos.input}
                onChangeText={(email) => setEmail(email)}
                value={email}
                />
              <TextInput
                placeholder="SENHA"
                placeholderTextColor="black"
                textContentType="password"
                secureTextEntry={true}
                style = {estilos.input}
                onChangeText={(password) => setPassword(password)}
                value={password}
              />
              <Botao aoClicar = {() => handleSubmit()}
                     titulo = "ENTRAR" 
                     operacao = {true} />
              <Text
                style = {{
                  alignSelf:"center", 
                  fontWeight:"bold", 
                  textDecorationLine:"underline"
                }}
                onPress={() => navigation.push('Home',{logado: false})}
              >
                CONTINUAR SEM LOGIN
              </Text>
        </KeyboardAvoidingView>
    );
}

