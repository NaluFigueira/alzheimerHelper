import React,{  useState, useEffect } from 'react';
import {View, Image, Text, TouchableOpacity, Alert} from 'react-native';
import api, {ip} from '../../../src/services/api';
import Botao from '../Botao';
import estilos from '../estilos/estilos';

export default function Quizz({navigation}) {
  const [image, setImage] = useState(null);
  const [question, setQuestion] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [radioButtons, setRadioButtons] = useState([true, false, false]);

  useEffect(() => {
    alertarIntroducao();

    async function loadSection(){
      try {
        const response = await api.get('random');
        setImage(response.data.image[0].url.replace("localhost", ip));
        setQuestion(response.data.question[0].question);
        setAnswers(response.data.answers);
      } catch (error) {
        console.log(error);
      }
    }
    
    loadSection();
  }, [])

  function verificarSelecionado (elemento) {
    return elemento === true;
  }
  
  function handleOnPress (index) {
    var indice = radioButtons.findIndex(verificarSelecionado);
    var novosRadioButtons = [...radioButtons];
    if (indice !== -1) {
      novosRadioButtons[indice] = false;
    }
    novosRadioButtons[index] = true;
    setRadioButtons(novosRadioButtons);
  }
  
  verificarResposta = () =>{
    var index = radioButtons.findIndex(verificarSelecionado);
    if(answers[index].correct)
      alertarVitoria();
    else
      alertarErro();
  }

  function alertarIntroducao(){
    Alert.alert(
     'QUIZZ',
     "RESPONDA A PERGUNTA DE ACORDO COM A IMAGEM EXIBIDA, CLIQUE EM CONCLUIR PARA VERIFICAR SE VOCÊ ACERTOU!"
   );
  }

  function alertarVitoria(){
    Alert.alert(
     'PARABÉNS, VOCÊ GANHOU!',
     "CLIQUE EM QUIZZ, PARA JOGAR DE NOVO, OU TENTE AS OUTROS JOGOS!" 
   );
   navigation.push('MenuMemoria');
  }

  function alertarErro () {
    Alert.alert(
      'ALTERNATIVA INCORRETA!',
      'CLIQUE EM CONTINUAR, PARA TENTAR UMA NOVA PERGUNTA, OU EM SAIR PARA VOLTAR AO MENU!',
      [
        {
          text: 'CONTINUAR',
          onPress: () => navigation.push('Quizz', {navigation})
        },
        {
          text: 'SAIR',
          onPress: () => navigation.push('MenuMemoria')
        }
      ],
      { cancelable: false }
    )
  }


  
  return (
    <View style={estilos.container}>
      <View style = {{flex:1}}>
         { image && <Image
            style={estilos.imagemQuizz}
            source={{uri: image}} 
          />}
          <Text style ={{marginLeft: 15 }} >{question}</Text>
          {
            answers.map((answer, index) => (
              <View key = {answer.id} 
                    style ={{
                      flexDirection:"row",  
                      marginVertical:10, 
                      marginLeft: 15 
                    }}
                >
                <TouchableOpacity 
                    onPress = {() => handleOnPress(index)} 
                    style={estilos.radioButton}
                  >
                  {
                    radioButtons[index] && <View style={{
                        height: 12,
                        width: 12,
                        borderRadius: 6,
                        backgroundColor: '#000'
                      }}/>
                  }
                </TouchableOpacity>
                <Text style = {{marginLeft: 15}}>{answer.answer}</Text>
              </View>
            ))
          }
          <Botao aoClicar = {() => verificarResposta()}
                titulo = "CONCLUIR"
                operacao = {true} />
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
  );
}
